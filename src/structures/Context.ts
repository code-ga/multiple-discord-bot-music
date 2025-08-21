import { Args } from '@sapphire/framework';
import {
	CommandInteraction,
	GuildMember,
	InteractionEditReplyOptions,
	InteractionResponse,
	Message,
	MessageCreateOptions,
	MessagePayload
} from 'discord.js';

export class MessageContext {
	message: Message;
	isMessage(): this is MessageContext {
		return true;
	}

	constructor(
		message: Message,
		public args: Args
	) {
		this.message = message;
	}

	get guild() {
		return this.message.guild;
	}

	get client() {
		return this.message.client;
	}

	get author() {
		return this.message.author;
	}

	get channel() {
		return this.message.channel;
	}
	get id() {
		return this.message.id
	}

	get mentions() {
		return this.message.mentions;
	}

	get deletable() {
		return this.message.deletable;
	}

	get content() {
		return this.message.content;
	}

	get member() {
		return this.message.member;
	}

	reply(message: string | MessagePayload | MessageCreateOptions) {
		return this.message.reply(message);
	}

	send(message: string | MessagePayload | MessageCreateOptions) {
		if (!this.message.channel.isSendable()) {
			throw new Error('Channel is not sendable');
		}
		return this.message.channel.send(message);
	}

	delete() {
		if (this.message.deletable) return;
		return this.message.delete();
	}
}

export class InteractionContext {
	interaction: CommandInteraction;
	isMessage(): this is MessageContext {
		return false;
	}

	sendedInteraction?: InteractionResponse = undefined;
	constructor(interaction: CommandInteraction) {
		this.interaction = interaction;
	}

	async init() {
		this.sendedInteraction = await this.interaction.deferReply();
		return this;
	}

	get guild() {
		return this.interaction.guild;
	}

	get client() {
		return this.interaction.client;
	}

	get author() {
		return this.interaction.user;
	}
	get id() {
		return this.interaction.id
	}

	get channel() {
		return this.interaction.channel;
	}

	get member() {
		return this.interaction.member as GuildMember | null;
	}

	get options() {
		if (!this.interaction.isChatInputCommand()) throw new Error('Interaction is not a chat input command');
		return this.interaction.options;
	}

	get subcommands() {
		if (!this.interaction.isChatInputCommand()) throw new Error('Interaction is not a chat input command');
		return this.interaction.options.getSubcommand(false);
	}

	async reply(message: string | MessagePayload | InteractionEditReplyOptions) {
		return await this.interaction.editReply(message as InteractionEditReplyOptions);
	}

	/**
	 * Warning: the type of this method is not stable , so you should careful when use
	 */
	async send(message: string | MessagePayload | InteractionEditReplyOptions) {
		return await this.interaction.editReply(message);
	}

	getStringArg(name: string, _index: number, defaultValue?: string) {
		const arg = this.options.getString(name, false);
		if (arg) return arg;
		return defaultValue;
	}
}

export type Context = MessageContext | InteractionContext;
