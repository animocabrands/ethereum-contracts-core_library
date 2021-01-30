const {subtask} = require('hardhat/config');
const {TASK_TEST_RUN_MOCHA_TESTS} = require('hardhat/builtin-tasks/task-names');

subtask(TASK_TEST_RUN_MOCHA_TESTS, async function (args, hre, runSuper) {
  if (process.env.REPORT_GAS) {
    hre.config.mocha.grep = '@skip-on-coverage'; // Find everything with this tag
    hre.config.mocha.invert = true; // Run the grep's inverse set
  }
  return runSuper(args);
});
