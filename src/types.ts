export type EnvType = "DEV" | "QA" | "UAT" | "TEST" | "PROD";
export type StageType = "LOAD" | "STRESS" | "SPIKE" | "SOAK";

export interface IEnvConfig {
  username: string;
  password: string;
  selectedStage: StageType;
  env: EnvType;
  urlSuffix: string;
}
