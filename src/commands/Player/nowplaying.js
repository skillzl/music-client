const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("nowplaying").setDescription("View information about the current track.").setDMPermission(false),
    async execute(interaction) {
        const player = Player.singleton();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(0x2F3136);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
            return await interaction.reply({ embeds: [embed] });
        }

        const progress = queue.node.createProgressBar();
        embed.setDescription(`${progress}\n \n**[${queue.currentTrack.title}](${queue.currentTrack.url})** by **${queue.currentTrack.author}** is currently playing in **${interaction.guild.name}**. This track was requested by <@${queue.currentTrack.requestedBy.id}>.`);

        embed.setThumbnail(queue.currentTrack.thumbnail);

        return await interaction.reply({ embeds: [embed] });
    },
};
