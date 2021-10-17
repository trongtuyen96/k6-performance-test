import { check } from "k6";
import http from 'k6/http';

export let options = { maxRedirects: 1, iterations: "100", vus: 10 };

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