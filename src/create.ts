import fs from 'fs-extra';
import chalk from 'chalk';
import { spawn } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';
import symbols from 'log-symbols';
import { Extractor } from '@taraus-he/tdunzip';
import { downloadTemplate } from './download';
export async function createProject(name: string) {
  const projectName = name ? process.cwd() + '/' + name : process.cwd();
  try {
    const exists = await fs.pathExists(projectName);
    if (exists) {
      console.log(symbols.error, chalk.red('The project already exists.'));
    } else {
      inquirer
        .prompt([
          {
            type: 'list',
            message: 'Please pick a preset:',
            name: 'preset',
            choices: [
              'React Electron (react, typescript, eslint, prettier)',
              'Vue Electron (Vue, typescript, eslint, prettier)',
            ],
          },
        ])
        .then(async (answers) => {
          const initSpinner = ora(
            chalk.cyan('Initializing project. This might take a while...')
          );
          initSpinner.start();
          const downloadResult: any = await downloadTemplate();
          if (downloadResult.done) {
            const extractor = new Extractor(downloadResult.path, {
              dir: process.cwd() + '/' + name,
            });
            await extractor.extract();
          }
          const templateDir =
            projectName + '/' + 'react-electron-template-master';
          await fs.copy(templateDir, projectName);
          await fs.remove(templateDir);
          initSpinner.text = chalk.green('🎉 The project create successfully!');
          initSpinner.succeed();
          try {
            process.chdir(name);
            console.log(`\nNew directory: ${process.cwd()}\n`);
            const ls = spawn('yarn', ['install']);
            ls.stdout.on('data', (data) => {
              console.log(`🚚 ${data.toString()}`);
            });
            ls.stderr.on('data', (data) => {
              console.log(`⚓ ${data.toString()}`);
            });
            ls.on('close', () => {
              console.log(`👉 To get started:\n$ ${chalk.yellow("cd " + name)}\n$ ${chalk.yellow('yarn install')}\n$ ${chalk.yellow('yarn run dev')}`);
            });
          } catch (err) {
            console.error(`\n chdir: ${err}`);
          }
        });
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
