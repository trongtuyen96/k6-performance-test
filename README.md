<h1 align="center">
  <br>
  <a><img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/ATWT_background.PNG"></a>
  <a><img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9aefd091a901c81ffff7ec93213e83fc83c80ba8/covers/badge.png" alt="badge" width="800px"></a>
</h1>

<h3 align="center" style="bold">An automation testing framework based on Cypress for REST API and WebUI testing using Page Object Model, Mocha, Lighthouse and CI intergrated with Github Actions, CircleCI, GitlabCI and Bitbucket Pipelines. Running with spec file. No BDD.</h3>

<p align="center">
  <a alt="CircleCI" href="https://circleci.com/gh/trongtuyen96/cypress-framework-spec/tree/main">
    <img src="https://circleci.com/gh/trongtuyen96/cypress-framework-spec/tree/main.svg?style=svg">
  </a>
  <a alt="TravisCI" href="https://travis-ci.com/trongtuyen96/cypress-framework-spec">
    <img src="https://travis-ci.com/trongtuyen96/cypress-framework-spec.svg?branch=main">
  </a>
  <a alt="GitlabCI" href="https://gitlab.com/trongtuyen96/cypress-framework-spec/-/pipelines">
    <img src="https://gitlab.com/trongtuyen96/cypress-framework-spec/badges/main/pipeline.svg">
  </a>
  <a alt="CypressFrameworkSpec" href="https://dashboard.cypress.io/projects/duny7e/runs">
    <img src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/duny7e/main&style=flat&logo=cypress">
  </a>
  <a alt="GitHub Actions - Main" href="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/main.yml">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/main.yml/badge.svg">
  </a>
  <a alt="GitHub Actions - Sync Bitbucket" href="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-bitbucket-https.yml">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-bitbucket-https.yml/badge.svg">
  </a>
  <a alt="GituUb Actions - Sync Gitlab" href="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-gitlab-https.yml">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-gitlab-https.yml/badge.svg">
  </a>
</p>


## Table of Contents

