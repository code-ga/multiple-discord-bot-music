import { NodeOption } from 'shoukaku';
import fs from "fs"

export const config = {
	developers: [],
	prefix: 'l'
};


export const LavalinkNodes: NodeOption[] = [
	...fs.existsSync('./lavalink.json') ? JSON.parse(fs.readFileSync('./lavalink.json', 'utf-8')) :
		[],
];