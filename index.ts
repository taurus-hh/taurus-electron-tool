import program from "commander";
import { update } from "./src/update";
import pkg from "./package.json";
program.version(pkg.version, '-v, --version')
program
	.command('upgrade')
	.description("Check the taurus version.")
	.action(() => {
		update()
	})
program.parse(process.argv)
