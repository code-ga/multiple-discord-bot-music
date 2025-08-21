import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { Context, InteractionContext, MessageContext } from '../structures/Context.js';
import { Message, EmbedBuilder } from 'discord.js';
import { getI8n } from '../i8n/index.js';

/**
 * Tạo một Embed thống nhất cho bot
 * @param description Nội dung mô tả
 */
function createEmbed(description: string) {
  return new EmbedBuilder().setColor('#F8BBD0').setDescription(description);
}

@ApplyOptions<Command.Options>({
  description: 'Tăng giảm volume'
})
export class VolumeCommand extends Command {
  // public override registerApplicationCommands(registry: Command.Registry) {
  // 	registry.registerChatInputCommand((command) => command.setName('autoplay').setDescription('Bật/tắt chế độ phát tự động'));
  // }

  public override async messageRun(message: Message, args: Args) {
    await this.execute(new MessageContext(message, args));
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await this.execute(await new InteractionContext(interaction).init());
  }

  private async execute(message: Context) {
    const player = message.client.kazagumo.getPlayer(message.guild!.id);

    if (!player || !player.queue.current) {
      // await send('Không có bài hát nào đang phát để dừng.');
      return;
    }
    const voiceChannel = message.member?.voice.channel;

    // Helper gửi embed nhanh gọn
    const send = (content: string) => message.reply({ embeds: [createEmbed(content)] });

    if (!message.client.user) return;

    if (!message.guild) {
      await send(getI8n('userNotInGuild'));
      return;
    }

    if (!message.channel) {
      await send(getI8n('userNotInChanel', { locale: message.guild.preferredLocale }));
      return;
    }

    if (!voiceChannel) {
      process.env.INDEX == "0" && await send(getI8n('userNotInVoiceChannel', { locale: message.guild.preferredLocale }));
      return;
    }

    if (voiceChannel.id != player.voiceId) {
      return
    }


    const volume = message.isMessage() ? await message.args.pick('string').catch(() => null) : message.options.getString('volume');
    await player.setVolume(Math.max(0, Math.min(Number(volume) || 100, 100)));

    // await send(`Tự động phát nhạc: ${player.data.get('autoplay') ? 'Bật' : 'Tắt'}.`);
    await send(getI8n('settedVolume', { locale: message.guild.preferredLocale, variables: { volume: "" + player.volume } }));
  }
}
