import { Subscription } from "@prisma/client";
import { SubscriptionService } from "./subscriptionService";

class SubscriptionServiceImpl implements SubscriptionService {
  findAllSubscriptions(telegramId: string): Subscription | undefined {
    throw new Error("Method not implemented.");
  }

  saveSubscription(subscription: Subscription): void {}

  findByExpirationDate(expirationDate: Date): Subscription[] {
    throw new Error("Method not implemented.");
  }
}
