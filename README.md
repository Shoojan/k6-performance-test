A tool that performs four different performance testing:
1. Load Testing
2. Stress Testing
3. Spike Testing
4. Soak Testing

**Points to be noted**
1. The stage options can be configured inside src/stage-options.ts
2. The hostname can be configured inside src/stage-endpoints.ts
3. The login credentials, stage selection, env and urlSuffix should be provided by creating a new file inside configs/ as ```config-env.json``` 
```json
{
   "username": "",
   "password": "",
   "selectedStage": "LOAD",
   "env": "DEV",
   "urlSuffix": "abc.com?limit=10"
}
```