interface ZanoWalletParams {
    authPath: string;
    useLocalStorage?: boolean;
    aliasRequired?: boolean;
    customLocalStorageKey?: string;
    customNonce?: string;
    customServerPath?: string;
    disableServerRequest?: boolean;
    onConnectStart?: (...params: any) => any;
    onConnectEnd?: (...params: any) => any;
    onConnectError?: (...params: any) => any;
    beforeConnect?: (...params: any) => any;
    onLocalConnectEnd?: (...params: any) => any;
}
interface WalletCredentials {
    nonce: string;
    signature: string;
    publicKey: string;
}
declare class ZanoWallet {
    private DEFAULT_LOCAL_STORAGE_KEY;
    private localStorageKey;
    private params;
    private zanoWallet;
    constructor(params: ZanoWalletParams);
    private handleError;
    getSavedWalletCredentials(): WalletCredentials | undefined;
    setWalletCredentials(credentials: WalletCredentials | undefined): void;
    connect(): Promise<void>;
}
export default ZanoWallet;
