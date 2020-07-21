const config = require('./config');
const takeShot = require('./takeShot');
const messages = require('./messages');
// const utils = require('./utils');
const Telegraf = require('telegraf');

// const userActions = require('./database/userActions');

const webhookURL = config.domain + config.routingAddress;

const bot = new Telegraf(config.apiToken, {
  // If I delete the webhookReply: false then the first ctx reply in on('text') method would return something else than telegram message
  // For more information see:  https://github.com/telegraf/telegraf/issues/784
  telegram: {
    webhookReply: false,
  },
});
// Set the bot response
bot.start(async (ctx) => {
  // let user = ctx.chat;
  ctx.reply(messages.start);

  // Creating User or updating the updatedAt property
  // await userActions.createUser(user);
});

bot.on('text', async (ctx) => {
  // let userMessage = ctx.message.text;
  let lastMessage = null;

  // let user = ctx.chat;

  try {
    // await userActions.insertNewMessage(user, userMessage);

    // See comment on telegraf consturctor
    lastMessage = await ctx.reply('process is starting ...');

    // let tweetInfo = await utils.getTweetInfo(trackLink);

    // Let's take screenshot
    const imageName = '1.jpg';
    takeShot.take(imageName);

    const imageURL = `${config.domain}/download/${imageName}`;

    lastMessage = await ctx.telegram.editMessageText(
      lastMessage.chat.id,
      lastMessage.message_id,
      undefined,
      'Enjoy! here is your image:'
    );

    // Send image to user
    await ctx.replyWithPhoto(imageURL);

    // update downloaded track count
    // await userActions.updateDownloadedTrack(user);
  } catch (e) {
    ctx.reply('an Error occured. Please contact @TheMasix');
    console.log(e.message);
    ctx.telegram.sendMessage(config.adminChatID, JSON.stringify(e.message));
  }
});

// Set telegram webhook
bot.telegram.setWebhook(webhookURL);
console.log(`webhook has set to ${webhookURL}`);

module.exports = bot;
