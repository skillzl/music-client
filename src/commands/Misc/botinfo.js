const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("botinfo").setDescription("Shows information about this bot."),
    async execute(interaction) {
        const embed = new EmbedBuilder();
        embed.setDescription("This is application is Discord music bot that can be self-hosted to allow users to listen to music, videos, and livestreams in a voice channel together.");
        embed.setColor(0x2F3136);

        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("GitHub").setURL("https://github.com/skillzl"), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Website").setURL("https://skillzl.dev"), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Eres").setURL("https://eres.fun"), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("API").setURL("https://api.skillzl.dev"));

        return await interaction.reply({ embeds: [embed], components: [row] });
    },
};
