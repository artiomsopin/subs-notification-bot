import { MyContext } from "../helpers/conversationConfig";

export default async function handleCreate(ctx: MyContext) {
  await ctx.conversation.enter("onCreateConversation");
}
