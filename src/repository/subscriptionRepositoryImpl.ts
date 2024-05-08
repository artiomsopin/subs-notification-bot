import { PrismaClient, Subscription } from "@prisma/client";
import { SubscriptionRepository } from "./subscriptionRepository";
import { injectable } from "inversify";
import "reflect-metadata";
import { prisma } from "../helpers/startPrisma";
import { editSubscriptionDto } from "../dto/editSubscription.dto";

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  async editByServiceName(
    editSubscriptionData: editSubscriptionDto
  ): Promise<Subscription> {
    const user = await prisma.user.findUnique({
      where: {
        telegramId: editSubscriptionData.telegramId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        serviceName: editSubscriptionData.serviceNameToFind,
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
        serviceName: editSubscriptionData.serviceNameToEdit,
        price: editSubscriptionData.price,
        subscriptionStartDate: editSubscriptionData.subscriptionStartDate,
        subscriptionExpireDate: editSubscriptionData.subscriptionExpireDate,
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
