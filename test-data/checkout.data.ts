import { faker } from '@faker-js/faker';
import { type BillingDetails } from './types';

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

/** Gera dados dinâmicos de cobrança mantendo opções válidas de Country/City do formulário. */
export function createRandomBilling(): BillingDetails {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    companyName: faker.company.name(),
    email: faker.internet.email({ provider: 'qazando.com' }).toLowerCase(),
    country: 'usa',
    city: 'Aland Islands',
    zipCode: faker.location.zipCode(),
    fullAddress: faker.location.streetAddress(),
    additionalNotes: `Pedido E2E automatizado - ${faker.lorem.sentence()}`,
  };
}
