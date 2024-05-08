import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

export interface SubscriptionRepository {
  findAllSubscriptions(telegramId: number): Promise<Subscription[] | undefined>;

  saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void>;

  deleteByServiceName(serviceName: string, telegramId: number): Promise<void>;

  editByServiceName(
    editSubscriptionData: editSubscriptionDto
  ): Promise<Subscription>;
}
