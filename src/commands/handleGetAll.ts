import { Context } from "grammy";
import { SubscriptionRepositoryImpl } from "../repository/subcriptionRepositoryImpl";
import { Subscription } from "@prisma/client";

export default async function handleGetAll(ctx: Context) {
  const subscriptionRepository = new SubscriptionRepositoryImpl();
  const telegramId: number = (await ctx.message?.from.id) as number;

  const subscriptions: Subscription[] | undefined =
    await subscriptionRepository.findAllSubscriptions(telegramId);
  if (subscriptions) {
    await ctx.reply(subscriptions.toString());
  } else {
    await ctx.reply("No subscriptions found");
  }
}
