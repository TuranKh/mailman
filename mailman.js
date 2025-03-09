#!/usr/bin/env node

import log from "./cli-helpers/logger.js";
import {program} from "commander"
import loading from "loading-cli"
import checkMethod from './cli-helpers/checkMethod.js';
import checkUrl from './cli-helpers/checkUrl.js';

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
    const statusCode = response.status;
    
    if(statusCode >= 400) {
      log.error(`\nStatus: ${response.status}`)
    }
    else {
      log.info(`\nStatus: ${response.status}`)
    }

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