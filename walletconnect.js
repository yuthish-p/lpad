const WalletConnect  = require( "walletconnect");

const client_1 = require("@walletconnect/client")

const qrcode_modal_1 = require("@walletconnect/qrcode-modal")

const utils_1 = require("@walletconnect/utils");



const opions = Object.assign({ bridge: "https://bridge.walletconnect.org", qrcodeModal: qrcode_modal_1.default }, this.options);


//  Create WalletConnect SDK instance
const wc = new WalletConnect();

//  Connect session (triggers QR Code modal)
const connector =  wc.connect();
