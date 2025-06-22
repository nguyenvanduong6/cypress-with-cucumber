# Cypress (TS binding) + Cucumber (BDD)

Cypress is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime.
Cucumber is a tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. By combining these two tools, we can create more reliable and maintainable tests.

## Features

1. Awesome report with screenshots
2. Execute tests on multiple environments
3. Parallel execution
4. Github Actions integrated with downloadable report

## Sample report

[Report](https://nguyenvanduong6.github.io/cypress-with-cucumber/local-run/)

## Project structure

- .github -> yml file to execute the tests in GitHub Actions
- cypress -> Contains all the features & Typescript code
- test-results -> Contains all the reports related file

## Reports

1. [Mutilple Cucumber Report](https://github.com/WasiqB/multiple-cucumber-html-reporter)
2. Screenshots of failure

## Get Started

### Setup:

1. Clone or download the project
2. Extract and open in the VS-Code
3. `npm i` to install the dependencies
4. Create file .env.dev following .env.example
5. `npm run cypress:run-dev` to execute the tests and get report on dev env

### Folder structure

0. `cypress\pages` -> All the elements (UI screen)
1. `cypress\features` -> write your features here
2. `cypress\steps` -> Your step definitions goes here
3. `cypress\reports` -> To generate the report
