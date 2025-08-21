import { Client, OAuth2Scopes, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import WebSocket from "ws";
import { getI8n } from "../i8n/index.js";
// import { WebSocket } from "ws";

export class HandlePlay {
  websocket: WebSocket;
  public constructor(public client: Client) {
    this.websocket = new WebSocket(process.env.SERVER_PATH)
    this.handleWebsocket()
  }

  handleWebsocket() {
    // const _this = this
    this.websocket.on("open", () => {

      const send = (content: any) => this.websocket.send(JSON.stringify(content));
      this.client.on("ready", async client => {
        console.log("Connected");
        const guildIDs = client.shard ? (await client.shard.broadcastEval(c =>
          c.guilds.cache.map(g => g.id)
        )) : client.guilds.cache.map(guild => guild.id);
        const allIDs = guildIDs.flat();
        send({
          type: "IDENTIFY",
          userID: client.user?.id,
          guildIDs: allIDs,
          inviteLink: client.generateInvite({
            scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
            permissions: PermissionFlagsBits.Administrator
          }),
          botName: client.user?.username
        })
      })
    })
    this.websocket.on("message", async (data, isBinary) => {
      if (isBinary) return
      const messageData = JSON.parse("" + new String(data))
      if (messageData.type == "PLAY") {
        const { userID, voiceChannelId, query, guildId, offererID, textChannelId } = messageData
        console.log(messageData, offererID)
        const author = await this.client.users.fetch(offererID);
        if (userID != this.client.user?.id) return
        const voiceChannel = await this.client.channels.fetch(voiceChannelId);
        if (!voiceChannel?.isVoiceBased()) return;
        if (!this.client.user) return;

        const permissions = voiceChannel.permissionsFor(this.client.user);
        if (!permissions?.has(PermissionsBitField.Flags.Connect)) {
          // await send('Bot không có quyền kết nối vào kênh voice này!');
          this.websocket.send(JSON.stringify({
            type: "ERROR",
            userID: userID,
            failData: messageData,
            reason: "Bot không có quyền kết nối vào kênh voice này!"
          }))
          return
        }
        if (!permissions.has(PermissionsBitField.Flags.Speak)) {
          // await send('Bot không có quyền nói trong kênh voice này!')
          this.websocket.send(JSON.stringify({
            type: "ERROR",
            userID: userID,
            failData: messageData,
            reason: "Bot không có quyền nói trong kênh voice này!"
          }))
          return
        };

        // --- get query ---
        // const query = message.isMessage() ? await message.args.rest('string').catch(() => null) : message.options.getString('query');
        if (!query) {
          // await send('Bạn cần phải cung cấp một truy vấn để sử dụng lệnh này!')
          this.websocket.send(JSON.stringify({
            type: "ERROR",
            userID: userID,
            failData: messageData,
            reason: "Vui lòng cung cấp một truy vấn để sử dụng lệnh này!"
          }))
          return
        };

        // --- search ---
        const search = await this.client.kazagumo.search(query, { requester: author });
        if (!search.tracks.length) {
          this.websocket.send(JSON.stringify({
            type: "ERROR",
            userID: userID,
            failData: messageData,
            reason: "Không tìm thấy kết quả nào!",
            error: "QUERY_NOT_FOUND"
          }))
          return
          // await send('Không tìm thấy kết quả nào!');
        }

        // --- ensure player ---
        let player = this.client.kazagumo.getPlayer(guildId);
        const guild = await this.client.guilds.fetch(guildId);
        if (!player) {
          player = await this.client.kazagumo.createPlayer({
            guildId: guildId,
            textId: textChannelId,
            voiceId: voiceChannel.id,
            shardId: guild.shardId,
            volume: 100
          });
          await new Promise((r) => setTimeout(r, 700)); // chờ kết nối ổn định
        }


        // Thêm ngay
        if (search.type === 'PLAYLIST') player.queue.add(search.tracks);
        else player.queue.add(search.tracks[0]);

        if (!player.playing && !player.paused) await player.play();
        this.websocket.send(JSON.stringify({
          type: "SUCCESS",
          userID: userID,
          successData: messageData
        }))
        const textChannel = await this.client.channels.fetch(textChannelId);
        if (!textChannel?.isSendable()) return
        return await textChannel.send(
          search.type === 'PLAYLIST'
            ? getI8n('addedPlaylistToQueue', { locale: guild.preferredLocale, variables: { playlist_name: search.playlistName || search.tracks[0].title, num_of_songs: `${search.tracks.length || 1}` } })
            : getI8n('addedSongToQueue', {
              locale: guild.preferredLocale, variables: {
                song_title: search.tracks[0].title, song_author: search.tracks[0].author || "Unknown"
              }
            })
        );


      }
      return null
    })
  }

  sendPlayCommand(args: {
    messageId: string,
    voiceChannelId: string,
    query: string,
    textChannelId: string,
    guildId: string
    offererId: string
  }) {
    this.websocket.send(JSON.stringify({
      type: "PLAY",
      messageId: args.messageId,
      voiceChannelId: args.voiceChannelId,
      query: args.query,
      textChannelId: args.textChannelId,
      guildId: args.guildId,
      offererID: args.offererId
    }))
  }
  sendEndCommand(args: {
    guildId: string,
  }) {
    this.websocket.send(JSON.stringify({
      type: "END",
      guildId: args.guildId,
      userId: this.client.user?.id,
    }))
  }

  sendMovedCommand(args: {
    guildId: string,
    channelId: string
  }) {
    this.websocket.send(JSON.stringify({
      type: "MOVED",
      guildId: args.guildId,
      userId: this.client.user?.id,
      channelId: args.channelId
    }))
  }

  async getInviteLink() {
    return (await (await fetch(process.env.SERVER_PATH + "/invites")).json()) as { invites: { inviteLink: string, userID: string, username: string }[] }
  }
}