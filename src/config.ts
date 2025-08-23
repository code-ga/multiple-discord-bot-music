import { Node, NodeOption } from 'shoukaku';
import fs from "fs"
import { FetchLavaLinkInfo } from './utils/FetchLavaLinkInfo.js';

export const config = {
	developers: [],
	prefix: 'l'
};

function hasSubArray<T>(master: T[], sub: T[]) {
	for (let i = 0; i < sub.length; i++) {
		if (!master.includes(sub[i])) return false
	}
	return true
}
export const LavalinkNodes: NodeOption[] = [
	...(await FetchLavaLinkInfo()).nodes
		.filter(node => node.isConnected && hasSubArray(node.info?.sourceManagers || [], ["youtube", "soundcloud", "http"]))
		.map((node): NodeOption => {
			return ({ auth: node.password || "", name: node.identifier, url: node.host + ':' + node.port, secure: node.secure })
		}),
	...fs.existsSync('./lavalink.json') ? JSON.parse(fs.readFileSync('./lavalink.json', 'utf-8')) :
		[],
];