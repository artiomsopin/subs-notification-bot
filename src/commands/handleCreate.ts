import { MyContext } from "../helpers/conversation.config";

export default async function handleCreate(ctx: MyContext) {
  await ctx.conversation.enter("onCreateConversation");
}
