# hardhat-change-network

Allows changing the current network in Hardhat.

Useful for multi-chain projects, where switching between two networks in a script may be desirable.

_Warning: This is a bit of a hack, some modules may break._

## Installation

```bash
yarn add hardhat-change-network
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-change-network");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-change-network";
```

## Usage

Change the network to any network defined in hardhat.config.js with this simple call:

```javascript
hre.changeNetwork('goerli');
```

You can also use this library to retrieve a standard web3 provider object for a given network:

```javascript
const provider = hre.getProvider('goerli');
```
