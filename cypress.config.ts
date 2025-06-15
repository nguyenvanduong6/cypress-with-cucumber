import { defineConfig } from 'cypress';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin, afterRunHandler } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import xmlParser from './nodejs/xml_parser';

dotenv.config({ path: `.env${process.env.E2E_VARIANT}` });

export default defineConfig({
  e2e: {
    specPattern: '**/*.{feature,features}',
    excludeSpecPattern: '*.{js,ts}',
    experimentalStudio: true,
    baseUrl: process.env.CYPRESS_BASE_URL,

    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      on('after:run', async (
        results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult
      ) => {
        if (results) {
          await afterRunHandler(config);
          fs.writeFileSync('cypress/run/results.json', JSON.stringify(results, null, 2));
        }
      });
      on('task', {
        xmlParser(filePath: string) {
          return xmlParser(filePath);
        },
        fileExists(filePath: string) {
          return fs.existsSync(filePath);
        },
      });
      return config;
    },

    env: {
      userNameLogin: process.env.USER_NAME_LOGIN,
      userPasswordLogin: process.env.USER_PASSWORD_LOGIN,
    },

    defaultCommandTimeout: parseInt(process.env.DEFAULT_TIMED_OUT || '20000'),
    requestTimeout: parseInt(process.env.REQUEST_TIMED_OUT || '10000'),
    responseTimeout: parseInt(process.env.RESPONSE_TIMED_OUT || '10000'),
    video: false,
    testIsolation: false,
    viewportHeight: 900,
    viewportWidth: 1440,
    scrollBehavior: 'center',
  },
});
