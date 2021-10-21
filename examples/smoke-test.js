import { check } from "k6";
import http from 'k6/http';

export let options = { 
  maxRedirects: 1, 
  duration: "1m", 
  vus: 1,
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

export default function() {
  var url = 'http://test.loadimpact.com/login.php';
  var formdata = {
    login: 'admin',
    password: '123',
  };

  var params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'    
    },
  };

  let res = http.post(url, formdata, params);
  let jar = http.cookieJar();
  let cookies = jar.cookiesForURL(url);

  check(res, {
    "is status 200": r => r.status === 200,
    "has cookie 'sid'": (r) => cookies.sid.length > 0,
    "has cookie 'uid'": (r) => cookies.uid.length > 0,
    "cookie 'sid' has correct value": (r) => cookies.sid == "39b77ac6-39c4-4c43-98b3-6b2816682036",
    "cookie 'uid' has correct value": (r) => cookies.uid == "3221"
 });
  
}