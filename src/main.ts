import { Bot } from "grammy";
import dotenv from "dotenv";
dotenv.config();

const bot: Bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("hello", (ctx) => {
    ctx.reply("hello!");
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

console.log("Bot started!!!!!!");
bot.start();