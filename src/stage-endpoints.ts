import http from "k6/http";
import { IEnvConfig } from "./types.js";

// const claimURL = `invoice-billings?limit=20&page=1&apiCallCount=1`;
// const selfTaskURL = `tasks/self?limit=20&page=1`;
// const queueTaskURL = `tasks?limit=10&page=1&queueIds=96951d88-5458-4eda-80db-e20afd2e5ba5`;

function getHostName(urlPrefix: string) {
  return `https://${urlPrefix}api.therapy.noveltytechnology.com/api/`;
}

export function login(envConfig: IEnvConfig) {
  const urlPrefix =
    envConfig.env == "PROD" ? "" : `${envConfig.env.toLowerCase()}.`;

  const hostName = getHostName(urlPrefix);
  const url = hostName + envConfig.urlSuffix;

  console.log(`K6 Test Details:`);
  console.log(`----------------`);
  console.log(`Env\t\t: ${envConfig.env}`);
  console.log(`Stage\t: ${envConfig.selectedStage}`);
  console.log(`Username\t: ${envConfig.username}`);
  console.log(`Endpoint\t: ${url}`);
  console.log(`----------------`);

  // Initial request to get a cookie
  const loginRes = http.post(`${hostName}auth/login`, {
    identifier: envConfig.username,
    password: envConfig.password,
  });

  // Extract the cookie from the response headers
  const accessTokens = loginRes.cookies["accessToken"];
  if (!accessTokens?.length) throw new Error("Access Token not found!");

  const accessToken = loginRes.cookies["accessToken"][0].value;
  const refreshToken = loginRes.cookies["refreshToken"][0].value;

  console.log(`accessToken\t: ${accessToken}`);

  return { accessToken, refreshToken, url };
}