- [Changelogs](#changelogs)
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Write Test](#write-test)
- [Set Up](#set-up)
- [Author](#author)
- [License](#license)

## Changelogs

.....

:star: 28/08/2021 : Update the comparing key value of API test (which not correct if return a array of object)

:star: 30/08/2021 : Add schema validator with ajv

:star: 31/08/2021 : CI test with Github Actions, CircleCI, Travis CI, Bitbucket Pipeleines, Gitlab Pipelines

## Features

:gear: Testing across REST API and Web UI applications

:gear: Multiple browser automation

:gear: Multiple reports (JSON, html) with failed screenshots attached

:gear: CI integrated (CircleCI, Github Actions, GitlabCI, Bitbucket Pipelines)

:gear: Performance testing with Lighthouse and Pa11y

:gear: Visual regression testing supported

:gear: Page Object Model

:gear: Schema Validator with ajv

:gear: Parallel runs with CI provider

:gear: Parallel runs with Cypress Dashboard

:gear: And other functions inherited from Cypress


## Installation

Use npm to install the dependencies

```bash
    npm install
```

## Basic Usage

#### Open cypress

```bash
    npx cypress open
```

#### Run all features

```bash
    npx cypress run 
```

#### Run all features on specific browser

```bash
    npx cypress run --browser firefox
```

#### Run all features on headless mode

```bash
    npx cypress run --headless
```

#### Run a specific feature file

```bash
    npx cypress run --spec cypress/integration/{spec.js file}
```

#### Run multiple feature files

```bash
    npx cypress run --spec "cypress/integration/atwt-api/*.spec.js"  --browser chrome
```

More details: https://docs.cypress.io/guides/guides/command-line

## Write test

### Write UI Test Case

#### Add page file with locators and methods

- Head to cypress/support/pages and create new .page.js file
- List all locators of elements in the page
- Write methods that supports your test validations/actions
- Export the page object
	
<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/write_test_1.png" width="650px">
</p>
	
#### Add new test spec file and write test
	
- Head to cypress/integration/atwt-ui and create new .spec.js file
- Import the created page object that including the functions/validators you want to use
- "describe" tag for test suite
- "context" tag for group of test cases by condition
- "it" tag for test case
- Initialize page object and call methods/validators for testing purpose
	
<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/write_test_2.png" width="650px">
</p>

### Write API Test Case

#### Add new test spec file and write test

- Head to cypress/integration/atwt-api and create new .spec.js file
- Import the api-action
- "describe" tag for test suite
- "context" tag for group of test cases by condition
- "it" tag for test case
- Some bilt-in functions: makeRequest(), validateResponseKeyValue(), getResponseBodyValue(), setHeader(), ...

<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/write_test_3.png" width="650px">
</p>

#### Validate resposne schema

- Create new schema file inside support/schema as following

<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/write_test_4.png" width="500px">
</p>

- Import the schema configuration in your test spec.js file
- Call cy.validateSchema(<your schema>, apiAction.getResponseBody()) to validate schema of response 

#### Store run-time parameters

- Store the run-time parameter by adding key and value: cy.addRuntimeVariable(<key name>, <value>)
- Get the stored parameter by cy.getRuntimeVariable(<key name>)
- Remmeber to .then() since Cypress command is asynchonous

<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/write_test_5.png" width="650px">
</p>
	
## Set Up
	
### Multiple reports option
	
1. Install cypress-multi-reporters
```bash
    npm install --save-dev cypress-multi-reporters
```
2. Install cypress-mochawesome-reporter and mocha-junit-reporter
```bash
    npm install --save-dev cypress-mochawesome-reporter,mocha-junit-reporter
```
3. Config reporter in cypress.json
    - Define the reports we want to use by "reporterEnabled" tag
    - For Mocha Junit Report:
        - "mochaFile" to define the output report structure
        - [hash] to generate hash string which helps distinquish report files
        - "jenkinsMode" to generate more beautiful report displayed on Jenkins
    - For Mochawesome Report:
        - "chart" to include chart counts
        - "reportPageTitle" to specify report title
        - "reportFilename" and "reportDir" to specify name and locations of output reports
        - "embeddedScreenshots" to attach screenshots for failed cases
        - "timestamp" to append timestamp to report name, prevent replacement

<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/reports.png" width="650px">
</p>
	
4. After executions, reports are located in cypress/reports
5. Head to <a href="https://www.npmjs.com/package/cypress-multi-reporters">cypress-multi-reporters</a> for more configurations

### Visual regression testing
	
1. Install cypress-pugin-snapshots
```bash
    npm install --save-dev cypress-plugin-snapshots
```
2. Add this config to cypress.json file
```bash
    "ignoreTestFiles": [
      "**/__snapshots__/*",
      "**/__image_snapshots__/*"
    ]
```
3. Modify /plugin/index.js with 
```bash
    const { initPlugin } = require('cypress-plugin-snapshots/plugin');

    module.exports = (on, config) => {
        initPlugin(on, config);
    }
```
4. Import this into /support/index.js
```bash
    import 'cypress-plugin-snapshots/commands';
```
5. Config the settings
<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/snapshots.png" width="300px">
</p>

6. Take snapshot
```bash
    cy.toMatchSnapshot();

    cy.get(<element>).toMatchSnapshot();
```
7. Run the test the first time to get the base snapshots

8. To update snapshots when there are changes where expected
```bash
    npx cypress run --env updateSnapshots=true --spec cypress/integration/atwt-ui/ui-regression.spec.js --browser chrome
```

9. Head to <a href="https://www.npmjs.com/package/cypress-plugin-snapshots">cypress-plugin-snapshots</a> for more configurations
	
### Performance Testing with Google Lighthouse and Pa11y
	
1. Install cypress-audit
```bash
    npm install --save-dev cypress-audit
```
2. Set up prepareAudit when brower launch in /plugin/index.js
```bash
    on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions); });
```
3. Set up task to write test result into report files
4. Use cy.lighthouse() or cy.pa11y() to run performance testing

<p align="center">
    <img src="https://github.com/trongtuyen96/cypress-framework-spec/blob/9ecb4ea0c124ab010b687d8a4c6cbb1bdec6caff/covers/performance.png" width="650px">
</p>

5. After executions, reports are located in cypress/reports

### Schema Validator with ajv
	
1. Install ajv
```bash
    npm install --save-dev ajv
```
2. Add new command vlidateSchema in /support/validate-schema-command.js
```bash
    export const validateSchema = (schema, response) => {
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(response);

      if (!valid) {
        getSchemaError(validate.errors).then((schemaError) => {
          throw new Error(schemaError);
        });
      } else {
        cy.log("Schema validated!");
      }
    };
```
3. Add the defined command in support/commands.js of Cypress
```bash
    import { validateSchema } from "./validate-schema-command";
	
    Cypress.Commands.add("validateSchema", validateSchema);
```
4. Create schema file in support/schema
5. Import schema file and call cy.validateSchema() to validate response schema
6. Head to <a href="https://ajv.js.org/json-schema.html">AJV</a> for more configurations
	
### Custom response body value validation method

### Parallel run with CI provider and Cypress Dashboard

<p align="center">
Cypress Dashboard
	<br>
    <a alt="CypressFrameworkSpec" href="https://dashboard.cypress.io/projects/duny7e/runs">
        <img src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/duny7e/main&style=flat&logo=cypress">
    </a>
</p>
		
CI | Build status | Config File | Set up Cypress Dashboard
:--- | :--- | :--- | :---
CircleCI | [![CircleCI](https://circleci.com/gh/trongtuyen96/cypress-framework-spec/tree/main.svg?style=svg)](https://circleci.com/gh/trongtuyen96/cypress-framework-spec/tree/main) | [config.yml](.circleci/config.yml) | Already set up with CYPRESS_RECORD_KEY as enviroment variable in CircleCI
CircleCI - v2 Config without Orbs| Not activated | [.circleci/config-without-orbs.yml](config-without-orbs.yml) | Already set up with CYPRESS_RECORD_KEY as enviroment variable in CircleCI
TravisCI | [![TravisCI](https://travis-ci.com/trongtuyen96/cypress-framework-spec.svg?branch=main)](https://travis-ci.com/trongtuyen96/cypress-framework-spec) | [.travis.yml](.travis.yml) | Comment out code lines with record on Cypress Dashboard
GitlabCI | [![GitlabCI](https://gitlab.com/trongtuyen96/cypress-framework-spec/badges/main/pipeline.svg)](https://gitlab.com/trongtuyen96/cypress-framework-spec/-/pipelines) | [.gitlab-ci.yml](.gitlab-ci.yml) | Comment out code lines with record on Cypress Dashboard
Github Actions | [![Github - Main](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/main.yml/badge.svg)](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/main.yml) | [main.yml](.github/workflows/main.yml) | Comment out code lines with record on Cypress Dashboard
Github Actions - Sync Bitbucket | [![Github - Sync Bitbucket](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-bitbucket-https.yml/badge.svg)](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-bitbucket-https.yml) | [sync-bitbucket-https.yml](.github/workflows/sync-bitbucket-https.yml) | To sync code to Bitbucket
Github Actions - Sync Gitlab | [![Github - Sync Gitlab](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-gitlab-https.yml/badge.svg)](https://github.com/trongtuyen96/cypress-framework-spec/actions/workflows/sync-gitlab-https.yml) | [sync-gitlab-https.yml](.github/workflows/sync-gitlab-https.yml) | To sync code to Gitlab
	
## Author
	
<h4 align="center">
	Tuyen Nguyen - Senior QA Automation Engineer
</h4>
    <h5 align="center">
	<a href="trongtuyen96@gmail.com">trongtuyen96@gmail.com</a>
    </h5>
<p align="center">
	 <a alt="Github" href="https://github.com/trongtuyen96">
    <img src="https://user-images.githubusercontent.com/25218255/47360756-794c1f00-d6fa-11e8-86fa-7b1c2e4dda92.png" width="50">
  </a>
		 <a alt="LinkedIn" href="https://www.linkedin.com/in/tuyennguyen96/">
    <img src="https://user-images.githubusercontent.com/25218255/47360366-8583ac80-d6f9-11e8-8871-219802a9a162.png" width="50">
  </a>
		 <a alt="Facebook" href="https://www.facebook.com/tuyen.trong.3">
    <img src="https://user-images.githubusercontent.com/25218255/47360363-84eb1600-d6f9-11e8-8029-818481536200.png" width="50">
  </a>
</p>

## License
	
~~~~
Copyright 2021 Tuyen Nguyen

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
~~~~
