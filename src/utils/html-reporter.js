const reporter = require('k6-html-reporter');

const options = {
        jsonFile: "./results/json-result.json",
        output: "./results/k6-html-reporter/",
    };

reporter.generateSummaryReport(options);