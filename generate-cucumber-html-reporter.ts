const report = require('multiple-cucumber-html-reporter');
const dayjs = require('dayjs');
const { readFileSync } = require('fs');
const os = require('os');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.ci' });

const data = readFileSync('cypress/run/results.json', {
  encoding: 'utf8',
  flag: 'r',
});
const runInfos = JSON.parse(data);

const mapOs = (os) => {
  if (os.startsWith('win')) {
    return 'windows';
  } else if (os.startsWith('darwin')) {
    return 'osx';
  } else if (os.startsWith('linux')) {
    return 'linux';
  } else if (os.startsWith('ubuntu')) {
    return 'ubuntu';
  } else if (os.startsWith('android')) {
    return 'android';
  } else if (os.startsWith('ios')) {
    return 'ios';
  }
};

//const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');
const GITHUB_SHA = process.env.GITHUB_SHA || 'local-run';
const playlistDomain = process.env.PLAY_LIST_DOMAIN;
const durationSec = (runInfos['totalDuration'] / 1000).toFixed(2);

report.generate({
  jsonDir: './cypress/reports/',
  reportPath: `./cypress/reports/${GITHUB_SHA}`,
  metadata:{
    browser: {
      name:
        runInfos.browserName === 'chromium' ? 'chrome' : runInfos.browserName,
      version: runInfos.browserVersion,
    },
    device: os.hostname(),
    platform: {
      name: mapOs(runInfos.osName),
      version: runInfos.osVersion,
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Channel URL', value: playlistDomain },
      { label: 'Cypress Version', value: runInfos['cypressVersion'] },
      { label: 'Duration', value: durationSec + 's' },
      {
        label: 'Execution Start Time',
        value: dayjs(runInfos['startedTestsAt']).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
      {
        label: 'Execution End Time',
        value: dayjs(runInfos['endedTestsAt']).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
    ],
  }
});
