import { group } from 'k6';
import { setSleep } from '../../src/utils/sleep.utils.js';
import * as animalActions from '../../src/actions/animal-management.actions.js';
import { Counter } from 'k6/metrics';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

/**
 * A soak test that runs through some common user actions 
 * for the ATWT App:
 * https://atwt-api.herokuapp.com/
 * 
 * P.s. the k6 Types can be found here for reference: 
 * https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/k6
 */

// Test Options https://docs.k6.io/docs/options
export let options = {
    // a single stage where we ramp up to 10 users over 30 seconds 
    stages: [
        { target: 5, duration: '10s' },
    ],
    // test thresholds https://docs.k6.io/docs/thresholds
    thresholds: {
        'http_req_duration': ['avg<500', 'p(95)<1500'],
        'http_req_duration{my_tag:Get}': ['avg<600', 'p(90)<700'],
        'http_req_duration{my_tag:Create}': ['avg<600', 'p(90)<700'],
        'http_req_duration{my_tag:Delete}': ['avg<600', 'p(90)<700'],
    },
};

let numberOfAnimalCreated = new Counter("NumberOfAnimalsCreated");
let numberOfAnimalDeleted = new Counter("NumberOfAnimalsDeleted");

// Have these as gauges
// Create a map that has 'vu' and 'count'
// Then update the gauge with the count and then tag it with the vu both from the map

let countAnimals = new Map();
let countDeleted = new Map();


const BASE_URL = 'https://atwt-api.herokuapp.com/v1/animal';

// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {

}

// default function https://docs.k6.io/docs/test-life-cycle
export default () => {

    // this is a group https://docs.k6.io/docs/tags-and-groups
    group('Get Animals', () => {
        let animals = [];
        animals = animalActions.getAnimal(BASE_URL, animals);
    })

    let animalId = '';
    group('Create Animals', () => {
        animalId = animalActions.createAnimal(BASE_URL, numberOfAnimalCreated);
    });

    group('Delete Animals', () => {
        animalActions.deleteAnimal(BASE_URL + '/' + animalId, numberOfAnimalDeleted);
    });

    // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
    setSleep();
}

export function handleSummary(data) {
    return {
        "./results/result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}