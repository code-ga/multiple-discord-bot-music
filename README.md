# 🎵 Discord Music Bot

A powerful Discord music bot built with Discord.js v14, Sapphire Framework, and Lavalink. Features multi-language support, advanced queue management, and scalable multi-bot architecture.

## ✨ Features

### 🎶 Music Commands
- **Play** (`lplay`, `lp`) - Play music from YouTube, SoundCloud, and other sources
- **Pause** ( `lpause`) - Pause the current track
- **Resume** ( `lresume`) - Resume playback
- **Skip** ( `lskip`) - Skip to the next track
- **Stop** ( `lstop`) - Stop playback and clear queue
- **Queue** ( `lqueue`) - View the current queue
- **Now Playing** ( `lnp`) - Show current track info
- **Volume** ( `lvol`) - Adjust playback volume (0-100)
- **Loop** ( `lloop`) - Set loop mode (off/single/all)
- **Autoplay** ( `lautoplay`) - Toggle autoplay mode

### 🌐 Multi-Language Support
- **English** - Full support
- **Vietnamese** - Full support
- Automatic locale detection based on Discord server settings

### 🔧 Advanced Features
- **Multi-Bot Architecture** - Scale across multiple bot instances
- **Lavalink Integration** - High-quality audio streaming
- **Smart Search** - Interactive song selection for search queries
- **Playlist Support** - Add entire playlists at once
- **Voice Channel Management** - Automatic connection and disconnection
- **Permission Handling** - Proper permission checks and error messages
- **Canvas Integration** - Rich visual elements (if needed)
- **OpenAI Integration** - AI-powered features (configurable)

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Discord Bot Token
- Lavalink Server (optional - uses public nodes by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd music-bot
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure the bot**
   ```bash
   # Copy example files
   cp .env.example .env
   cp tokens.json.example tokens.json
   cp lavalink.json.example lavalink.json
   ```

4. **Set up your bot tokens**
   
   Edit `tokens.json`:
   ```json
   [
     "YOUR_DISCORD_BOT_TOKEN_HERE"
   ]
   ```

5. **Configure environment (optional)**
   
   Edit `.env`:
   ```env
   NODE_ENV=production
   ```

6. **Configure Lavalink nodes (optional)**
   
   Edit `lavalink.json` to add your own Lavalink servers:
   ```json
   [
     {
       "name": "Your-Lavalink-Node",
       "auth": "your-password",
       "url": "your-lavalink-server:port",
       "secure": false
     }
   ]
   ```

7. **Start the bot**
   ```bash
   bun start
   # or
   npm start
   ```

## 🛠️ Development

### Development Mode
```bash
bun dev
# or
npm run dev
```

### Code Formatting
```bash
bun run format
# or
npm run format
```

### Linting
```bash
bun run lint
# or
npm run lint
```

## 📁 Project Structure

```
src/
├── commands/           # Bot commands
│   ├── play.ts        # Play music command
│   ├── pause.ts       # Pause command
│   ├── resume.ts      # Resume command
│   ├── skip.ts        # Skip command
│   ├── stop.ts        # Stop command
│   ├── queue.ts       # Queue management
│   ├── volume.ts      # Volume control
│   ├── loop.ts        # Loop modes
│   ├── autoplay.ts    # Autoplay toggle
│   ├── nowplaying.ts  # Current track info
│   └── ping.ts        # Ping command
├── i8n/               # Internationalization
│   ├── en.ts          # English translations
│   ├── vi.ts          # Vietnamese translations
│   ├── types.ts       # Type definitions
│   └── index.ts       # i18n utilities
├── listeners/         # Event listeners
├── structures/        # Core structures
│   ├── Client.ts      # Extended Discord client
│   ├── Context.ts     # Command context wrapper
│   └── HandlePlay.ts  # Play command handler
├── lib/               # Utility libraries
├── bot.ts             # Bot instance
├── index.ts           # Main entry point
└── config.ts          # Configuration
```

## 🎛️ Configuration

### Bot Configuration (`src/config.ts`)
```typescript
export const config = {
  developers: ['YOUR_USER_ID'], // Developer user IDs
  prefix: 'l'                   // Command prefix
};
```

### Lavalink Nodes
The bot comes with several public Lavalink nodes pre-configured. You can add your own nodes in `lavalink.json`:

```json
[
  {
    "name": "Your-Node-Name",
    "auth": "your-password",
    "url": "your-server.com:2333",
    "secure": false
  }
]
```

## 🌐 Multi-Bot Setup

This bot supports running multiple instances simultaneously for better scalability:

1. Add multiple tokens to `tokens.json`:
   ```json
   [
     "BOT_TOKEN_1",
     "BOT_TOKEN_2",
     "BOT_TOKEN_3"
   ]
   ```

2. The system will automatically distribute the load across instances
3. Each bot will handle different guilds to prevent conflicts

## 📝 Commands Reference

### Music Commands
| Command | Aliases | Description |
|---------|---------|-------------|
| `lplay <query>` | `lp` | Play a song or playlist |
| `lpause` | - | Pause current playback |
| `lresume` | - | Resume playback |
| `lskip` | - | Skip current song |
| `lstop` | - | Stop and clear queue |
| `lqueue` | `lq` | Show current queue |
| `lnowplaying` | `lnp` | Show current song |
| `lvolume <0-100>` | `lvol` | Set volume |
| `lloop <mode>` | - | Set loop mode (off/single/all) |
| `lautoplay` | - | Toggle autoplay |

### Utility Commands
| Command | Description |
|---------|-------------|
| `lping` | Check bot latency |

## 🚀 Deployment

### Local Deployment
1. Follow the installation steps above
2. Run `bun start` or `npm start`
3. Keep the process running (consider using PM2 or similar)

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "start"]
```

Build and run:
```bash
docker build -t music-bot .
docker run -d -p 3000:3000 music-bot
```

### VPS/Server Deployment
1. **Upload files to your server**
2. **Install Bun or Node.js**
3. **Install dependencies**: `bun install`
4. **Configure tokens and settings**
5. **Use a process manager**:
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start "bun start" --name music-bot
   pm2 save
   pm2 startup
   ```

### Heroku Deployment
1. Create a `Procfile`:
   ```
   web: bun start
   ```
2. Set environment variables in Heroku dashboard
3. Deploy using Git or Heroku CLI

### Railway/Render Deployment
1. Connect your GitHub repository
2. Set build command: `bun install`
3. Set start command: `bun start`
4. Configure environment variables

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | No |
| `DISCORD_TOKEN` | Discord bot token | Yes (auto-set) |
| `INDEX` | Bot instance index | Yes (auto-set) |
| `SERVER_PATH` | WebSocket server path | Yes (auto-set) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `bun run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue on GitHub for bug reports
- Join our Discord server for community support
- Check the documentation for common questions

## 🙏 Acknowledgments

- [Sapphire Framework](https://sapphirejs.dev/) - Command framework
- [Discord.js](https://discord.js.org/) - Discord API wrapper
- [Lavalink](https://github.com/freyacodes/Lavalink) - Audio streaming
- [Kazagumo](https://github.com/KagChi/Kazagumo) - Lavalink wrapper

---

Made with ❤️ for the Discord community