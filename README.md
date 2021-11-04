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
- [Set Up](#set-up)
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
    k6 run --out json=./full.json --summary-export=./summary.json script.js
```

- For more info: [Running k6](https://k6.io/docs/getting-started/running-k6/)

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
