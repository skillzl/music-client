require('dotenv').config();

const { Player } = require("discord-player");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { 
    YouTubeExtractor,
    SpotifyExtractor,
    SoundCloudExtractor,
    AppleMusicExtractor,
    VimeoExtractor, 
    AttachmentExtractor, 
    ReverbnationExtractor } = require("@discord-player/extractor");
    
const fs = require("node:fs");
const logger = require("./utils/logger");

process.on("unhandledRejection", (reason) => {
    logger.error("An unhandled rejection occurred in the main process:");
    logger.error(reason.stack ? `${reason.stack}` : `${reason}`);
});

process.on("uncaughtException", (err) => {
    logger.error("An uncaught exception occurred in the main process:");
    logger.error(err.stack ? `${err.stack}` : `${err}`);
});

process.on("uncaughtExceptionMonitor", (err) => {
    logger.error("An uncaught exception monitor occurred in the main process:");
    logger.error(err.stack ? `${err.stack}` : `${err}`);
});

process.on("beforeExit", (code) => {
    logger.error("The process is about to exit with code: " + code);
});

process.on("exit", (code) => {
    logger.error("The process exited with code: " + code);
});

const client = new Client({ intents: [ GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds ] });
const player = new Player(client, { autoRegisterExtractor: false, ytdlOptions: { requestOptions: { headers: { cookie: process.env.YOUTUBE_COOKIE ? process.env.YOUTUBE_COOKIE : null } } } });
player.extractors.register(YouTubeExtractor);
player.extractors.register(SpotifyExtractor);
player.extractors.register(SoundCloudExtractor);
player.extractors.register(AppleMusicExtractor);
player.extractors.register(VimeoExtractor);
player.extractors.register(ReverbnationExtractor);
player.extractors.register(AttachmentExtractor);

client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter((file) => file.endsWith(".js"));

(async () => {
    logger.info("Initialising Client...");
    for (var file of functions) {
        require(`./functions/${file}`)(client);
    }

    client.handleCommands();
    client.handleEvents();
    logger.info("Logging into Discord client...");

    await client.login(process.env.TOKEN);
    logger.success(`Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
})();
