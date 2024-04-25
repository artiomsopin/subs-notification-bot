import { Subscription } from "@prisma/client";

export interface SubscriptionService {
  findAllSubscriptions(telegramId: string): undefined | Subscription;
  saveSubscription(subscription: Subscription): void;
  findByExpirationDate(expirationDate: Date): Subscription[];
}
