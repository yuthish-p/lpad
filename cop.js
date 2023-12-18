const TelegramBot = require('node-telegram-bot-api');


console.log("test");
// Create a bot that uses 'polling' to fetch new updates
const TELEGRAM_TOKEN  = "6788092650:AAHxp8q-6BMcp5sin7OiR7leNqDwiPhdZFM";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });


// Matches "/start"
bot.onText(/\/start/, (msg) => {
  // Send a message with options
  bot.sendMessage(msg.chat.id, `Hello ${msg.chat.first_name}! Welcom to lpad `, {
    reply_markup: {
      // Define a custom keyboard with reply options
      keyboard: [
        ['Menu']
      ],
    },
  });
});


// When a user clicks a button, this callback will be executed
bot.on('callback_query', (callbackQuery) => {
    console.log("button test ")
  // Get the button's text
  const buttonText = callbackQuery.data;
  console.log(buttonText)


  bot.sendMessage(callbackQuery.chat.id,"other optins" , {
    reply_markup: {
      // Define a custom keyboard with reply options
      keyboard: [
        ['wallet connect','User profile'],
        ['User contribution','claim']
      ],
    },
  });




  
  // Send a message based on the button's text
  /*switch (buttonText) {
    case 'Option 1':
      bot.sendMessage(callbackQuery.message.chat.id, 'You chose Option 1!');
      break;
    case 'Option 2':
      bot.sendMessage(callbackQuery.message.chat.id, 'You chose Option 2!');
      break;
    case 'Option 3':
      bot.sendMessage(callbackQuery.message.chat.id, 'You chose Option 3!');
      break;
    case 'Option 4':
      bot.sendMessage(callbackQuery.message.chat.id, 'You chose Option 4!');
      break;
  }*/
  
  // Answer the callback query, this is required to remove the "Loading" state from Telegram
  bot.answerCallbackQuery(callbackQuery.id);
});

