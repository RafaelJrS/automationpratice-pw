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

export const validUser: UserCredentials = {
  name: process.env.TEST_USER_NAME || 'Rafael QA',
  email: process.env.TEST_USER_EMAIL || 'rafael.qa@qazando.com',
  password: process.env.TEST_USER_PASSWORD || '123456',
};

export const validBilling: BillingDetails = {
  firstName: 'Rafael',
  lastName: 'Silva',
  companyName: 'QAZANDO QA Academy',
  email: 'rafael.qa@qazando.com',
  country: 'usa',
  city: 'Aland Islands',
  zipCode: '01310-100',
  fullAddress: 'Av. Paulista, 1000 - São Paulo/SP',
  additionalNotes: 'Entrega do pedido automatizado E2E via Playwright.',
};

export const sampleProduct = {
  id: 1,
  name: 'Green Dress For Woman',
};
