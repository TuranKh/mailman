#!/usr/bin/env node

import chalk from 'chalk';
import {program} from "commander"
import loading from "loading-cli"

program
  .option('-h, --headers <char>')
  .option('-b, --body <char>')
  .argument('name, <string>')
  .argument('url, <string>');

program.parse();

const loadingFrames = ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"];

const load = loading({
  frames: loadingFrames,
  text: "Making request..."
});

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const availableMethods = new Set(methods);

const log = console.log;
log.error = function(message) {
  log(chalk.red('Error message: ', message));
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

const checkMethod = function (userEnteredMethod) {
  if (!userEnteredMethod) {
    log.error("Enter method from available method list: ", methods.join(', '));
    return [false, null];
  }

  const formatted = userEnteredMethod.toUpperCase();

  if (availableMethods.has(formatted)) {
    return [true, formatted];
  }

  log.error(`Method: ${userEnteredMethod} is not supported, choose method from list: ${methods.join(', ')}`)
  return [false, null];
}

const checkUrl = function(url) {
  if(!url || url.length === 0) {
    log.error("Enter URL as a second parameter");
    return false;
  }
  const validity = /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=]+@)?(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?(?:\/[^\s]*)?$|^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/; 

  /*
  Valid cases: 
    http://example.com
    https://www.google.com
    https://sub.domain.co.uk
    http://127.0.0.1
    https://192.168.1.1:8080/path/to/resource
  */ 
  const isValid = validity.test(url);
  
  if(isValid) {
    return true;
  }
  log.error("URL is not valid, please enter valid url");
  return false;

}

async function main() {
  const [userEnteredMethod, url] = program.args;
  const {b: body, h: headers} = program.opts();

  const [status, method] = checkMethod(userEnteredMethod);

  if (!status) {
    return;
  }

  const urlCheckStatus = checkUrl(url);

  if(!urlCheckStatus) {
    return;
  }

  try {
    load.start();
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    });
    const data = await response.text();

    log.info(`\nStatus: ${response.status}`)
    log.secondary(`Response: ${data}`);
  }
  catch(e) {
    log.error("Request failed!");
  }
  finally {
    load.stop();
  }
}

main();