// import Keyv from 'keyv';
import { config } from './config.ts';
// import KeyvSqlite from '@keyv/sqlite';
import { Kazagumo } from 'kazagumo';
import OpenAI from 'openai';
import { HandlePlay } from './structures/HandlePlay.ts';
declare module 'discord.js' {
	interface Client {
		config: typeof config;
		// keyv: Keyv<KeyvSqlite>;
		kazagumo: Kazagumo;
		handlePlay: HandlePlay;
	}
}
