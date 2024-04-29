import { MyContext, MyConversation } from "../../helpers/conversation.config";

export default async function onEditConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("Edit");
}
