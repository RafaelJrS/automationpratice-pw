import { faker } from '@faker-js/faker';
import { type UserCredentials } from './types';

/** Usuário válido. Pode ser sobrescrito por variáveis de ambiente (.env / secrets do CI). */
export const validUser: UserCredentials = {
  name: process.env.TEST_USER_NAME || 'Rafael QA',
  email: process.env.TEST_USER_EMAIL || 'rafael.qa@qazando.com',
  password: process.env.TEST_USER_PASSWORD || '123456',
};

/** Gera um usuário único em tempo de execução para evitar colisões em execuções paralelas. */
export function createRandomUser(): UserCredentials {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'qazando.com' }).toLowerCase(),
    password: faker.internet.password({ length: 10 }),
  };
}

/** Entradas inválidas usadas nos cenários negativos. */
export const invalidCredentials = {
  invalidEmail: 'email_invalido_sem_dominio',
  shortPassword: '123',
  invalidCoupon: 'CUPOMINVALIDO10',
};
