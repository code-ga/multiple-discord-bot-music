import { NodeOption } from 'shoukaku';
import fs from "fs"

export const config = {
	developers: [],
	prefix: 'l'
};


export const LavalinkNodes: NodeOption[] = [
	...fs.existsSync('./lavalink.json') ? JSON.parse(fs.readFileSync('./lavalink.json', 'utf-8')) :
		[],
	{
		url: "lava-v4.ajieblogs.eu.org:443",
		name: "Ajieblogs",
		auth: "https://dsc.gg/ajidevserver",
		secure: true,
	},
	{
		url: "lavalinkv4.serenetia.com:443",
		name: "Serenetia",
		auth: "https://dsc.gg/ajidevserver",
	}
];