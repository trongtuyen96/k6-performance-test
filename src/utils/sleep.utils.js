import { sleep } from "k6";

function setSleep(min = 1, max = 2) {
    sleep(Math.floor(Math.random() * (max - min) + min));
}

module.exports = { setSleep }