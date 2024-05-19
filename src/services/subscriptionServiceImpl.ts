import { injectable } from "inversify";
import { SUBSCRIPTION_TYPES } from "../helpers/inversify/subscription.types";
import "reflect-metadata";
import { myContainer } from "../helpers/inversify/inversify.config";
import { Subscription } from "@prisma/client";
import { saveSubscriptionDto } from "../dto/saveSubscription.dto";
import { SubscriptionRepository } from "../repository/subscriptionRepository";
import { SubscriptionService } from "./subscriptionService";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

@injectable()
export class SubscriptionServiceImpl implements SubscriptionService {
  private readonly subscriptionRepository: SubscriptionRepository;

  constructor() {
    this.subscriptionRepository = myContainer.get<SubscriptionRepository>(
      SUBSCRIPTION_TYPES.SubscriptionRepository
    );
  }
  async editSubscriptionByServiceName(
    editSubscriptionData: editSubscriptionDto
  ): Promise<Subscription> {
    return await this.subscriptionRepository.editSubscriptionByServiceName(
      editSubscriptionData
    );
  }

  async findAllSubscriptions(telegramId: number): Promise<Subscription[]> {
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

  async findSubscriptionsByExpirationDate(
    expireDate: Date
  ): Promise<Subscription[]> {
    return await this.subscriptionRepository.findSubscriptionsByExpirationDate(
      expireDate
    );
  }

  async getTelegramIdByUserId(userId: number): Promise<number> {
    return await this.subscriptionRepository.getTelegramIdByUserId(userId);
  }

  async renewSubscriptionExpirationDate(
    renewedExpirationDate: Date,
    subscriptionId: number
  ): Promise<void> {
    await this.subscriptionRepository.renewSubscriptionExpirationDate(
      renewedExpirationDate,
      subscriptionId
    );
  }
}
