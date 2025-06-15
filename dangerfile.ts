import { danger, fail, warn, message } from 'danger';
import eslint from '@seadub/danger-plugin-eslint';

// Find out if some particular files have changed in this PR
const documentation = danger.git.fileMatch('**/*.md');
const packageJson = danger.git.fileMatch('package.json');
const lockfile = danger.git.fileMatch('package-lock.json');

// Thank folks for making doc changes
if (documentation.edited) {
  message('Thank you :heart: for your contributing docs!!!');
}

// Remind people to update lockfiles
if (packageJson.modified && !lockfile.modified) {
  warn('This PR modified package.json, but not the lockfile');
}

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 0) {
  warn('Please include a description of your PR changes.');
}

// Check that someone has been assigned to this PR
if (!danger.github.pr.assignee) {
  const method = danger.github.pr.title.includes('WIP') ? warn : fail;
  method('This pull request needs an assignee, and optionally include any reviewers.');
}

// Run eslint check
eslint(null, ['.ts', '.js']);
