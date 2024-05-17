import { MyContext, MyConversation } from "../../helpers/conversation.config";
import onStartKeyboard from "../../helpers/keyboards/onStartKeyboard";
import { SubscriptionService } from "../../services/subscriptionService";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";

export default async function onDeleteConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(
    "🗑️ Enter the *name of the service* you would like to *delete*",
    {
      parse_mode: "MarkdownV2",
    }
  );

  const serviceName: string = (await conversation.wait()).message
    ?.text as string;

  const telegramId: number = ctx.message?.from.id as number;

  const subscriptionService: SubscriptionService =
    new SubscriptionServiceImpl();
  try {
    await subscriptionService.deleteByServiceName(serviceName, telegramId);
    ctx.reply("Subscription was *successfully deleted* ✅", {
      parse_mode: "MarkdownV2",
      reply_markup: onStartKeyboard(),
    });
  } catch (error) {
    ctx.reply("Subscription *not found* ❌", {
      parse_mode: "MarkdownV2",
      reply_markup: onStartKeyboard(),
    });
  }
}
