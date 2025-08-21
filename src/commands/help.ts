import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { EmbedBuilder, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Hiển thị hướng dẫn sử dụng bot',
  detailedDescription: 'Hướng dẫn chi tiết về cách sử dụng bot'
})
export class HelpCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    process.env.INDEX == "0" && registry.registerChatInputCommand((builder) => builder.setName('help').setDescription('Hiển thị hướng dẫn sử dụng bot'));
  }

  public override async messageRun(message: Message, _args: Args) {
    const commands = [...this.container.client.stores.get("commands").values()];

    const embed = new EmbedBuilder()
      .setTitle('✨ Command List ✨')
      .setColor([248, 189, 208]) // Using RGB for a softer pink
      .setDescription(`Welcome to the command list! of **${this.container.client.user?.username}**!`)
      .addFields(
        commands.map(command => ({
          name: `${this.container.client.config.prefix}${command.name}`,
          value: `> ${command.description}`, // Adding a subtle indent
          inline: false
        }))
      )
      .setFooter({ text: 'Use ' + `${this.container.client.config.prefix}<command>` + ' to execute commands' });

    await message.reply({ embeds: [embed] });

  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

    const commands = [...this.container.client.stores.get("commands").values()];

    const embed = new EmbedBuilder()
      .setTitle('✨ Command List ✨')
      .setColor([248, 189, 208]) // Using RGB for a softer pink
      .setDescription(`Welcome to the command list! of **${this.container.client.user?.username}**!`)
      .addFields(
        commands.map(command => ({
          name: `${this.container.client.config.prefix}${command.name}`,
          value: `> ${command.description}`, // Adding a subtle indent
          inline: false
        }))
      )
      .setFooter({ text: 'Use ' + `${this.container.client.config.prefix}<command>` + ' to execute commands' });

    await interaction.reply({ embeds: [embed] });
  }
}