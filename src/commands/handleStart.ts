import { Context } from "grammy";
import startKeyboard from "../helpers/startKeyboard";

export default async function handleStart(ctx: Context) {
  const keyboard = await startKeyboard();

  await ctx.reply("Hello", {
    reply_markup: keyboard,
  });
}
