import { extendEnvironment } from "hardhat/config";
import { createProvider } from "hardhat/internal/core/providers/construction";
  import { EthereumProvider } from "hardhat/types/provider";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";


extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  // We use lazyObject to avoid initializing things until they are actually
  // needed.
  const providers: { [name: string]: EthereumProvider } = {};

  hre.getProvider = function getProvider(name: string): EthereumProvider {
    if (!providers[name]) {
      providers[name] = createProvider(
        name,
        this.config.networks[name],
        this.config.paths,
        this.artifacts,
      );
    }
    return providers[name];
  }

  hre.changeNetwork = function changeNetwork(newNetwork: string) {
    if (!this.config.networks[newNetwork]) {
      throw new Error(`changeNetwork: Couldn't find network '${newNetwork}'`);
    }

    if (!providers[this.network.name]) {
      providers[this.network.name] = this.network.provider;
    }

    this.network.name = newNetwork;
    this.network.config = this.config.networks[newNetwork];
    this.network.provider = this.getProvider(newNetwork);

    if ((this as any).ethers) {
      const { EthersProviderWrapper } = require("@nomiclabs/hardhat-ethers/internal/ethers-provider-wrapper");
      (this as any).ethers.provider = new EthersProviderWrapper(this.network.provider);
    }
  };
});
