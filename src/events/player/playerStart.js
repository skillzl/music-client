const { EmbedBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
    name: "playerStart",
    async execute(queue, track) {

        const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setDescription(`Now playing **[${track.title}](${track.url})** by **${track.author}**.`);

        queue.metadata.channel.send({ embeds: [embed] });
    },
};
