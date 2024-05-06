import { PrismaClient, Subscription } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";
import { prisma } from "../helpers/startPrisma";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async editByServiceName(
    serviceNameToFind: string,
    telegramId: number,
    serviceNameToEdit?: string | undefined,
    price?: number | undefined,
    subscriptionStartDate?: Date | undefined,
    subscriptionExpirationDate?: Date | undefined
  ): Promise<Subscription> {
    const user = await prisma.user.findUnique({
      where: {
        telegramId: telegramId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        serviceName: serviceNameToFind,
        userId: user.id,
      },
    });

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        serviceName: serviceNameToEdit,
        price: price,
        subscriptionStartDate: subscriptionStartDate,
        subscriptionExpireDate: subscriptionExpirationDate,
      },
    });
  }

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

  async deleteByServiceName(
    serviceName: string,
    telegramId: number
  ): Promise<void> {
    await prisma.subscription.deleteMany({
      where: {
        serviceName: serviceName,
        user: {
          telegramId: telegramId,
        },
      },
    });
  }
}
