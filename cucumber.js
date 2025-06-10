module.exports = {
  default: {
    require: [

      './tests/cucumber/step-definitions/world.js',
      './core/configuration/hooks/cucumberHooks.js',
      './tests/cucumber/step-definitions/**/*.js'
    ],
    paths: ['./tests/cucumber/**/*.feature'],
    //failFast: false,
    //parallel: 2, 
    // It doesn't work by default if I run it using the custom runner as it doesn't pass proccess.env data to each worker. 
    // Cucumber CLI does, so it works fine when running via default cucumber runner
    //   tags: '@tag1 or @tag2'
  }
};

