import showKeyboard from "../helpers/keyboard";

export default async function handleStart(ctx: any) {
    const keyboard = await showKeyboard(ctx);

    await ctx.reply('Hello', {
        reply_markup: keyboard
    });

}