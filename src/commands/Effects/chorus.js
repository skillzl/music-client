const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("chorus").setDescription("Applies the chorus effect to the current music.").setDMPermission(false),
    async execute(interaction) {
        const player = Player.singleton();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(0x2F3136);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
        } else {
            queue.filters.ffmpeg.toggle(["chorus"]);
            embed.setDescription(`The **chorus** filter is now ${queue.filters.ffmpeg.filters.includes("chorus") ? "enabled." : "disabled."}`);
        }

        return await interaction.reply({ embeds: [embed] });
    },
};
