export class editSubscriptionDto {
  constructor(
    public serviceNameToFind: string,
    public telegramId: number,
    public serviceNameToEdit?: string,
    public price?: number,
    public expirationPeriod?: number,
    public subscriptionExpireDate?: Date
  ) {}
}
