import chalk from "chalk";

const log = console.log;
log.error = function(message) {
  log(chalk.red(message));
}

log.secondary = function(message) {
  log(chalk.black.bgWhite.bold(message));
}

log.info = function(message) {
  log(`\n${chalk.black.bgGreen.bold(message)}`);
}

log.warn = function(message) {
  log(chalk.black.bgYellow.bold(message));
}

export default log;
