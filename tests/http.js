import http from "k6/http";
import { check, sleep } from "k6";

// `options.stages to configure ramp up/down VU level
export let options = {
    stages: [
        // Ramp-up from 1 to 20 VUs in 20s
        { duration: "30s", target: 20 },
        // Ramp-down from 20 to 10 VUs in 1m
        { duration: "1m", target: 10 },
         // Ramp-down from 5 to 0 VUs for 20s
        { duration: "20s", target: 0 },
    ]
}

// this defines the entry point for your VUs
// similar to the main() function in many other language

export default function () {
    let res = http.get("http://test.loadimpact.com");

    // check() function to verify status code, transaction time etc
    check(res, {
        "status was 200": (r) => r.status == 200,
        "transaction time OK": (r) => r.timings.duration < 200
    });
    sleep(1);
}