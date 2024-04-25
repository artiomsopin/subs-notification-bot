// Config dotenv
import dotenv from "dotenv";
dotenv.config();
// Dependencies
import { Bot, Composer, session } from "grammy";
import handleStart from "./commands/handleStart";
import { KeyboardButtonNames } from "./utils/constants/keyboardButtonNames";
import handleCreate from "./commands/handleCreate";
import handleGetAll from "./commands/handleGetAll";
import handleEdit from "./commands/handleEdit";
import handleDelete from "./commands/handleDelete";
import startPrisma from "./helpers/startPrisma";
import errorHandler from "./helpers/errorHandler";
import { conversations, createConversation } from "@grammyjs/conversations";
import { MyContext, initial } from "./helpers/conversationConfig";
import onCreateConversation from "./helpers/conversations/onCreateConversation";

let create = "create";

async function bootstrap() {
  console.log("Starting app...");

  await startPrisma();
  console.log("Prisma started");

  const bot: Bot<MyContext> = new Bot<MyContext>(
    `${process.env.TELEGRAM_BOT_TOKEN}`
  );

  const composer = new Composer();
  bot.use(session({ initial }));
  bot.use(conversations());
  bot.use(createConversation(onCreateConversation));

  bot.command(["start", "help"], handleStart);

  bot.hears(KeyboardButtonNames.CREATE, handleCreate);
  bot.hears(KeyboardButtonNames.GET_ALL, handleGetAll);
  bot.hears(KeyboardButtonNames.EDIT, handleEdit);
  bot.hears(KeyboardButtonNames.DELETE, handleDelete);

  bot.catch(errorHandler);

  console.log("Bot is running...");
  bot.start();
}

void bootstrap();
