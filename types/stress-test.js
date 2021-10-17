import { check } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '2m', target: 5 }, // below normal load
    { duration: '5m', target: 10 },
    { duration: '2m', target: 50 }, // normal load
    { duration: '5m', target: 70 },
    { duration: '2m', target: 150 }, // around the breaking point
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function() {

  var params = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
    }
  };

  var url = "http://test.k6.io";

  let res = http.get(url, params);

  check(res, {
    "is status 200": r => r.status === 200,
 });

}