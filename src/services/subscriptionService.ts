import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";

export interface SubscriptionService {
  findAllSubscriptions(telegramId: number): Promise<Subscription[] | undefined>;

  saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void>;

  deleteByServiceName(serviceName: string, telegramId: number): Promise<void>;

  editByServiceName(
    serviceNameToFind: string,
    telegramId: number,
    serviceNameToEdit?: string,
    price?: number,
    subscriptionStartDate?: Date,
    subscriptionExpirationDate?: Date
  ): Promise<Subscription>;
}
