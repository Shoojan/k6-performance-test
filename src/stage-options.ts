import { StageType } from "./types.js";

export const DURATION = 500;
const MIN_FAIL_RATE = 10;
const MAX_REQUEST_SUCCESS_PERCENT = 90;

const commonOptions = {
  //   vus: 10, //virtual users
  thresholds: {
    http_req_failed: [`rate<${MIN_FAIL_RATE / 100}`], //http errors should be less than [MIN_FAIL_RATE]%
    http_req_duration: [`p(${MAX_REQUEST_SUCCESS_PERCENT})<${DURATION}`], //[MAX_REQUEST_SUCCESS_RATE]% of requests should be below [DURATION]ms
  },
};

/**
 * Load Testing
 * -----------------
 * Load testing evaluates the system’s performance under expected usage conditions by
 * subjecting the system to typical and peak loads.
 *
 * The goal is to ensure that the system can handle the anticipated volume of users and transactions without significant degradation in performance.
 */
export const loadTestStages = [
  { ...commonOptions, duration: "5m", target: 30 }, // Simulate ramp-up of traffic from 1 to 50 users over 5 minutes.
  { ...commonOptions, duration: "10m", target: 30 }, // Stay at 50 users for 10 minutes.
  { ...commonOptions, duration: "5m", target: 0 }, // Ramp-down to 0 users.
];

/**
 * Stress Testing
 * -----------------
 * Stress testing assesses the system’s resilience by subjecting it to extreme conditions beyond its normal operational capacity.
 *
 * This test determines the breaking point of the system, such as maximum user load or resource utilization,
 * and helps identify performance bottlenecks and potential failure points.
 */
export const stressTestStages = [
  { ...commonOptions, duration: "2m", target: 30 }, // Ramp-up to 200 users over 2 minutes.
  { ...commonOptions, duration: "3m", target: 30 }, // Stay at 200 users for 3 minutes.
  { ...commonOptions, duration: "2m", target: 50 }, // Ramp-up to 300 users over 2 minutes.
  { ...commonOptions, duration: "3m", target: 50 }, // Stay at 300 users for 3 minutes.
  { ...commonOptions, duration: "2m", target: 100 }, // Ramp-up to 400 users over 2 minutes.
  { ...commonOptions, duration: "3m", target: 100 }, // Stay at 400 users for 3 minutes.
  { ...commonOptions, duration: "2m", target: 0 }, // Ramp-down to 0 users.
];

/**
 * Spike Testing
 * -----------------
 * Spike testing evaluates how the system responds to sudden spikes or surges in user traffic.
 *
 * The test involves rapidly increasing or decreasing the load on the system to simulate real-world scenarios like flash sales,
 * marketing campaigns, or unexpected traffic spikes.
 *
 * Spike testing helps assess system scalability and responsiveness under fluctuating loads.
 */
export const spikeTestStages = [
  { ...commonOptions, duration: "5m", target: 2 }, // Ramp-up to 10 users over 5 minutes.
  { ...commonOptions, duration: "10s", target: 50 }, // Spike to 500 users over 10 seconds.
  { ...commonOptions, duration: "5m", target: 2 }, // Return to 10 users over 5 minutes.
  { ...commonOptions, duration: "10s", target: 0 }, // Ramp-down to 0 users.
];

/**
 * Endurance Testing
 * -----------------
 * Endurance testing involves subjecting the system to a sustained load over an extended period
 * to evaluate its stability and performance under continuous usage.
 *
 * The test helps identify issues such as
 * -> memory leaks,
 * -> resource exhaustion, or
 * -> degradation of performance over time,
 * ensuring the system’s reliability and robustness under prolonged operation.
 */
export const soakTestStages = [
  { ...commonOptions, duration: "30m", target: 30 }, // Ramp-up to 100 users over 30 minutes.
  { ...commonOptions, duration: "12h", target: 30 }, // Maintain 100 users for 12 hours.
  { ...commonOptions, duration: "30m", target: 0 }, // Ramp-down to 0 users.
];

export const selectedStages = (selectedStage: StageType) => {
  switch (selectedStage) {
    case "LOAD":
    default:
      return loadTestStages;

    case "STRESS":
      return stressTestStages;

    case "SPIKE":
      return spikeTestStages;

    case "SOAK":
      return soakTestStages;
  }
};
