# Cypress tests for Battery Status API with code coverage step

This work forks en existing Cypress coverage project that uses CI to demonstrate how absolute file paths in code coverage data need to be verified for reports to be generated. File paths in `.nyc_output/out.json` have been replaced with file paths to simulate downloading code doverage files from CI.

> Forked from [https://github.com/bahmutov/demo-battery-api/)

Branch [coverage-step](https://github.com/wemangum/demo-battery-api/tree/coverage-step)

## Use

```
git clone git@github.com:bahmutov/demo-battery-api.git
cd demo-battery-api
git checkout coverage-step
npm install
npm run report:coverage
```

Observe that `coverage/index.html` is empty.
