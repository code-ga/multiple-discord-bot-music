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
	description: 'Turn on/off auto play (Bật/tắt chế độ phát tự động)', // cSpell:ignore phát động,
})
export class AutoplayCommand extends Command {
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
		const send = (content: string) => message.reply({ embeds: [createEmbed(content)] });

		if (!message.client.user) return;
		if (!message.guild) {
			await send(getI8n('userNotInGuild'));
			return;
		}
		const player = message.client.kazagumo.getPlayer(message.guild!.id);

		if (!player || !player.queue.current) {
			// await send('Không có bài hát nào đang phát để dừng.');
			return;
		}
		const voiceChannel = message.member?.voice.channel;

		// Helper gửi embed nhanh gọn




		if (!message.channel) {
			await send(getI8n('userNotInChanel', { locale: message.guild.preferredLocale }));
			return;
		}

		if (!voiceChannel) {
			process.env.INDEX == "0" && await send(getI8n('userNotInVoiceChannel', { locale: message.guild.preferredLocale }));
			return;
		}

		if (voiceChannel.id != player.voiceId) {
			return;
		}



		player.data.set('autoplay', !player.data.get('autoplay'));

		// await send(`Tự động phát nhạc: ${player.data.get('autoplay') ? 'Bật' : 'Tắt'}.`);
		await send(getI8n('autoPlayResponse', { locale: message.guild.preferredLocale, variables: { status: player.data.get('autoplay') ? 'On (Bật)' : 'Off (Tắt)' } },));
	}
}
