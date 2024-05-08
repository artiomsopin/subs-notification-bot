import { editSubscriptionDto } from "../../dto/editSubscription.dto";
import { onEditKeyboardButtonNames } from "../../helpers/constants/onEditKeyboardButtonNames";
import { MyContext, MyConversation } from "../../helpers/conversation.config";
import onEditKeyboard from "../../helpers/keyboards/onEdtiKeyboard";
import onStartKeyboard from "../../helpers/keyboards/onStartKeyboard";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";
import { parseDate } from "./onCreateConversation";

export default async function onEditConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("🔄 Enter the name of the service you want to edit");
  let serviceNameToFind: string = (await conversation.wait()).message
    ?.text as string;

  await ctx.reply("Enter the name of the service you want to change to 🔍", {
    reply_markup: onEditKeyboard(),
  });
  let serviceNameToEdit: string | undefined = (await conversation.wait())
    .message?.text;
  if (serviceNameToEdit === onEditKeyboardButtonNames.SKIP) {
    serviceNameToEdit = undefined;
  }

  await ctx.reply("Enter the price 💰", {
    reply_markup: onEditKeyboard(),
  });
  let price: number | string | undefined = (await conversation.wait()).message
    ?.text as string;
  if (price === onEditKeyboardButtonNames.SKIP) {
    price = undefined;
  } else {
    price = parseInt(price);
  }

  await ctx.reply(
    `Enter the subscription start date by *MM\\-DD\\-YYYY* pattern ▶️`,
    { parse_mode: "MarkdownV2", reply_markup: onEditKeyboard() }
  );
  let subscriptionStartDate: string | undefined | Date = (
    await conversation.wait()
  ).message?.text as string;
  if (subscriptionStartDate === onEditKeyboardButtonNames.SKIP) {
    subscriptionStartDate = undefined;
  } else {
    subscriptionStartDate = parseDate(subscriptionStartDate);
  }

  await ctx.reply(
    "Enter subscription expiration date by *MM\\-DD\\-YYYY* pattern ⏯",
    { parse_mode: "MarkdownV2", reply_markup: onEditKeyboard() }
  );
  let subscriptionExpireDate: string | undefined | Date = (
    await conversation.wait()
  ).message?.text as string;
  if (subscriptionExpireDate === onEditKeyboardButtonNames.SKIP) {
    subscriptionExpireDate = undefined;
  } else {
    subscriptionExpireDate = parseDate(subscriptionExpireDate);
  }

  const telegramId = ctx.message?.from.id as number;
  const editSubscriptionData: editSubscriptionDto = {
    serviceNameToFind,
    telegramId,
    serviceNameToEdit,
    price,
    subscriptionStartDate,
    subscriptionExpireDate,
  };
  try {
    const subscriptionService = new SubscriptionServiceImpl();
    await subscriptionService.editByServiceName(editSubscriptionData);
    ctx.reply("Subscription edited successfully ✅", {
      reply_markup: onStartKeyboard(),
    });
  } catch (error) {
    ctx.reply("Subscription not found ❌", {
      reply_markup: onStartKeyboard(),
    });
  }
}
