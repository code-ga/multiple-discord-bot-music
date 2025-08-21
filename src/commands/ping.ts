import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { EmbedBuilder, Message } from 'discord.js';

/**
 * Tạo Embed thống nhất cho bot
 */
function createEmbed(description: string) {
	return new EmbedBuilder().setColor('#F8BBD0').setDescription(description);
}

@ApplyOptions<Command.Options>({
	description: 'ping pong'
})
export class UserCommand extends Command {

	public override async messageRun(msg: Message, _args: Args) {
		// Send initial ping message
		const pingMessage = await msg.reply({
			embeds: [createEmbed('Ping?')],
		});

		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${pingMessage.createdTimestamp - msg.createdTimestamp
			}ms.`;

		return pingMessage.edit({ embeds: [createEmbed(content)] });
	}
}
