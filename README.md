<h1 align="center">
  <br>
  <a><img src="https://github.com/trongtuyen96/k6-performance-test/blob/0691f9dad7cfe6819652fc525da5ca82b16b2f92/covers/ATWT_background.PNG"></a>
  <a><img src="https://github.com/trongtuyen96/k6-performance-test/blob/44f59f794a525f583d536c023359f28a9a0bc192/covers/badge.png" alt="badge" width="800px"></a>
  <a><img src="https://github.com/trongtuyen96/k6-performance-test/blob/0691f9dad7cfe6819652fc525da5ca82b16b2f92/covers/dash.png" alt="dash" ></a>
</h1>

<h3 align="center" style="bold">An automation testing framework for performance test based on k6. With InfluxDB, Grafana Dashboard for better visualizations and CI process intergrated by CircleCI, Azure Pipelines, Github Actions.</h3>

<p align="center">
  <a alt="CircleCI" href="https://circleci.com/gh/trongtuyen96/k6-performance-test/tree/main">
    <img src="https://circleci.com/gh/trongtuyen96/k6-performance-test/tree/main.svg?style=svg">
  </a>
  <a alt="GitHub Actions - Main" href="https://github.com/trongtuyen96/k6-performance-test/actions/workflows/k6.yaml">
    <img src="https://github.com/trongtuyen96/k6-performance-test/actions/workflows/k6.yaml/badge.svg">
  </a>
  <a alt="Azure Pipelines" href="https://trongtuyen131296.visualstudio.com/k6-performance-test/_build/latest?definitionId=2&branchName=main">
    <img src="https://trongtuyen131296.visualstudio.com/k6-performance-test/_apis/build/status/trongtuyen96.k6-performance-test?branchName=main">
  </a>
</p>


## Table of Contents

