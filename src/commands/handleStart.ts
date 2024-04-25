import { Context } from "grammy";
import showKeyboard from "../helpers/startKeyboard";

export default async function handleStart(ctx: Context) {
    const keyboard = await showKeyboard();

    await ctx.reply('Hello', {
        reply_markup: keyboard
    });

}