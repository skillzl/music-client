/* eslint-disable no-unused-vars */
const logger = require("../../utils/logger");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        logger.success("Client is now ready.");
    },
};
