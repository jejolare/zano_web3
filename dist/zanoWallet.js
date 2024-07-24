"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var ZanoWallet = /** @class */ (function () {
    function ZanoWallet(params) {
        this.DEFAULT_LOCAL_STORAGE_KEY = "wallet";
        if (typeof window === 'undefined') {
            throw new Error('ZanoWallet can only be used in the browser');
        }
        if (!window.zano) {
            throw new Error('ZanoWallet requires the ZanoWallet extension to be installed');
        }
        this.params = params;
        this.zanoWallet = window.zano;
        this.localStorageKey = params.customLocalStorageKey || this.DEFAULT_LOCAL_STORAGE_KEY;
    }
    ZanoWallet.prototype.handleError = function (_a) {
        var message = _a.message;
        if (this.params.onConnectError) {
            this.params.onConnectError(message);
        }
        else {
            console.error(message);
        }
    };
    ZanoWallet.prototype.getSavedWalletCredentials = function () {
        var savedWallet = localStorage.getItem(this.localStorageKey);
        if (!savedWallet)
            return undefined;
        try {
            return JSON.parse(savedWallet);
        }
        catch (_a) {
            return undefined;
        }
    };
    ZanoWallet.prototype.setWalletCredentials = function (credentials) {
        if (credentials) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(credentials));
        }
        else {
            localStorage.removeItem(this.localStorageKey);
        }
    };
    ZanoWallet.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletData, nonce, signature, publicKey, existingWallet, generatedNonce, signResult, serverData, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.params.beforeConnect) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.params.beforeConnect()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (this.params.onConnectStart) {
                            this.params.onConnectStart();
                        }
                        return [4 /*yield*/, window.zano.request('GET_WALLET_DATA')];
                    case 3:
                        walletData = (_b.sent()).data;
                        if (!(walletData === null || walletData === void 0 ? void 0 : walletData.address)) {
                            return [2 /*return*/, this.handleError({ message: 'Companion is offline' })];
                        }
                        if (!(walletData === null || walletData === void 0 ? void 0 : walletData.alias) && this.params.aliasRequired) {
                            return [2 /*return*/, this.handleError({ message: 'Alias not found' })];
                        }
                        nonce = "";
                        signature = "";
                        publicKey = "";
                        existingWallet = this.params.useLocalStorage ? this.getSavedWalletCredentials() : undefined;
                        if (!existingWallet) return [3 /*break*/, 4];
                        nonce = existingWallet.nonce;
                        signature = existingWallet.signature;
                        publicKey = existingWallet.publicKey;
                        return [3 /*break*/, 6];
                    case 4:
                        generatedNonce = this.params.customNonce || (0, uuid_1.v4)();
                        return [4 /*yield*/, this.zanoWallet.request('REQUEST_MESSAGE_SIGN', {
                                message: generatedNonce
                            }, null)];
                    case 5:
                        signResult = _b.sent();
                        if (!((_a = signResult === null || signResult === void 0 ? void 0 : signResult.data) === null || _a === void 0 ? void 0 : _a.result)) {
                            return [2 /*return*/, this.handleError({ message: 'Failed to sign message' })];
                        }
                        nonce = generatedNonce;
                        signature = signResult.data.result.sig;
                        publicKey = signResult.data.result.pkey;
                        _b.label = 6;
                    case 6:
                        serverData = {
                            alias: walletData.alias,
                            address: walletData.address,
                            signature: signature,
                            publicKey: publicKey,
                            message: nonce,
                            isSavedData: !!existingWallet
                        };
                        if (this.params.onLocalConnectEnd) {
                            this.params.onLocalConnectEnd(serverData);
                        }
                        if (!!this.params.disableServerRequest) return [3 /*break*/, 8];
                        return [4 /*yield*/, fetch(this.params.customServerPath || "/api/auth", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    data: serverData
                                })
                            })
                                .then(function (res) { return res.json(); })
                                .catch(function (e) { return ({
                                success: false,
                                error: e.message
                            }); })];
                    case 7:
                        result = _b.sent();
                        if (!(result === null || result === void 0 ? void 0 : result.success) || !(result === null || result === void 0 ? void 0 : result.data)) {
                            return [2 /*return*/, this.handleError({ message: result.error })];
                        }
                        if (!existingWallet && this.params.useLocalStorage) {
                            this.setWalletCredentials({
                                publicKey: publicKey,
                                signature: signature,
                                nonce: nonce
                            });
                        }
                        if (this.params.onConnectEnd) {
                            this.params.onConnectEnd(__assign(__assign({}, serverData), { token: result.data.token }));
                        }
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return ZanoWallet;
}());
exports.default = ZanoWallet;
