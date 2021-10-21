import { check } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // ramping up to 300 users, look like peak test
    { duration: '3h30m', target: 100 }, // endurance test
    { duration: '2m', target: 0 }, // ramping down
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