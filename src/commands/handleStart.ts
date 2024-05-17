import onStartKeyboard from "../helpers/keyboards/onStartKeyboard";
import { MyContext } from "../helpers/conversation.config";
import { onStartInfo } from "../helpers/constants/onStartInfo";
export default async function handleStart(ctx: MyContext) {
  await ctx.reply(onStartInfo, {
    reply_markup: onStartKeyboard(),
    parse_mode: "HTML",
  });
}
