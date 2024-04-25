import { Context } from "grammy";

export default async function handleDelete(ctx: Context) {
  await ctx.reply("Delete");
}
