export interface UserCredentials {
  name: string;
  email: string;
  password: string;
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  fullAddress: string;
  additionalNotes: string;
}

export interface ProductRef {
  id: number;
  name: string;
}
