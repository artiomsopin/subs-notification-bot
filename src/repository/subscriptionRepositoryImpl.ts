import { PrismaClient, Subscription } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private readonly prisma = new PrismaClient();

  async findAllSubscriptions(
    telegramId: number
  ): Promise<Subscription[] | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });
    return await this.prisma.subscription.findMany({
      where: {
        userId: user?.id as number,
      },
    });
  }

  async saveSubscription(
    subscription: Subscription,
    telegramId: number
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    if (!user) {
      await this.prisma.user.create({
        data: {
          telegramId: telegramId,
        },
      });
    }

    await this.prisma.subscription.create({
      data: {
        serviceName: subscription.serviceName,
        price: subscription.price,
        subscriptionStartDate: subscription.subscriptionStartDate,
        subscriptionExpireDate: subscription.subscriptionExpireDate,
        userId: user?.id as number,
      },
    });
  }

  async findByExpirationDate(expirationDate: Date): Promise<Subscription[]> {
    throw new Error("Method not implemented.");
  }
}
