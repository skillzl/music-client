const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("bassboost").setDescription("Applies the bass boost effect to the current music.").setDMPermission(false),
    async execute(interaction) {
        const player = Player.singleton();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(0x2F3136);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
        } else {
            queue.filters.ffmpeg.toggle(["bassboost"]);
            embed.setDescription(`The **bassboost** filter is now ${queue.filters.ffmpeg.filters.includes("bassboost") ? "enabled." : "disabled."}`);
        }

        return await interaction.reply({ embeds: [embed] });
    },
};
