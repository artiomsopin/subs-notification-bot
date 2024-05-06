import { Subscription } from "@prisma/client";
import { SubscriptionServiceImpl } from "../services/subscriptionServiceImpl";
import moment from "moment";
import { MyContext } from "../helpers/conversation.config";
import { InlineKeyboard } from "grammy";

export default async function handleGetAll(ctx: MyContext) {
  const subscriptionService = new SubscriptionServiceImpl();
  const telegramId: number = ctx.message?.from.id as number;

  const subscriptions: Subscription[] | undefined =
    await subscriptionService.findAllSubscriptions(telegramId);

  if (subscriptions?.length) {
    for (const subscription of subscriptions) {
      await ctx.reply(
        "🔍  <b>Service name:</b> " +
          subscription.serviceName +
          "\n💰  <b>Price:</b> " +
          subscription.price +
          "\n▶️  <b>Subscription start date:</b> " +
          moment(subscription.subscriptionStartDate).format("MM-DD-YYYY") +
          "\n⏯  <b>Subscription expire date:</b> " +
          moment(subscription.subscriptionExpireDate).format("MM-DD-YYYY"),
        {
          parse_mode: "HTML",
        }
      );
    }
  } else {
    await ctx.reply("❌ No subscriptions found");
  }
}
