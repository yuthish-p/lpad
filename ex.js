const TelegramBot = require('node-telegram-bot-api');

const token = "6788092650:AAHxp8q-6BMcp5sin7OiR7leNqDwiPhdZFM";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send a message with the initial button
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

  // Send a message with additional buttons
  bot.sendMessage(chatId, 'Choose one of the menu below:', {
    reply_markup: {
      keyboard: [
        ['wallet connect','User profile'],
        ['User contribution','claim']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Handle responses based on the selected option
  switch (text) {
    case 'wallet connect':
      bot.sendMessage(chatId, 'You chose Option 1!');
      break;
    case 'User profile':
      bot.sendMessage(chatId, 'You chose Option 2!');
      break;
    case 'User contribution':
      bot.sendMessage(chatId, 'You chose Option 3!');
      break;
    case 'claim':
      bot.sendMessage(chatId, 'You chose Option 4!');
      break;
    default:
      bot.sendMessage(chatId, 'Invalid option. Please choose one of the provided options.');
  }
});
