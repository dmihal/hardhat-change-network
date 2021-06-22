import { extendEnvironment } from "hardhat/config";
import { createProvider } from "hardhat/internal/core/providers/construction";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";


extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  // We use lazyObject to avoid initializing things until they are actually
  // needed.
  hre.changeNetwork = function changeNetwork(newNetwork: string) {
    if (!this.config.networks[newNetwork]) {
      throw new Error(`changeNetwork: Couldn't find network '${newNetwork}'`);
    }

    this.network.name = newNetwork;
    this.network.config = this.config.networks[newNetwork];
    this.network.provider = createProvider(
      newNetwork,
      this.config.networks[newNetwork],
      this.config.paths,
      this.artifacts,
    );

    if ((this as any).ethers) {
      const { EthersProviderWrapper } = require("hardhat-ethers/internal/ethers-provider-wrapper");
      (this as any).ethers.provider = new EthersProviderWrapper(this.network.provider);
    }
  };
});
