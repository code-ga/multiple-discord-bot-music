import { ApplyOptions } from '@sapphire/decorators';
import { Events, UserError } from '@sapphire/framework';
import { Listener, ChatInputCommandDeniedPayload, Identifiers } from '@sapphire/framework';
import { getI8n } from '../i8n/index.js';

export default interface ExtendedUserError extends UserError {
	identifier: string;
	context: unknown;
	cause?: unknown;
	message: string;
	name: string;
	stack?: string;
	precondition?: Record<string, unknown>;
}

@ApplyOptions<Listener.Options>({
	event: Events.ChatInputCommandDenied
})
export class chatInputCommandDeniedHandler extends Listener {
	public async run(error: ExtendedUserError, { interaction }: ChatInputCommandDeniedPayload) {
		if (!interaction.deferred) await interaction.deferReply({ ephemeral: true });
		let content: string;
		if (error.identifier === Identifiers.PreconditionCooldown) {
			content = getI8n('cooldown', {
				locale: interaction.guild?.preferredLocale, variables: {
					time: `${Math.round((error.context as any).remaining / 1000)}s`
				}
			});
		} else if (error.identifier === Identifiers.PreconditionUserPermissions) {
			const missingPermissions = (error.context as any).missing;
			content = getI8n("missingPermissions", {
				locale: interaction.guild?.preferredLocale, variables: {
					permissions: missingPermissions.join(', ')
				}
			});
		} else if (error.identifier === Identifiers.PreconditionClientPermissions) {
			const missingPermissions = (error.context as any).missing;
			content = getI8n("botMissingPermissions", {
				locale: interaction.guild?.preferredLocale, variables: {
					permissions: missingPermissions.join(', ')
				}
			});
		} else if (error.identifier === Identifiers.PreconditionRunIn) {
			content = getI8n('commandNotAllowed', {
				locale: interaction.guild?.preferredLocale, variables: {
					code: `${error.precondition?.name}` || error.identifier.toLocaleLowerCase()
				}
			});
		} else {
			content = getI8n('commandError', {
				locale: interaction.guild?.preferredLocale, variables: {
					code: `${error.identifier}`,
				}
			});
		}
		if (!interaction.replied) {
			if (interaction.deferred) {
				await interaction.editReply({
					content
				});
			} else {
				await interaction.reply({
					content,
					flags: ['Ephemeral']
				});
			}
		}
	}
}
