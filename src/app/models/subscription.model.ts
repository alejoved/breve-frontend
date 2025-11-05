export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface AdditionalInfo {
  gender: string;
  documentType: string;
  documentNumber: string;
}

export interface SubscriptionData {
  contactData?: ContactData;
  selectedPlan?: Plan;
  additionalInfo?: AdditionalInfo;
  termsAccepted?: boolean;
  businessName?: string;
  businessLogo?: string;
}
