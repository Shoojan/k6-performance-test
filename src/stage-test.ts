import http from "k6/http";
import { sleep, check } from "k6";
import { login } from "./stage-endpoints.js";
import { selectedStages, DURATION } from "./stage-options.js";
import { IEnvConfig } from "./types.js";

// load test config, used to populate exported options object:
const envConfig: IEnvConfig = JSON.parse(open("../configs/config-env.json"));

export let options = {
  stages: selectedStages(envConfig.selectedStage),
};

// The setup function runs once and can return data for use in the default function
export function setup() {
  // Return the access token to be used in the test
  return login(envConfig);
}

export default function (data: { accessToken: string; url: string }) {
  const cookie = `accessToken=${data.accessToken}`;

  const headers = {
    "Content-Type": "application/json",
    Cookie: cookie,
  };

  const res = http.get(data.url, { headers });

  const durationKey = `duration is <= ${DURATION}ms`;

  check(res, {
    "status is 200": (r) => r.status === 200,
    [durationKey]: (r) => r.timings.duration <= DURATION,
  });

  sleep(1);
}
