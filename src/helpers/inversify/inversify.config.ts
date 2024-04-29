import { Container } from "inversify";
import { SubscriptionService } from "../../services/subscriptionService";
import { SUBSCRIPTION_TYPES } from "./subscription.types";
import { SubscriptionServiceImpl } from "../../services/subscriptionServiceImpl";
import { SubscriptionRepository } from "../../repository/subsrciptionRepository";
import { SubscriptionRepositoryImpl } from "../../repository/subcriptionRepositoryImpl";
import "reflect-metadata";

export const myContainer = new Container();
myContainer
  .bind<SubscriptionService>(SUBSCRIPTION_TYPES.SubscriptionService)
  .to(SubscriptionServiceImpl);

myContainer
  .bind<SubscriptionRepository>(SUBSCRIPTION_TYPES.SubscriptionRepository)
  .to(SubscriptionRepositoryImpl);
