
# ZanoWallet

`zano_web3` is a TypeScript library for interacting with the ZanoWallet extension in the browser. It allows you to connect to a user's ZanoWallet, handle authentication, and manage wallet credentials.

## Features

- **Easy Integration**: Simplifies the process of connecting to the ZanoWallet extension.
- **Local Storage Support**: Optionally store wallet credentials in local storage.
- **Customizable**: Offers hooks for various connection lifecycle events.
- **Error Handling**: Provides a structured way to handle errors during the connection process.

## Installation

To install `zano_web3`, use npm or yarn:

```bash
npm install zano_web3
```

or

```bash
yarn add zano_web3
```

## Usage

### Importing the Library

```typescript
import ZanoWallet from 'zano_web3';
```

### Creating a ZanoWallet Instance

To create a `ZanoWallet` instance, you need to provide configuration options via the `ZanoWalletParams` interface.

```typescript
const zanoWallet = new ZanoWallet({
    authPath: '/api/auth', // Custom server path for authentication
    useLocalStorage: true, // Store wallet credentials in local storage (default: true)
    aliasRequired: false,  // Whether an alias is required (optional)
    customLocalStorageKey: 'myWalletKey', // Custom key for local storage (optional)
    customNonce: 'customNonceValue', // Custom nonce for signing (optional)
    disableServerRequest: false, // Disable server request after signing (optional)

    onConnectStart: () => {
        console.log('Connecting to ZanoWallet...');
    },
    onConnectEnd: (data) => {
        console.log('Connected:', data);
    },
    onConnectError: (error) => {
        console.error('Connection error:', error);
    },
    beforeConnect: async () => {
        console.log('Preparing to connect...');
    },
    onLocalConnectEnd: (data) => {
        console.log('Local connection established:', data);
    }
});
```

### Connecting to ZanoWallet

To initiate the connection process, call the `connect` method:

```typescript
await zanoWallet.connect();
```

### Handling Wallet Credentials

You can manually manage wallet credentials using `getSavedWalletCredentials` and `setWalletCredentials` methods:

```typescript
const credentials = zanoWallet.getSavedWalletCredentials();
if (credentials) {
    console.log('Stored credentials:', credentials);
}

zanoWallet.setWalletCredentials({
    nonce: 'newNonce',
    signature: 'newSignature',
    publicKey: 'newPublicKey'
});
```

## Requirements

- ZanoWallet browser extension must be installed.

## Contributing

If you find any issues or want to contribute, please create a pull request or submit an issue.
