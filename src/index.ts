import { setup } from '@skyra/env-utilities';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import http from "http"
import WebSocket, { WebSocketServer } from "ws"
import express from "express"
import tokens from "../tokens.json" with {type: "json"}

setup();
const allProcess = [] as ChildProcessWithoutNullStreams[];
process.on('SIGTERM', () => {
	console.log("Exit")
	for (const process of allProcess) {
		process.kill();
	}
	process.exit(0)
});

process.on("SIGINT", () => {
	console.log("Exit")
	for (const process of allProcess) {
		process.kill();
	}
	process.exit(0)
});
const serverPath = "http://localhost:3000"
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server, autoPong: true })
const clients = new Map<string, { userID: string, username: string, guildIDs: string[], ws: WebSocket, busyGuild: Set<string>, inviteLink: string, voiceChannelIDs: Map<string, string> }>()
const handledMessage = new Map<string, { offererID: string, voiceChannelId: string, textChannelId: string, guildId: string, messageId: string, breakUserIDs: Set<string> }>()
app.get("/invites", (req, res) => {
	res.json({
		invites: Array.from(clients.values()).map(client => {
			return {
				inviteLink: client.inviteLink,
				userID: client.userID,
				username: client.username
			}
		})
	})
})
wss.on('connection', (ws) => {
	let userID: string
	ws.on('message', (message, isBinary) => {
		// clients.set(ws, ws)
		if (isBinary) {
			return
		}
		const messageData = JSON.parse("" + new String(message))
		console.log(messageData)
		if (messageData.type == "IDENTIFY") {
			const { userID: botID, guildIDs, inviteLink } = messageData
			clients.set(botID, {
				userID: botID,
				guildIDs,
				ws,
				inviteLink,
				busyGuild: new Set<string>(),
				voiceChannelIDs: new Map<string, string>(),
				username: messageData.botName
			})
			userID = botID
		} else if (messageData.type == "PLAY") {
			const { offererID, voiceChannelId, textChannelId, guildId, messageId } = messageData
			if (handledMessage.has(messageId)) {
				return
			}
			// if (voiceChannelIds.has(voiceChannelId)) {
			// 	return
			// }
			for (const client of clients.values()) {
				if (client.voiceChannelIDs.get(guildId) == voiceChannelId) {
					return
				}
			}
			handledMessage.set(messageId, {
				offererID,
				voiceChannelId,
				textChannelId,
				guildId,
				messageId,
				breakUserIDs: new Set<string>()
			})
			for (const client of clients.values()) {
				if (client.guildIDs.includes(guildId) && !client.busyGuild.has(guildId) && !handledMessage.get(messageId)?.breakUserIDs.has(client.userID)) {
					client.ws.send(JSON.stringify({ ...messageData, userID: client.userID }))
					break
				}
			}
		} else if (messageData.type == "SUCCESS") {
			const { userID, successData } = messageData
			clients.get(userID)?.busyGuild.add(successData.guildId)
			clients.get(userID)?.voiceChannelIDs.set(successData.guildId, successData.voiceChannelId)
			// voiceChannelIds.set(successData.voiceChannelId, userID)
		} else if (messageData.type == "ERROR") {
			const { userID, failData, reason } = messageData
			console.log(reason)
			clients.get(userID)?.busyGuild.delete(failData.guildId)
			handledMessage.get(failData.messageId)?.breakUserIDs.add(userID);
			for (const client of clients.values()) {
				if (client.guildIDs.includes(failData.guildId) && !client.busyGuild.has(failData.guildId) && !handledMessage.get(failData.messageId)?.breakUserIDs.has(client.userID)) {
					client.ws.send(JSON.stringify({ ...messageData, userID: client.userID }))
					break
				}
			}
		} else if (messageData.type == "END") {
			const { userId, guildId } = messageData
			clients.get(userId)?.busyGuild.delete(guildId)
			clients.get(userId)?.voiceChannelIDs.delete(guildId)
			// voiceChannelIds.delete(voiceChannelId)
		} else if (messageData.type == "MOVED") {
			const { userId, guildId, channelId } = messageData
			clients.get(userId)?.voiceChannelIDs.set(guildId, channelId)
		}

	});
	ws.on("close", () => {
		clients.delete(userID)
	})
});

server.listen(3000, () => {
	console.log("Listening on", serverPath)
})


let i = 0
for (const token of tokens) {
	const botProcess = spawn(process.argv[0], ['./src/bot.ts'], {
		env: {
			...process.env,
			DISCORD_TOKEN: token,
			INDEX: i.toString(),
			SERVER_PATH: serverPath
		}
	});

	botProcess.stdout.on('data', (data) => {
		// console.log(`stdout: ${data}`);
		console.log(`${data}`)
	});

	botProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	botProcess.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
	allProcess.push(botProcess);
	await new Promise((resolve) => setTimeout(resolve, 7000));
	i += 1
}

