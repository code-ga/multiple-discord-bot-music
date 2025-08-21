import { NodeOption } from 'shoukaku';
import fs from "fs"

export const config = {
	developers: [],
	prefix: 'l!'
};


export const LavalinkNodes: NodeOption[] = [
	...fs.existsSync('../lavalink.json') ? JSON.parse(fs.readFileSync('./lavalink.json', 'utf-8')) :
		[],
	{
		name: 'Serenetia-V4',
		auth: 'https://dsc.gg/ajidevserver',
		url: 'lavalinkv4.serenetia.com:443',
		secure: true
	},
	{
		name: 'AjieDev-V4',
		auth: 'https://dsc.gg/ajidevserver',
		url: 'lava-v4.ajieblogs.eu.org:443',
		secure: true
	},
	{
		name: 'Fedot_Compot-main',
		auth: 'https://discord.gg/bXXCZzKAyp',
		url: 'lavalink.fedotcompot.net:443',
		secure: true
	}
];

