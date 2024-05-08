// Config dotenv
import dotenv from "dotenv";
dotenv.config();
// Dependencies
import { Bot, session } from "grammy";
import handleStart from "./commands/handleStart";
import { onStartKeyboardButtonNames } from "./helpers/constants/onStartKeyboardButtonNames";
import handleGetAll from "./commands/handleGetAll";
import handleEdit from "./commands/handleEdit";
import handleDelete from "./commands/handleDelete";
import startPrisma from "./helpers/startPrisma";
import errorHandler from "./helpers/errorHandler";
import { conversations, createConversation } from "@grammyjs/conversations";
import { MyContext, initial } from "./helpers/conversation.config";
import onCreateConversation from "./commands/conversations/onCreateConversation";
import handleCreate from "./commands/handleCreate";
import onEditConversation from "./commands/conversations/onEditConversation";
import onDeleteConversation from "./commands/conversations/onDeleteConversation";
import { ReminderScheduled } from "./scheduled/reminderScheduled";

async function bootstrap() {
  console.log("Starting app...");

  // Prisma
  await startPrisma();
  console.log("Prisma started");

  // Bot
  const bot: Bot<MyContext> = new Bot<MyContext>(
    `${process.env.TELEGRAM_BOT_TOKEN}`
  );

  // Scheduled cron
  const reminderScheduled = new ReminderScheduled(bot);
  reminderScheduled.sendReminders();

  // Conversations
  bot.use(session({ initial }));
  bot.use(conversations());
  bot.use(createConversation(onCreateConversation));
  bot.use(createConversation(onEditConversation));
  bot.use(createConversation(onDeleteConversation));

  // Commands
  bot.command(["start", "help"], handleStart);

  bot.hears(onStartKeyboardButtonNames.CREATE, handleCreate);
  bot.hears(onStartKeyboardButtonNames.GET_ALL, handleGetAll);
  bot.hears(onStartKeyboardButtonNames.EDIT, handleEdit);
  bot.hears(onStartKeyboardButtonNames.DELETE, handleDelete);

  // Error handler
  bot.catch(errorHandler);

  console.log("Bot is running...");
  bot.start();
}

void bootstrap();
