const config = require('./config');
const takeShot = require('./takeShot');
const messages = require('./messages');
// const utils = require('./utils');
const Telegraf = require('telegraf');

const bot = new Telegraf(config.apiToken, {
  // If I delete the webhookReply: false then the first ctx reply in on('text') method would return something else than telegram message
  // For more information see:  https://github.com/telegraf/telegraf/issues/784
  telegram: {
    webhookReply: false,
  },
});

// Set telegram webhook
const webhookURL = config.domain + config.routingAddress;
bot.telegram.setWebhook(webhookURL);
console.log(`webhook has set to ${webhookURL}`);

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

  try {
    // await userActions.insertNewMessage(user, userMessage);

    // See comment on telegraf consturctor
    lastMessage = await ctx.reply('process is starting ...');

    // let tweetInfo = await utils.getTweetInfo(trackLink);

    // Let's take screenshot
    const imageName = `tweet${Math.ceil(Math.random() * 10000)}.jpg`;
    await takeShot.take(imageName);

    // Send image to user
    // config.domain has a / at its end
    const imageURL = `${config.domain}download/${imageName}`;
    console.log(`'${imageURL}'`);
    await ctx.replyWithPhoto(imageURL);

    lastMessage = await ctx.reply('screenshot taked');
  } catch (e) {
    ctx.reply(messages.onError);
    console.log(e.message);
    ctx.telegram.sendMessage(
      config.adminChatID,
      `Private Message: ${JSON.stringify(e.message)}`
    );
  }
});

module.exports = bot;
