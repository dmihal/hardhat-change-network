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

```javascript
hre.changeNetwork('goerli');
```
