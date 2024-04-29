import { Container } from "inversify";
import { SUBSCRIPTION_TYPES } from "./subscription.types";
import "reflect-metadata";
import { SubscriptionServiceImpl } from "../../services/subcriptionServiceImpl";
import { SubscriptionService } from "../../services/subsrciptionService";
import { SubscriptionRepository } from "../../repository/subscriptionRepository";
import { SubscriptionRepositoryImpl } from "../../repository/subscriptionRepositoryImpl";

export const myContainer = new Container();
myContainer
  .bind<SubscriptionService>(SUBSCRIPTION_TYPES.SubscriptionService)
  .to(SubscriptionServiceImpl);

myContainer
  .bind<SubscriptionRepository>(SUBSCRIPTION_TYPES.SubscriptionRepository)
  .to(SubscriptionRepositoryImpl);
