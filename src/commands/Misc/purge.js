const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("purge").setDescription("Deletes a bulk of specified messages.").addNumberOption((option) => option.setName("number").setDescription("Messages count (min: 2 max: 100).").setMinValue(2).setMaxValue(100).setRequired(true)),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor(0x2F3136);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            embed.setDescription('You are missing `MANAGE_MESSAGES` permission.');
            return interaction.reply({ embeds: [embed] });
        }

        const number = interaction.options.getNumber('number');

        embed.setDescription(`Deleted ${number} messages.`);
        
		const fetched = await interaction.channel.messages.fetch({ limit: number });
		await interaction.channel.bulkDelete(fetched).then(interaction.reply({ embeds: [embed] }).then(reply => {
			setTimeout(() => {
				reply.delete();
			}, 2000);
		}));
    },
};
