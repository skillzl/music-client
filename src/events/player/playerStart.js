const { EmbedBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
    name: "playerStart",
    async execute(queue, track) {

        const data = fs.readFileSync("src/data.json");
        var parsed = JSON.parse(data);

        parsed["songs-played"] += 1;

        fs.writeFileSync("src/data.json", JSON.stringify(parsed));

        const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setDescription(`Now playing **[${track.title}](${track.url})** by **${track.author}**.`);

        queue.metadata.channel.send({ embeds: [embed] });
    },
};
