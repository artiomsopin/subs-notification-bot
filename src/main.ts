import { Bot, Keyboard } from "grammy";
import dotenv from "dotenv";
import handleStart from "./commnads/handleStart";
dotenv.config();


const bot: Bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);

bot.command(["start", "help"], handleStart);

console.log("Bot started!!!!!!");
bot.start();