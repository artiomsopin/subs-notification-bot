import { editSubscriptionDto } from "../../dto/editSubscription.dto";
import { onEditKeyboardButtonNames } from "../../helpers/constants/onEditKeyboardButtonNames";
import { MyContext, MyConversation } from "../../helpers/conversation.config";
import onEditKeyboard from "../../helpers/keyboards/onEditKeyboard";
import onStartKeyboard from "../../helpers/keyboards/onStartKeyboard";
import parseDate from "../../helpers/parseDate";
import { SubscriptionService } from "../../services/subscriptionService";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";

export default async function onEditConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(
    "🔄 Enter the <b>name of the subscription</b> you want to edit",
    {
      parse_mode: "HTML",
    }
  );
  let serviceNameToFind: string = (await conversation.wait()).message
    ?.text as string;

  await ctx.reply(
    "Enter the <b>name of the service</b> you want to change to 🔍",
    {
      reply_markup: onEditKeyboard(),
      parse_mode: "HTML",
    }
  );
  let serviceNameToEdit: string | undefined = (await conversation.wait())
    .message?.text;
  if (serviceNameToEdit === onEditKeyboardButtonNames.SKIP) {
    serviceNameToEdit = undefined;
  }

  await ctx.reply("Enter the <b>price</b> 💰", {
    reply_markup: onEditKeyboard(),
    parse_mode: "HTML",
  });
  let price: number | string | undefined = (await conversation.wait()).message
    ?.text as string;
  if (price === onEditKeyboardButtonNames.SKIP) {
    price = undefined;
  } else {
    price = parseFloat(price);
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

  await ctx.reply(`Enter the subscription expiration period in *months* 📅`, {
    parse_mode: "MarkdownV2",
    reply_markup: onEditKeyboard(),
  });
  let expirationPeriod: string | undefined | number = (
    await conversation.wait()
  ).message?.text as string;
  if (expirationPeriod === onEditKeyboardButtonNames.SKIP) {
    expirationPeriod = undefined;
  } else {
    expirationPeriod = parseInt(expirationPeriod);
  }

  const telegramId: number = ctx.message?.from.id as number;

  const editSubscriptionData: editSubscriptionDto = {
    serviceNameToFind,
    telegramId,
    serviceNameToEdit,
    price,
    expirationPeriod,
    subscriptionExpireDate,
  };

  try {
    const subscriptionService: SubscriptionService =
      new SubscriptionServiceImpl();

    await subscriptionService.editSubscriptionByServiceName(
      editSubscriptionData
    );

    ctx.reply("Subscription <b>successfully</b> updated ✅", {
      reply_markup: onStartKeyboard(),
      parse_mode: "HTML",
    });
  } catch (error) {
    ctx.reply(
      "Subscription was <b>not</b> updated ❌\n" +
        "Please make sure you are entering <b>correct data</b>",
      {
        reply_markup: onStartKeyboard(),
        parse_mode: "HTML",
      }
    );
  }
}
