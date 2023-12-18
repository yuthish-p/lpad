const NodeWalletConnect = require("@walletconnect/node");
const WalletConnectQRCodeModal = require("@walletconnect/qrcode-modal");


const Core  = require( '@walletconnect/core')
const  Web3Wallet  = require('@walletconnect/web3wallet')


const core = new Core({
  projectId: "2f57decca6c2845fb4f4bcf8cbcf6d97"
})

const web3wallet =  Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: 'Demo app',
    description: 'Demo Client as Wallet/Peer',
    url: 'www.walletconnect.com',
    icons: []
  }
})
