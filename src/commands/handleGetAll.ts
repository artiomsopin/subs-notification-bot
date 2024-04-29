import { Context } from "grammy";
import { Subscription } from "@prisma/client";
import { SubscriptionServiceImpl } from "../services/subcriptionServiceImpl";

export default async function handleGetAll(ctx: Context) {
  const subscriptionService = new SubscriptionServiceImpl();
  const telegramId: number = (await ctx.message?.from.id) as number;

  const subscriptions: Subscription[] | undefined =
    await subscriptionService.findAllSubscriptions(telegramId);
  if (subscriptions) {
    await ctx.reply(subscriptions.toString());
  } else {
    await ctx.reply("No subscriptions found");
  }
}
