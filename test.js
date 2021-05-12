function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

var common = require("./test/common");

describe("top", function () {
  beforeEach(function () {
     console.log("running something before each test");
  });
  importTest("lines", './test/lines');
  after(function () {
      console.log("after all tests");
  });
});