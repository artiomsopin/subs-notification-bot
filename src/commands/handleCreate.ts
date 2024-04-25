import { Context } from "grammy";

export default async function handleCreate(ctx: Context) {
    await ctx.reply('Enter the name of the service:');
}