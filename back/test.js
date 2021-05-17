function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

describe("top", function () {
  beforeEach(function () {
     console.log("Starting tests");
  });
  importTest("lines", './test/lines');
  importTest("stops", './test/stops');
  importTest("arrivals", './test/arrivals');
  after(function () {
      console.log("All tests finished");
  });
});