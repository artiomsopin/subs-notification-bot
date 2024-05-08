import { MyContext, MyConversation } from "../../helpers/conversation.config";
import { saveSubscriptionDto } from "../../dto/saveSubscription.dto";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";
import { SubscriptionService } from "../../services/subscriptionService";

export default async function onCreateConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("Enter the name of the service 🔍");
  const serviceName: string = (await conversation.wait()).message
    ?.text as string;

  await ctx.reply("Enter the price 💰");
  const price: number = parseFloat(
    (await conversation.wait()).message?.text as string
  );

  await ctx.reply(
    `Enter the subscription start date by *MM\\-DD\\-YYYY* pattern ▶️`,
    { parse_mode: "MarkdownV2" }
  );

  const subscriptionStartDate: Date = parseDate(
    (await conversation.wait()).message?.text as string
  );

  await ctx.reply(
    "Enter subscription expiration date by *MM\\-DD\\-YYYY* pattern ⏯",
    { parse_mode: "MarkdownV2" }
  );
  const subscriptionExpirationDate: Date = parseDate(
    (await conversation.wait()).message?.text as string
  );

  if (
    serviceName &&
    price &&
    subscriptionStartDate &&
    subscriptionExpirationDate
  ) {
    const subscriptionService: SubscriptionService =
      new SubscriptionServiceImpl();

    const data: saveSubscriptionDto = {
      serviceName: serviceName,
      price: price,
      subscriptionStartDate: subscriptionStartDate,
      subscriptionExpireDate: subscriptionExpirationDate,
    };

    const telegramId: number = (await ctx.message?.from.id) as number;

    try {
      await subscriptionService.saveSubscription(data, telegramId);
      ctx.reply("✅ Subscription was *successfully* created\\!", {
        parse_mode: "MarkdownV2",
      });
    } catch (e) {
      await ctx.reply(
        "❌ Subscription was *NOT* created\\! Please enter correct dates*\\(Format: MM\\-DD\\-YYYY\\)*",
        { parse_mode: "MarkdownV2" }
      );
    }
  }
}

export function parseDate(date: string): Date {
  return new Date(new Date().setTime(Date.parse(date)));
}
