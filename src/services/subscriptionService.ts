import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

export interface SubscriptionService {
  findAllSubscriptions(telegramId: number): Promise<Subscription[]>;

  saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void>;

  deleteByServiceName(serviceName: string, telegramId: number): Promise<void>;

  editSubscriptionByServiceName(
    editSubscriptionData: editSubscriptionDto
  ): Promise<Subscription>;

  findSubscriptionsByExpirationDate(expireDate: Date): Promise<Subscription[]>;

  getTelegramIdByUserId(userId: number): Promise<number>;

  renewSubscriptionExpirationDate(
    renewedExpirationDate: Date,
    subscriptionId: number
  ): Promise<void>;
}
