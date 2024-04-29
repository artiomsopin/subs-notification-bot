import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";

export interface SubscriptionRepository {
  findAllSubscriptions(telegramId: number): Promise<Subscription[] | undefined>;

  saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void>;

  findByExpirationDate(expirationDate: Date): Promise<Subscription[]>;
}
