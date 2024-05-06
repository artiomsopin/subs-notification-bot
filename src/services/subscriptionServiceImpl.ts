import { injectable } from "inversify";
import { SUBSCRIPTION_TYPES } from "../helpers/inversify/subscription.types";
import "reflect-metadata";
import { myContainer } from "../helpers/inversify/inversify.config";
import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";
import { SubscriptionRepository } from "../repository/subscriptionRepository";
import { SubscriptionService } from "./subscriptionService";

@injectable()
export class SubscriptionServiceImpl implements SubscriptionService {
  private readonly subscriptionRepository: SubscriptionRepository;

  constructor() {
    this.subscriptionRepository = myContainer.get<SubscriptionRepository>(
      SUBSCRIPTION_TYPES.SubscriptionRepository
    );
  }
  editByServiceName(
    serviceNameToFind: string,
    telegramId: number,
    serviceNameToEdit?: string | undefined,
    price?: number | undefined,
    subscriptionStartDate?: Date | undefined,
    subscriptionExpirationDate?: Date | undefined
  ): Promise<Subscription> {
    return this.subscriptionRepository.editByServiceName(
      serviceNameToFind,
      telegramId,
      serviceNameToEdit,
      price,
      subscriptionStartDate,
      subscriptionExpirationDate
    );
  }

  async findAllSubscriptions(
    telegramId: number
  ): Promise<Subscription[] | undefined> {
    return await this.subscriptionRepository.findAllSubscriptions(telegramId);
  }

  async saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void> {
    return await this.subscriptionRepository.saveSubscription(
      subscription,
      telegramId
    );
  }

  async deleteByServiceName(
    serviceName: string,
    telegramId: number
  ): Promise<void> {
    await this.subscriptionRepository.deleteByServiceName(
      serviceName,
      telegramId
    );
  }
}
