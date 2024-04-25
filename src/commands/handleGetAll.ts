import { Context } from "grammy";

export default async function handleGetAll(ctx: Context) {
    await ctx.reply('get all');
}