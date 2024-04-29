import { PrismaClient, Subscription } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";
import { prisma } from "../helpers/startPrisma";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async findAllSubscriptions(
    telegramId: number
  ): Promise<Subscription[] | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    return await prisma.subscription.findMany({
      where: {
        userId: user?.id as number,
      },
    });
  }

  async saveSubscription(
    subscription: Subscription,
    telegramId: number
  ): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          telegramId: telegramId,
        },
      });
    }

    await prisma.subscription.create({
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
