import { Bot } from "grammy";
import * as cron from "node-cron";
import { SubscriptionServiceImpl } from "../services/subscriptionServiceImpl";
import moment from "moment";
import { MyContext } from "../helpers/conversation.config";
import onStartKeyboard from "../helpers/keyboards/onStartKeyboard";
import { Subscription } from "@prisma/client";

export class ReminderScheduled {
  subscriptionService: SubscriptionServiceImpl = new SubscriptionServiceImpl();
  constructor(private readonly bot: Bot<MyContext>) {}

  sendReminders() {
    // Check subscriptions for expirations and notify users at 12:00 every day
    cron.schedule("0 12 * * *", async () => {
      // Notify users and renew subscriptions expiration date that will expire tomorrow
      const tomorrowDate: Date = moment().startOf("day").add(1, "day").toDate();

      const tomorrowExpiringSubscriptions: Subscription[] =
        await this.subscriptionService.findSubscriptionsByExpirationDate(
          tomorrowDate
        );

      tomorrowExpiringSubscriptions.forEach(async (subscription) => {
        const telegramId: number =
          await this.subscriptionService.getTelegramIdByUserId(
            subscription.userId
          );
        await this.bot.api.sendMessage(
          telegramId,
          `⏳ Your subscription for <b>${subscription.serviceName}</b> expires <b>tomorrow!</b> It will be <b>automatically renewed</b> according to your expiration period: <b>${subscription.expirationPeriod} months.</b>` +
            "\n\n" +
            `You can always edit or delete your subscription using the appropriate commands in the main menu.`,
          {
            parse_mode: "HTML",
            reply_markup: onStartKeyboard(),
          }
        );

        // Renew subscription expiration date by provided new date and subscription id
        const renewedExpirationDate: Date = moment(
          subscription.subscriptionExpireDate
        )
          .add(subscription.expirationPeriod, "months")
          .toDate();
        await this.subscriptionService.renewSubscriptionExpirationDate(
          renewedExpirationDate,
          subscription.id
        );
      });

      // Notify users whose subscriptions will expire in a week
      const weekLaterDate: Date = moment()
        .startOf("day")
        .add(7, "day")
        .toDate();

      const weekLaterExpiringSubscriptions: Subscription[] =
        await this.subscriptionService.findSubscriptionsByExpirationDate(
          weekLaterDate
        );

      weekLaterExpiringSubscriptions.forEach(async (subscription) => {
        const telegramId: number =
          await this.subscriptionService.getTelegramIdByUserId(
            subscription.userId
          );
        await this.bot.api.sendMessage(
          telegramId,
          `⏳ Your subscription for <b>${subscription.serviceName}</b> expires <b>in a week!</b>` +
            "\n\n" +
            `Expiration period: <b>${subscription.expirationPeriod} month(s).</b>`,
          {
            parse_mode: "HTML",
            reply_markup: onStartKeyboard(),
          }
        );
      });
    });
  }
}
