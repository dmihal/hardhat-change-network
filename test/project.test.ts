// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the functoin", function () {
      assert.instanceOf(
        this.hre.changeNetwork,
        Function
      );
    });
  });
});
