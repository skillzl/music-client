const chalk = require("chalk");
const fs = require("node:fs");
const { format } = require("date-fns");

async function info(str) {
    if (!fs.existsSync("logs")) {
        fs.mkdirSync("logs");
    }
    fs.appendFile(`logs/Log-${format(new Date(), "yyyy-MM-dd")}.log`, `[${format(new Date(), "hh:mm:ss")}] [Client] [INFO]: ${str}\n`, (err) => {
        if (err) throw err;
    });
    console.info(chalk.cyan(`[Client] ${chalk.bold("INFO:")} ${str}`));
}

async function warn(str) {
    if (!fs.existsSync("logs")) {
        fs.mkdirSync("logs");
    }
    fs.appendFile(`logs/Log-${format(new Date(), "yyyy-MM-dd")}.log`, `[${format(new Date(), "hh:mm:ss")}] [Client] [WARN]: ${str}\n`, (err) => {
        if (err) throw err;
    });
    console.warn(chalk.yellow(`[Client] ${chalk.bold("WARNING:")} ${str}`));
}

async function error(str) {
    if (!fs.existsSync("logs")) {
        fs.mkdirSync("logs");
    }
    fs.appendFile(`logs/Log-${format(new Date(), "yyyy-MM-dd")}.log`, `[${format(new Date(), "hh:mm:ss")}] [Client] [ERROR]: ${str}\n`, (err) => {
        if (err) throw err;
    });
    console.error(chalk.red(`[Client] ${chalk.bold("ERROR:")} ${str}`));
}

async function success(str) {
    if (!fs.existsSync("logs")) {
        fs.mkdirSync("logs");
    }
    fs.appendFile(`logs/Log-${format(new Date(), "yyyy-MM-dd")}.log`, `[${format(new Date(), "hh:mm:ss")}] [Client] [SUCCESS]: ${str}\n`, (err) => {
        if (err) throw err;
    });
    console.info(chalk.green(`[Client] ${chalk.bold("SUCCESS:")} ${str}`));
}

module.exports = {
    info,
    warn,
    error,
    success,
};
