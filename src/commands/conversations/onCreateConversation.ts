import { MyContext, MyConversation } from "../../helpers/conversation.config";
import { saveSubscriptionDto } from "../../dto/saveSubscription.dto";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";
import { SubscriptionService } from "../../services/subscriptionService";
import parseDate from "../../helpers/parseDate";
import onStartKeyboard from "../../helpers/keyboards/onStartKeyboard";

export default async function onCreateConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("Enter the *name* of the service 🔍", {
    parse_mode: "MarkdownV2",
  });
  const serviceName: string = (await conversation.wait()).message
    ?.text as string;

  await ctx.reply("Enter the *price* 💰", { parse_mode: "MarkdownV2" });
  const price: number = parseFloat(
    (await conversation.wait()).message?.text as string
  );

  await ctx.reply(
    "Enter subscription expiration date by *MM\\-DD\\-YYYY* pattern ⏯",
    { parse_mode: "MarkdownV2" }
  );
  const subscriptionExpirationDate: Date = parseDate(
    (await conversation.wait()).message?.text as string
  );

  await ctx.reply(`Enter the subscription *expiration period* in *months* 📅`, {
    parse_mode: "MarkdownV2",
  });

  const expirationPeriod: number = parseInt(
    (await conversation.wait()).message?.text as string
  );

  if (serviceName && price && expirationPeriod && subscriptionExpirationDate) {
    const subscriptionService: SubscriptionService =
      new SubscriptionServiceImpl();

    const data: saveSubscriptionDto = {
      serviceName: serviceName,
      price: price,
      expirationPeriod: expirationPeriod,
      subscriptionExpireDate: subscriptionExpirationDate,
    };

    const telegramId: number = (await ctx.message?.from.id) as number;
    await subscriptionService.saveSubscription(data, telegramId);
    ctx.reply("✅ Subscription was *successfully created\\!*", {
      parse_mode: "MarkdownV2",
      reply_markup: onStartKeyboard(),
    });
  } else {
    await ctx.reply(
      "❌ Subscription was *not* created\\! Please be sure you enter correct dates* \\(Format: MM\\-DD\\-YYYY\\)*",
      { parse_mode: "MarkdownV2", reply_markup: onStartKeyboard() }
    );
  }
}
