export interface F51Dto {
  data: Array<{
    orderNumberAndDate: string;
    specifiedDeadline: string;
    actualCompletion: string;
    responsibleExecutor: string;
    customerDetails: string;
    failureReason: string;
    comment: string;
  }>;
  APInput: string;
  UBPInput: string;
}
