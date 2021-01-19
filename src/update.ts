import updateNotifier from "update-notifier";
import chalk from "chalk";
const pkg = require("../package.json");
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
export function update() {
  if (notifier.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`)
  } else {
    console.log('No new version is available.')
  }
}
