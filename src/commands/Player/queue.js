const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("queue").setDescription("Shows all tracks currently in the server queue.").setDMPermission(false),
    async execute(interaction, client) {
        const player = Player.singleton();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(0x2F3136);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
            return await interaction.reply({ embeds: [embed] });
        }

        const queuedTracks = queue.tracks.toArray();

        if (!queuedTracks[0]) {
            embed.setDescription("There aren't any other tracks in the queue. Use **/nowplaying** to show information about the current track.");
            return await interaction.reply({ embeds: [embed] });
        }

        embed.setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }) || client.user.displayAvatarURL({ size: 2048, dynamic: true }));
        embed.setAuthor({ name: `Server Queue - ${interaction.guild.name}` });

        const tracks = queuedTracks.map((track, i) => {
            return `\`${i + 1}\` [${track.title}](${track.url}) by **${track.author}** (Requested by <@${track.requestedBy.id}>)`;
        });
        const songs = queuedTracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other ${songs - 5 > 1 ? "tracks" : "track"} currently in queue.` : "";
        const progress = queue.node.createProgressBar();

        embed.setDescription(`**Current Track:** [${queue.currentTrack.title}](${queue.currentTrack.url}) by **${queue.currentTrack.author}**\n${progress}\n\n${tracks.slice(0, 5).join("\n")}\n\n${nextSongs}`);

        return await interaction.reply({ embeds: [embed] });
    },
};
