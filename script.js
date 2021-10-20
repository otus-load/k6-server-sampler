import http from 'k6/http';
import { group } from 'k6';

// Base config
const host = `${__ENV.HOST}` ||'localhost';
const protocol = 'https://';
const port = `${__ENV.PORT}` || 8080;

export let options = {
  discardResponseBodies: true,
  scenarios: {
    freefly: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      exec: "free",
      stages: [
        { target: 5, duration: '3s' },
        { target: 5, duration: '10s' },
        { target: 0, duration: '2s' },
      ],
    },
  hardfly: {
    executor: 'ramping-arrival-rate',
    startRate: 50,
    timeUnit: '1s',
    preAllocatedVUs: 50,
    maxVUs: 100,
    exec: "hard",
    stages: [
      { target: 5, duration: '3s' },
      { target: 10, duration: '10s' },
      { target: 0, duration: '2s' },
    ],
  },
 },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

// Groups
export function free(){
 group('GET_/', function(){
    let get_root = http.get(protocol.concat(host, ":", port));
 });

 group('GET_/secret', function(){
   let get_secret = http.get(protocol.concat(host, ":", port, '/secret'));
 })

 group('POST_/', function(){
   let post_root = http.post(protocol.concat(host, ":", port));
 })
};

export function hard(){
 group('GET_/random', function(){
   let get_random = http.get(protocol.concat(host, ":", port, '/random-number'));
 })
};