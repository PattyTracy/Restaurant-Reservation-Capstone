module.exports = {
  preset: "jest-puppeteer",
  testTimeout: 8000,
  verbose: true,
  reporters: [
    "default",
    "jest-standard-reporter",
    [
      "jest-html-reporter",
      {
        pageTitle: "Frontend test suite",
        outputPath: "test-report/index.html",
        includeFailureMsg: true,
      },
    ],
  ],
};