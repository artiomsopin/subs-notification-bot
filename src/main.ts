// Config dotenv
import dotenv from "dotenv";
dotenv.config();
// Dependencies
import { Bot } from "grammy";
import handleStart from "./commands/handleStart";
import { KeyboardButtonNames } from "./utils/constants/keyboardButtonNames";
import handleCreate from "./commands/handleCreate";
import handleGetAll from "./commands/handleGetAll";
import handleEdit from "./commands/handleEdit";
import handleDelete from "./commands/handleDelete";
import startPrisma from "./helpers/startPrisma";

async function bootstrap() {
    console.log('Starting app...')

    await startPrisma()
    console.log('Prisma started')
    const bot: Bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);

    bot.command(["start", "help"], handleStart);

    bot.hears(KeyboardButtonNames.CREATE, handleCreate);
    bot.hears(KeyboardButtonNames.GET_ALL, handleGetAll);
    bot.hears(KeyboardButtonNames.EDIT, handleEdit);
    bot.hears(KeyboardButtonNames.DELETE, handleDelete);

    console.log("Bot is running...");
    bot.start();
}

void bootstrap();