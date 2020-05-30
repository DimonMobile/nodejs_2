const telegraf = require('telegraf');
const bot = new telegraf('566077437:AAHGGokL9wgoqZH5-5rh0KnGSiBjaLl3aaE');

bot.start((ctx) => ctx.reply('welcome'));

bot.on('text', (ctx) => {
    return ctx.reply('echo: ' + ctx.message.text);
});

bot.startPolling();