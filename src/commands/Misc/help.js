const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Shows all client's commands available."),
    async execute(interaction) {
        const embed = new EmbedBuilder();
        embed.setTitle("Client Help");
        embed.setDescription("Thank you for using **our app**! To view all available commands, choose a category from the select menu below.");
        embed.setColor(0x2F3136);

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder().setCustomId(`client_help_category_select_${interaction.user.id}`).setPlaceholder("Select a category to view commands.").addOptions(
                {
                    label: "General",
                    description: "Commands available that do not relate to music.",
                    value: "client_help_category_general",
                },
                {
                    label: "Music Controls",
                    description: "Commands that are used to control the music being played.",
                    value: "client_help_category_music",
                },
                {
                    label: "Effects",
                    description: "Commands that control the effects currently applied to music.",
                    value: "client_help_category_effects",
                }
            )
        );

        return await interaction.reply({ embeds: [embed], components: [row] });
    },
};
