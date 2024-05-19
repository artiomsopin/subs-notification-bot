import { PrismaClient, Subscription, User } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";
import { prisma } from "../helpers/startPrisma";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async editSubscriptionByServiceName(
    editSubscriptionData: editSubscriptionDto
  ): Promise<Subscription> {
    // Find user by it's telegram id
    const user: User | null = await prisma.user.findUnique({
      where: {
        telegramId: editSubscriptionData.telegramId,
      },
    });

    // Throw error if user not found
    if (!user) {
      throw new Error("User not found");
    }

    // Find subscription by it's service name
    const subscription: Subscription | null =
      await prisma.subscription.findFirst({
        where: {
          serviceName: editSubscriptionData.serviceNameToFind,
          userId: user.id,
        },
      });

    // Throw error if subscription not found
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    // Subscription updating
    return await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        serviceName: editSubscriptionData.serviceNameToEdit,
        price: editSubscriptionData.price,
        expirationPeriod: editSubscriptionData.expirationPeriod,
        subscriptionExpireDate: editSubscriptionData.subscriptionExpireDate,
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
    // User existing validation
    const user: User | null = await prisma.user.findFirst({
      where: {
        telegramId: telegramId,
      },
    });

    // Create user if it doesn't exist
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
    // Subscription existing validation
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
