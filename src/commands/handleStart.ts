import { Context } from "grammy";
import onStartKeyboard from "../helpers/keyboards/onStartKeyboard";

export default async function handleStart(ctx: Context) {
  const keyboard = await onStartKeyboard();

  await ctx.reply("Hello", {
    reply_markup: keyboard,
  });
}
