import program from "commander";
import { update } from "./src/update";
import { downloadTemplate } from "./src/download";
import { createProject } from "./src/create";
import pkg from "./package.json";
program.version(pkg.version, '-v, --version')
program
	.command('upgrade')
	.description("Check the taurus version.")
	.action(() => {
		update()
  })
program
	.command('template')
	.description("Download the template.")
	.action(() => {
		downloadTemplate()
  })
program
  .usage('<commands> [options]')
  .command('init <project_name>')
  .description("Create project")
  .action((name) => {
    createProject(name)
  })
program.parse(process.argv)
