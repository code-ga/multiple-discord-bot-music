import '@sapphire/plugin-logger/register';

process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';

colorette.createColors({ useColor: true });

setup();

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

declare module '@skyra/env-utilities' {
	interface Env {
		DISCORD_TOKEN: string;
		MONGO_CONNECTION_STRING: string;
		OPENAI_API_KEY: string;
		SERVER_PATH: string
	}
}