- [Changelogs](#changelogs)
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Write Test](#write-test)
- [InfluxDB and Grafana Dasboard](#influxdb-and-grafana-dashboard)
- [Author](#author)
- [License](#license)

## Changelogs

.....

:star: 01/11/2021 : Add Azure Pipelines

:star: 29/10/2021 : Add k6-reporter as second option for reporting

:star: 28/10/2021: Add Github Actions and CỉcleCI

:star: 24/10/2021 : InfluxDB with Grafana Dashboard for better report visualization

## Features

:gear: Support many performance testing types (Load, Soak, Stress, Spike, ..)

:gear: Cloud execution with different load zones (Asia, EU, US, Canada, ...)

:gear: Multiple reports exported (JSON, HTML, XML)

:gear: CI integrated (CircleCI, Github Actions, GitlabCI, Bitbucket Pipelines)

:gear: InfluxDB + Grafana Dashboard using Docker Compose

:gear: Visual regression testing supported

:gear: And other functions inherited from k6

## Installation

- Head to [k6 Installation](https://k6.io/docs/getting-started/installation/) for your k6 installation

- Use npm to install the dependencies (if any)

```bash
	npm install
```

## Basic Usage

#### Run test locally

- To run any test file (.js), simply use:

```bash
	k6 run <path to test file>
```

#### Run test on cloud

-  To begin, you must first register a [k6 Cloud](https://k6.io/cloud/) account and then log into your account via the CLI.

```bash
	k6 login cloud
```

-  Then, you only have to pass your existing script to the k6 cloud command.

```bash
	k6 cloud <path to test file>
```

- For more info: [Cloud test via CLI](https://k6.io/docs/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/)

#### Run test with options

- Specify VUs (virtual users) as 10, duration 30s, passed as parameters

```bash
	k6 run --vus 10 --duration 30s script.js
```

- Set up standard outpput for result 

```bash
	k6 run --out json=full.json --summary-export=summary.json script.js
```

- For more info: [Running k6](https://k6.io/docs/getting-started/running-k6/)

## Write Test

### Four stages of test life cyle

- To begin, you need to know the four distinct life cycle stages in a k6 test are "init", "setup", "VU" and "teardown"

```bash
	// 1. init code

	export function setup() {
	  // 2. setup code
	}

	export default function (data) {
	  // 3. VU code
	}

	export function teardown(data) {
	  // 4. teardown code
	}
```

:one: Init code - VU level: outside of default function() and only run once per VU

:two: VU code - VU level: inside of default function() and is run over and over for as long as the test is running. A VU will execute the default function from start to end in sequence, once the VU reaches the end of the default function it will loop back to the start and execute the code all over.

:three: Setup code - Test-wide level: The setup is only called once for a test. Setup is called at the beginning of the test, after the init stage but before the VU stage (default function

:four: Teardown code - Test-wide level: The teardown are only called once for a test. Teardown is called at the end of a test, after the VU stage (default function).

- For more info: [k6 Test Life Cycle](https://k6.io/docs/using-k6/test-life-cycle/)

### Example test

#### The example with making HTTP request and using stages in k6 (ram-up and ramp-down)

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/04b0463571cf336369ea9f0927fa918570daeda2/covers/test-1.png" width="580px">
</p>

- The configuration of stages would be set inside options, and there are 3 stages described in example
- default function is where we write code for VU. In this example, we amke HHTP request get to http://test.loadimpact.com
- check is built-in method of k6 to validate result. We checked status was 200 and transaction time < 200
- sleep() to stimulate break time between each iteration of VU

#### The example with cloud execution (custom load zones) and thresholds

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/04b0463571cf336369ea9f0927fa918570daeda2/covers/test-2.png" width="650px">
</p>

- In line 5, we used Rate, one of four custom metrics provided by k6. Rate is an object for representing a custom metric keeping track of the percentage of added values that are non-zero. We put this Rate ("failed requests") into threshold to check fail rate had to be < 10%
- Threshold are a pass/fail criteria used to specify the performance expectations. In this example, we defined http_req_duration with p(95) < 250, this means 95% of request durations must be less than 250ms.
- From line 20 onwards, that's where we set up load zones for cloud test, 60% traffic distributed on AWS Ashburn, 40% on AWS Dublin.
- Line 22, we can set up projectID, which is linked to created project on k6 cloud for reporting
- Line 37 and 39, value of true (1) and false (0) were put into Rate "failed requests"

### Using k6-reporter for better HTML reports

- Add below lines of code in init section to import 

```bash
	import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
```

- Then add this function to the test file, which is implicitly called by k6 at the end of every test.

```bash
	export function handleSummary(data) {
  	  return {
            "summary.html": htmlReport(data),
  	  };
	}
```
### Using multiple reporters

- Import jUnit and textSummary for k6 lib

```bash
	import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
	import { jUnit, textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
```

- Add more options for reports

```bash
	export function handleSummary(data) {
    	  return {
	    "./results/html-result.html": htmlReport(data),
	    stdout: textSummary(data, { indent: " ", enableColors: true }),
	    './results/junit-result.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
	    './results/json-result.json': JSON.stringify(data), // and a JSON with all the details...
    	  };
	}
```
### More testing type examples

- [Smoke testing](https://github.com/trongtuyen96/k6-performance-test/blob/main/examples/smoke-test.js)
- [Load testing](https://github.com/trongtuyen96/k6-performance-test/blob/main/examples/load-test.js)
- [Stress testing](https://github.com/trongtuyen96/k6-performance-test/blob/main/examples/stress-test.js)
- [Soak testing](https://github.com/trongtuyen96/k6-performance-test/blob/main/examples/soak-test.js)

### More information
- [HTTP Requests](https://k6.io/docs/using-k6/http-requests/)
- [Custom Metrics](https://k6.io/docs/using-k6/metrics/)
- [Check](https://k6.io/docs/using-k6/checks/)
- [Thresholds](https://k6.io/docs/using-k6/thresholds/)
- [Tags and Groups](https://k6.io/docs/using-k6/tags-and-groups/)
- [Options](https://k6.io/docs/using-k6/options/)
- [Result Ouput](https://k6.io/docs/getting-started/results-output/)

## InfluxDB and Grafana Dashboard

### Definition

- Adding InfluxDB and Grafana, K6 gives a very powerful visualisation of the load test as it runs
- [InfluxDB](https://github.com/influxdata/influxdb): is a fast time-series database, which is supported by K6 as an output target for realtime monitoring of a test. Whilst K6 is running, it will stream run statistics to InfluxDB
- [Grafana](https://github.com/grafana/grafana): is a beautiful browser UI for data visualisation, which supports InfluxDB as a data source
- [Docker](https://www.docker.com/): is a platform for containers. Docker Compose adds the ability to bundle multiple containers together into complex integrated applications.

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/cf8f5b62b362bdb4f14e240095b15c882901d2be/covers/influxdb-grafana.png" width="800px">
</p>

### Set up to run

#### docker-compose.yml

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/cf8f5b62b362bdb4f14e240095b15c882901d2be/covers/docker-compose.png" width="780px">
</p>

- There are 3 servers and two networks where
	- Runs Grafana web server for visualisation in the background on port 3000
	- Runs InfluxDB database in the background on port 8086
	- Runs K6 on an ad-hoc basis to execute a load test script

### External files

- grafana-datasource.yaml: configures Grafana to use InfluxDB as a data source, connect to the database over the local docker network on port 8086

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/cf8f5b62b362bdb4f14e240095b15c882901d2be/covers/grafana-datasource.png" width="280px">
</p>

- grafana-dashboard.yaml: configures Grafana to load a K6 dashboard from the /var/lib/grafana/dashboards directory

<p align="center">
    <img src="https://github.com/trongtuyen96/k6-performance-test/blob/cf8f5b62b362bdb4f14e240095b15c882901d2be/covers/grafana-dashboard.png" width="350px">
</p>

- dashboard/k6-load-testing-results_rev3.json: a JSON configuration of a K6/InfluxDB dashboard with few modifications
	
### How to run

- Running a load test requires that the InfluxDB and Grafana services are already running in the background:

```bash
	docker-compose up -d influxdb grafana
```

- Run docker-compose to perform a K6 run on a test script:

```bash
	docker-compose run k6 run /tests/threshold.js
```

- And result will be displayed at: http://localhost:3000/d/k6/k6-load-testing-results

I also write shell script for faster usage:
- [run-threshold-test.sh](https://github.com/trongtuyen96/k6-performance-test/blob/main/run-threshold-test.sh): To execute on Linux machines
- [run-threshold-test-wins.sh](https://github.com/trongtuyen96/k6-performance-test/blob/main/run-threshold-test-wins.sh): To run on Windows machines

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
