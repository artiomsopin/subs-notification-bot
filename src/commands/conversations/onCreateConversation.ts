import { MyContext, MyConversation } from "../../helpers/conversation.config";
import { saveSubscriptionDto } from "../../dto/saveSubscription.dto";
import { SubscriptionServiceImpl } from "../../services/subcriptionServiceImpl";

export default async function onCreateConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("Enter the name of the service 🔍");
  const serviceName = (await conversation.wait()).message?.text;

  await ctx.reply("Enter the price 💰");
  const price = (await conversation.wait()).message?.text;

  await ctx.reply("Enter the subscription start date by MM-DD-YYYY pattern ▶️");

  const subscriptionStartDate: Date = parseDate(
    (await conversation.wait()).message?.text as string
  );

  await ctx.reply("Enter subscription expiration date by MM-DD-YYYY pattern ⏯");
  const subscriptionExpirationDate = parseDate(
    (await conversation.wait()).message?.text as string
  );

  if (
    serviceName &&
    price &&
    subscriptionStartDate &&
    subscriptionExpirationDate
  ) {
    const subscriptionService = new SubscriptionServiceImpl();

    const data: saveSubscriptionDto = {
      serviceName: serviceName,
      price: parseInt(price),
      subscriptionStartDate: subscriptionStartDate,
      subscriptionExpireDate: subscriptionExpirationDate,
    };

    const telegramId: number = (await ctx.message?.from.id) as number;

    try {
      await subscriptionService.saveSubscription(data, telegramId);
      ctx.reply("Subscription was successfully created!");
    } catch (e) {
      await ctx.reply(
        "Subscription was not created! Please enter correct dates. (Format: MM-DD-YYYY)"
      );
    }
  }
}

function parseDate(date: string): Date {
  // TODO: rewrite this with timezones
  const twelveHours = 3600000 * 12;
  return new Date(new Date().setTime(Date.parse(date) + twelveHours));
}
