#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createProject } from '../commands/create.js';
import { sleep } from '../utils/helpers.js';

async function showWelcomeBanner() {
  console.clear();
  const text = figlet.textSync('Project Architect', { font: 'Standard' });
  const rainbowTitle = gradient.pastel.multiline(text);
  console.log(rainbowTitle);
  
  console.log(gradient.pastel('\n🚀 Welcome to Project Architect - Create Beautiful Projects\n'));
  await sleep(1000);
}

async function init() {
  await showWelcomeBanner();

  const program = new Command();

  program
    .name('project-architect')
    .description('A modern CLI tool for generating beautiful project structures')
    .version('1.0.0');

  program
    .command('create')
    .description('Create a new project with style')
    .action(createProject);

  program.parse();
}

init().catch(console.error);