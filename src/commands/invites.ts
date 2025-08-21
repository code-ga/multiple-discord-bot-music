import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { EmbedBuilder, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Shows the bot\'s invite link',
})
export class InviteCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    process.env.INDEX == "0" && registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
  }

  public override async messageRun(message: Message, _args: Args) {
    if (process.env.INDEX != "0") return
    const invites = await this.container.client.handlePlay.getInviteLink();
    const embed = new EmbedBuilder()
      .setTitle('Invite')
      .setColor([248, 189, 208]) // Using RGB for a softer pink
      .setDescription(`To listen music in many voice with one prefix you can invite bot (as many as you need) to your server. \n\nInvite Link: \n ${invites.invites.map(invite => `[${invite.username}](${invite.inviteLink}) <@${invite.userID}>`).join('\n')}`);

    await message.reply({ embeds: [embed] });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

    const invites = await this.container.client.handlePlay.getInviteLink();
    const embed = new EmbedBuilder()
      .setTitle('Invite')
      .setColor([248, 189, 208]) // Using RGB for a softer pink
      .setDescription(`To listen music in many voice with one prefix you can invite bot (as many as you need) to your server. \n\nInvite Link: \n ${invites.invites.map(invite => `[${invite.username}](${invite.inviteLink}) <@${invite.userID}>`).join('\n')}`);

    await interaction.reply({ embeds: [embed] });
  }
}