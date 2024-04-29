import { inject, injectable } from "inversify";
import { SubscriptionService } from "../services/subscriptionService";
import { SUBSCRIPTION_TYPES } from "../helpers/inversify/subscription.types";
import { SubscriptionRepository } from "./subsrciptionRepository";
import "reflect-metadata";
import { myContainer } from "../helpers/inversify/inversify.config";
import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = myContainer.get<SubscriptionService>(
      SUBSCRIPTION_TYPES.SubscriptionService
    );
  }

  async findAllSubscriptions(
    telegramId: number
  ): Promise<Subscription[] | undefined> {
    return await this.subscriptionService.findAllSubscriptions(telegramId);
  }

  async saveSubscription(
    subscription: saveSubscriptionDto,
    telegramId: number
  ): Promise<void> {
    return await this.subscriptionService.saveSubscription(
      subscription,
      telegramId
    );
  }

  async findByExpirationDate(expirationDate: Date): Promise<Subscription[]> {
    return await this.subscriptionService.findByExpirationDate(expirationDate);
  }
}
