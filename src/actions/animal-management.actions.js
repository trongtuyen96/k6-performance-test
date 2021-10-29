import { group, check, fail } from "k6";
import http from "k6/http";

import { randomAnimal } from "../utils/data-generate.utils.js";
import { setSleep } from "../utils/sleep.utils.js";

function getAnimal(url, animals) {
    group('Get Animal', () => {
        let res = http.get(url, {
            tags: {
                my_tag: "Get",
            }
        });

        check(res, { 'Animal return successfully': (r) => r.status === 200 }, { my_tag: "Get" });

        animals = JSON.parse(res.body)
    });

    setSleep(0.5, 1);

    return animals;
}

function createAnimal(url, count) {
    let createdAnimalID = '';
    group('Create Animal', () => {
        let newAnimal = randomAnimal();
        let res = http.post(url, newAnimal, {
            tags: {
                my_tag: "Create",
            }
        });
        let createdAnimal = JSON.parse(res.body);

        if (check(res, { 'Animal create successfully': (r) => r.status === 200 }, { my_tag: "Create" })) {
            createdAnimalID = createdAnimal._id;
            count.add(1);
        } else {
            fail(`Unable to create animal ${res.status} ${res.body}`);
        }

        setSleep(0.5, 1);
    })
    return createdAnimalID;
}

function deleteAnimal(url, count) {
    group('Delete Animal', () => {
        let res = http.del(url, {
            tags: {
                my_tag: "Delete",
            }
        });
        if (check(res, { 'Animal was deleted successfully': () => res.status === 200 }, { my_tag: "Delete" })) {
            count.add(1);
        } else {
            console.log('Animal was not deleted properly');
        }

    })

    setSleep(0.5, 1);
}

module.exports = {getAnimal, createAnimal, deleteAnimal}