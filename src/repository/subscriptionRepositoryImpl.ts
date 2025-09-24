import { Subscription, User } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";
import { prisma } from "../helpers/startPrisma";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async editSubscriptionByServiceName(
    dto: editSubscriptionDto
  ): Promise<Subscription> {
    const user: User | null = await prisma.user.findUnique({
      where: {
        telegramId: dto.telegramId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const subscription: Subscription | null =
      await prisma.subscription.findFirst({
        where: {
          serviceName: dto.serviceNameToFind,
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
        serviceName: dto.serviceNameToEdit,
        price: dto.price,
        expirationPeriod: dto.expirationPeriod,
        subscriptionExpireDate: dto.subscriptionExpireDate,
      },
    });
  }

  async findAllSubscriptions(telegramId: number): Promise<Subscription[]> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.subscription.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async saveSubscription(
    subscription: Subscription,
    telegramId: number
  ): Promise<void> {
    let user: User | null = await prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    if (user === null) {
      user = await prisma.user.create({
        data: {
          telegramId: telegramId,
        },
      });
    }

    await prisma.subscription.create({
      data: {
        serviceName: subscription.serviceName,
        price: subscription.price,
        expirationPeriod: subscription.expirationPeriod,
        subscriptionExpireDate: subscription.subscriptionExpireDate,
        userId: user?.id as number,
      },
    });
  }

  async deleteByServiceName(
    serviceName: string,
    telegramId: number
  ): Promise<void> {
    const subscriptions = await prisma.subscription.findFirst({
      where: {
        serviceName: serviceName,
        user: {
          telegramId: telegramId,
        },
      },
    });

    if (!subscriptions) {
      throw new Error("Subscription not found");
    }

    await prisma.subscription.deleteMany({
      where: {
        serviceName: serviceName,
        user: {
          telegramId: telegramId,
        },
      },
    });
  }

  async findSubscriptionsByExpirationDate(
    expireDate: Date
  ): Promise<Subscription[]> {
    return await prisma.subscription.findMany({
      where: {
        subscriptionExpireDate: expireDate,
      },
    });
  }

  async getTelegramIdByUserId(userId: number): Promise<number> {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.telegramId;
  }

  async renewSubscriptionExpirationDate(
    renewedExpirationDate: Date,
    subscriptionId: number
  ): Promise<void> {
    // Renew subscription expiration date by provided new date and subscription id
    await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        subscriptionExpireDate: renewedExpirationDate,
      },
    });
  }
}
