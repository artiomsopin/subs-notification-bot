import { MyContext, MyConversation } from "../conversationConfig";

export default async function onCreateConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("Enter the name of the service");
  const serviceName = await conversation.wait();

  await ctx.reply("Enter the price");
  const price = await conversation.wait();

  await ctx.reply("Enter the subscription start date");
  const subscriptionStartDate = await conversation.wait();

  await ctx.reply("Enter the subscription expire date");
  const subscriptionExpirationDate = await conversation.wait();
}
