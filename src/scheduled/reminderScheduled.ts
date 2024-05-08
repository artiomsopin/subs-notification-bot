import { Bot } from "grammy";
import * as cron from "node-cron";
import { SubscriptionServiceImpl } from "../services/subscriptionServiceImpl";
import moment from "moment";
import { MyContext } from "../helpers/conversation.config";

export class ReminderScheduled {
  subscriptionService: SubscriptionServiceImpl = new SubscriptionServiceImpl();
  constructor(private readonly bot: Bot<MyContext>) {}

  sendReminders() {
    // Check and notify at 12:00 every day
    cron.schedule("0 12 * * *", async () => {
      // Notifications for subscriptions that will expire tomorrow
      const tomorrowDate: Date = moment().startOf("day").add(1, "day").toDate();

      const tomorrowExpiringSubscriptions =
        await this.subscriptionService.findSubscriptionsByExpirationDate(
          tomorrowDate
        );

      tomorrowExpiringSubscriptions.forEach(async (subscription) => {
        const telegramId = await this.subscriptionService.getTelegramIdByUserId(
          subscription.userId
        );
        await this.bot.api.sendMessage(
          telegramId,
          `⏳ Your subscription for <b>${subscription.serviceName}</b> expires <b>tomorrow!</b>`,
          {
            parse_mode: "HTML",
          }
        );
      });

      // Notifications for subscriptions that will expire in a week
      const weekLaterDate: Date = moment()
        .startOf("day")
        .add(7, "day")
        .toDate();

      const weekLaterExpiringSubscriptions =
        await this.subscriptionService.findSubscriptionsByExpirationDate(
          weekLaterDate
        );

      weekLaterExpiringSubscriptions.forEach(async (subscription) => {
        const telegramId = await this.subscriptionService.getTelegramIdByUserId(
          subscription.userId
        );
        await this.bot.api.sendMessage(
          telegramId,
          `⏳ Your subscription for <b>${subscription.serviceName}</b> expires <b>in a week!</b>`,
          {
            parse_mode: "HTML",
          }
        );
      });
    });
  }
}
