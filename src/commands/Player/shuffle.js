const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles all tracks currently in the queue.").setDMPermission(false),
    async execute(interaction) {
        const player = Player.singleton();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(0x2F3136);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
            return await interaction.reply({ embeds: [embed] });
        }

        if (!queue.tracks.toArray()[0]) {
            embed.setDescription("There aren't any other tracks in the queue. Use **/play** to add some more.");
            return await interaction.reply({ embeds: [embed] });
        }

        queue.tracks.shuffle();

        embed.setDescription(queue.tracks.length === 1 ? `Successfully shuffled **${queue.tracks.toArray().length} track**!` : `Successfully shuffled **${queue.tracks.toArray().length} tracks**!`);
        return await interaction.reply({ embeds: [embed] });
    },
};
