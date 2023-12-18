
const NodeWalletConnect = require("@walletconnect/node");
const WalletConnectQRCodeModal = require( "@walletconnect/qrcode-modal");

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const WalletConnect = require('@walletconnect/client').default;
const qrcode = require('qrcode-terminal');

//const ethers = require('ethers');
const path = require('path');

const token = "6788092650:AAHxp8q-6BMcp5sin7OiR7leNqDwiPhdZFM";
const bot = new TelegramBot(token, { polling: true });
const app = express();

var balanceStatus = "";
const nesttxt =''
const walletbalance = ''


const connectwithwallet = ()=>{

    // 1. Get projectId at https://cloud.walletconnect.com
const projectId = '2f57decca6c2845fb4f4bcf8cbcf6d97'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
                name: 'My Website',
                description: 'My Website description',
                url: 'https://t.me/lpad_bot',
                icons: ['https://t.me/lpad_bot']
            }

const modal = WalletConnect.screateWeb3Modal({
                ethersConfig:  metadata ,
                chains: [mainnet],
                projectId
            })
modal.open({ view: 'Connect' })

const { open, selectedNetworkId } = modal.getState()

console.log("open==>",open)
    

}


const checkStake =  (cID,txt) => {

    const chatId = cID
    const userAmt = txt

    console.log("userAmt",userAmt)

    //add valid
    let outmessage =  ''
    balanceStatus

    
    if(balanceStatus == "3" && userAmt >=20 && userAmt <= 100 ){

        outmessage = "contribution successfuly!"

    }else if(balanceStatus == "2" && userAmt >=20 && userAmt <= 300 ){
        outmessage = "contribution successfuly!"

    }else if(balanceStatus == "1" && userAmt >=20 && userAmt <= 800 ){
        outmessage = "contribution successfuly!"

    }else {
        outmessage = "plz stake min 500 doller worth of coins!.."

    }


   // bot.sendMessage(chatId, outmessage);

   return outmessage
}

const connectWal = ()=>{
  // Create WalletConnector
    const connector = new NodeWalletConnect(
      {
        bridge: "https://bridge.walletconnect.org", // Required
      },
      {
        clientMeta: {
          description: "WalletConnect NodeJS Client",
          url: "https://nodejs.org/en/",
          icons: ["https://nodejs.org/static/images/logo.svg"],
          name: "WalletConnect",
        },
      },
    );

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession().then(() => {
        // get uri for QR Code modal
        const uri = connector.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
          console.log("QR Code Modal closed");
        });
      });
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Close QR Code Modal
      WalletConnectQRCodeModal.close();

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });
}


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  walletbalance


  bot.sendMessage(chatId, 'Welcome! Click the button to continue.', {
    reply_markup: {
      keyboard: [
        [{ text: 'Menu' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.onText(/Menu/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Choose one of the menu below:', {
    reply_markup: {
      keyboard: [
        ['wallet connect', 'User profile'],
        ['User contribution', 'claim'],
        ['staking']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  //const provider = new ethers.providers.JsonRpcProvider();
  //const signer = provider.getSigner()

  switch (text) {
    case 'wallet connect':
      // Send the HTML file as a document
      console.log(path.join(__dirname, 'wallet.html'))
      bot.sendMessage(chatId,"connecting")
      //connectWal()
      //connectwithwallet()
      bot.sendDocument(chatId, path.join(__dirname, 'wallet.html'));


      //const wc = new WalletConnect({
      //  bridge: 'https://bridge.walletconnect.org' // Use the WalletConnect bridge URL
      //});
      //// Generate a QR code for the user to scan
      //const uri = wc.uri;
      //qrcode.generate(uri, { small: true });
      //bot.sendMessage(chatId, 'Scan the QR code to connect with WalletConnect:');
      //bot.sendPhoto(chatId, `data:image/png;base64,${qrcode.toDataURL(uri)}`);
  




      break;
    case 'User profile':

        const teleName =  msg.from.username
        const walletAddress = "0xa4Fa29cB98003131c875e26B3620C91Ea956e751"
        
        bot.sendMessage(chatId,"Profile added successfuly!....😀")
        


      
      break;
    case 'User contribution':

        const contributionAmount = 500



        if(walletbalance >= contributionAmount ){

            bot.sendMessage(chatId, "staking successfuly!.....");
        }else{

            bot.sendMessage(chatId, "Insuffcient balance");

        }

      
      break;
    case 'claim':
      
        bot.sendMessage(chatId,"claim successfuly!....")


      break;
    case 'staking':

        const message=`lpad Power determines your chance of participating in an IDO and NFT sale. Think of it as an accelerator, it calculates a user's eligible lpad balance across the platform, both lpad held in their wallet and lpad they are staking.
        To gain access to an IDO, users need to get their wallet addresses on the "allowlist". It's a lottery system that rewards users 1 ticket for every 250 lpad. During an IDO, addresses are chosen at random. More tickets will increase a user's chances of being selected for the allowlist. In addition, the more lpad they either hold or stake, the higher the value of their tickets.
        There are 5 tiers of lpad Power, which can increase the value of each ticket by up to 25%. `;

       
        //const get_balance =  await provider.getBalance("0xa4Fa29cB98003131c875e26B3620C91Ea956e751")
        const get_balance =  "600"

        //console.log(get_balance)


        let tempmes =""
        let min = 0
        let max = 0
        if(get_balance >= 500)
        {
            balanceStatus = "3"

            tempmes = "you eligble for tier 3  \n Enter the amount :"

        }else if(get_balance >= 1000){
            balanceStatus = "2"
            tempmes = "you eligble for tier 2  \n Enter the amount :"

        }else if(get_balance >= 3000){
            balanceStatus = "1"
            tempmes = "you eligble for tier 1  \n Enter the amount :"
        }else{
            tempmes = "Plz stake attleast 500 doller worth of coins!...."

        }


    
        bot.sendMessage(chatId, message);

        setTimeout(function () {

            bot.sendMessage(chatId, tempmes);

        }, 1000);

        bot.once('text', (contributionMsg) => {


            console.log("once")
            const stakingTXT = contributionMsg.text;
            const stakingChatID = contributionMsg.chat.id;
            
            
            const stkingStaus =  checkStake(stakingChatID,stakingTXT)

            bot.sendMessage(chatId, stkingStaus);
            

        })


        

        break;

  }
});


// Serve the HTML file from the same Node.js server
app.use(express.static(__dirname));
app.listen(3000, () => {
  console.log('Server is listening at http://localhost:3000');
});
