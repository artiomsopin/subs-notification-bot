import { Context } from "grammy";
import { MyContext } from "../helpers/conversation.config";

export default async function handleDelete(ctx: MyContext) {
  await ctx.conversation.enter("onDeleteConversation");
}
