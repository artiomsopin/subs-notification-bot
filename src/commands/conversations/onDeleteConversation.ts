import { MyContext, MyConversation } from "../../helpers/conversation.config";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";

export default async function onDeleteConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("🗑️ Enter the name of the service you would like to delete");
  const serviceName = (await conversation.wait()).message?.text;
  const telegramId = ctx.message?.from.id;

  const subscriptionService = new SubscriptionServiceImpl();
  try {
    await subscriptionService.deleteByServiceName(
      serviceName as string,
      telegramId as number
    );
    ctx.reply("Service deleted successfully ✅");
  } catch (error) {
    ctx.reply("Service not found ❌");
  }
}
