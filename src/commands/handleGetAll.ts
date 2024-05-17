import { Subscription } from "@prisma/client";
import { SubscriptionServiceImpl } from "../services/subscriptionServiceImpl";
import moment from "moment";
import { MyContext } from "../helpers/conversation.config";
import { SubscriptionService } from "../services/subscriptionService";

export default async function handleGetAll(ctx: MyContext) {
  const subscriptionService: SubscriptionService =
    new SubscriptionServiceImpl();
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
          "\n⏯  <b>Subscription expiration date:</b> " +
          moment(subscription.subscriptionExpireDate).format("MM-DD-YYYY") +
          "\n📅  <b>Subscription expiration period:</b> " +
          subscription.expirationPeriod +
          " <b>month(s)</b>",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else {
    await ctx.reply("❌ No subscriptions found");
  }
}
