const { EmbedBuilder } = require("discord.js");
const logger = require("../../utils/logger");

module.exports = {
    name: "playerError",
    async execute(queue, error) {
        logger.error("A player error occurred whilst attempting to perform this action:");
        logger.error(error);

        try {
            queue.delete();
        } catch (err) {
            () => {};
        }

        const errEmbed = new EmbedBuilder();
        errEmbed.setDescription("A player error occurred whilst attempting to perform this action.");
        errEmbed.setColor(0x2F3136);

        queue.metadata.channel.send({ embeds: [errEmbed] });
        return;
    },
};
