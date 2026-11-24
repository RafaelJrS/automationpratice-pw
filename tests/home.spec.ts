import { test } from '../fixtures/pom.fixture';

test.describe('Passo 1 - Acesso inicial ao site Automation Practice', () => {
  test('Deve acessar a página inicial com sucesso', async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectHomeLoaded();
  });
});
