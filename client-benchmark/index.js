import { request } from "graphql-request";
import fetch from "node-fetch";
import sizeof from "object-sizeof";

const ITERATIONS = 1000;

const restTimes = [];
const graphqlTimes = [];
const restSize = [];
const graphqlSize = [];

async function main() {
  for (let i = 0; i < 1; i++) {
    await rest();
    await graphql();
  }

  console.log(`GRAPHQL: Average response size: ${average(graphqlSize)} Bytes`);
  console.log(
    "GRAPHQL: Average execution time (hr): %ds\n",
    average(graphqlTimes)
  );

  console.log(`REST: Average response size: ${average(restSize)} Bytes`);
  console.log("REST: Average execution time (hr): %ds\n", average(restTimes));
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

function graphql() {
  let responseSize = 0;
  return new Promise(async (resolve) => {
    const queryPromises = [];
    var start = process.hrtime();
    for (let index = 0; index < ITERATIONS; index++) {
      queryPromises.push(
        request(
          "http://localhost:9001/graphql",
          `
      {
        server(id: 1) {
          name
          ipAddress
          firewall {
            name
            rules {
              ruleType
              cidr
              port
            }
          }
        }
      }
      `
        )
      );
    }
    const responses = await Promise.all(queryPromises);
    var stop = process.hrtime(start);
    responses.forEach((data) => (responseSize += sizeof(data)));
    graphqlTimes.push(stop[0] + stop[1] / 1000000000);
    graphqlSize.push(responseSize);
    resolve();
  });
}

function rest() {
  let responseSize = 0;
  return new Promise(async (resolve) => {
    const queryPromises1 = [];
    const queryPromises2 = [];
    var start = process.hrtime();
    for (let index = 0; index < ITERATIONS; index++) {
      queryPromises1.push(fetchRetry("http://localhost:9000/servers/1", {}, 3));
      queryPromises2.push(fetchRetry("http://localhost:9000/firewalls/1", {}, 3));
      queryPromises2.push(
        fetchRetry("http://localhost:9000/firewalls/1/rules", {}, 3)
      );
    }
    const responses1 = await Promise.all(queryPromises1);
    const responses2 = await Promise.all(queryPromises2);
    var stop = process.hrtime(start);
    const formatPromises = [];
    responses1.forEach((response) => formatPromises.push(response.json()));
    responses2.forEach((response) => formatPromises.push(response.json()));
    const datas = await Promise.all(formatPromises);
    datas.forEach((data) => (responseSize += sizeof(data)));
    restTimes.push(stop[0] + stop[1] / 1000000000);
    restSize.push(responseSize);
    resolve();
  });
}

const fetchRetry = (url, options = {}, retries) =>
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1);
      }
      throw new Error(res.status);
    })
    .catch((error) => console.error(error.message));

main();
