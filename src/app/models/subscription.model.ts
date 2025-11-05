export interface AdditionalInfo {
  gender: string;
  documentType: string;
  documentNumber: string;
}

export interface SubscriptionData {
  additionalInfo?: AdditionalInfo;
  termsAccepted?: boolean;
  businessName?: string;
  businessLogo?: string;
  companyId?: string;
}
