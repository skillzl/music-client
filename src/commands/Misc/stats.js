const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("stats").setDescription("Shows global client's statistics."),
    async execute(interaction, client) {
    
        const embed = new EmbedBuilder();
        embed.setDescription(`Client is currently in **${client.guilds.cache.size} servers** with ${client.users.cache.size} users available.`);
        embed.setColor(0x2F3136);

        return await interaction.reply({ embeds: [embed] });
    },
};
