import { MyContext, MyConversation } from "../../helpers/conversation.config";
import { SubscriptionService } from "../../services/subscriptionService";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";

export default async function onDeleteConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("🗑️ Enter the name of the service you would like to delete");

  const serviceName: string = (await conversation.wait()).message
    ?.text as string;

  const telegramId: number = ctx.message?.from.id as number;

  const subscriptionService: SubscriptionService =
    new SubscriptionServiceImpl();
  try {
    await subscriptionService.deleteByServiceName(serviceName, telegramId);
    ctx.reply("Service deleted successfully ✅");
  } catch (error) {
    ctx.reply("Service not found ❌");
  }
}
