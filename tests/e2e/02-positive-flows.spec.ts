// spec: specs/fluxos-positivos-e2e.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import {
  createRandomBilling,
  createRandomUser,
  sampleProduct,
  validUser,
} from '../../test-data';

test.describe('Passo 2 - Fluxos Positivos End-to-End (E-commerce Automation Practice)', { tag: ['@regression', '@positive'] }, () => {
  test('Cenário 1: Deve realizar cadastro de novo usuário com sucesso', async ({
    homePage,
    registerPage,
  }) => {
    const dynamicUser = createRandomUser();

    await test.step('Acessar a página inicial e navegar para Cadastro', async () => {
      await homePage.goto();
      await homePage.goToRegister();
    });

    await test.step('Preencher dados válidos dinâmicos (Faker) e submeter cadastro', async () => {
      await registerPage.registerUser(dynamicUser.name, dynamicUser.email, dynamicUser.password);
    });

    await test.step('Validar modal "Cadastro realizado!" e redirecionamento para /my-account', async () => {
      await registerPage.expectRegisterSuccess(dynamicUser.name);
    });
  });

  test('Cenário 2: Deve realizar login de usuário com sucesso', { tag: '@smoke' }, async ({
    homePage,
    loginPage,
  }) => {
    await test.step('Acessar a página inicial e navegar para Login', async () => {
      await homePage.goto();
      await homePage.goToLogin();
    });

    await test.step('Autenticar com credenciais válidas', async () => {
      await loginPage.login(validUser.email, validUser.password);
    });

    await test.step('Validar modal "Login realizado" e redirecionamento para /my-account', async () => {
      await loginPage.expectLoginSuccess(validUser.email);
    });
  });

  test('Cenário 3: Deve adicionar um produto ao carrinho e validar mensagem de sucesso', { tag: '@smoke' }, async ({
    productPage,
    cartPage,
  }) => {
    await test.step('Acessar página de detalhes do produto', async () => {
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);
    });

    await test.step('Adicionar produto ao carrinho e confirmar modal de sucesso', async () => {
      await productPage.addToCartAndExpectSuccess();
    });

    await test.step('Navegar para o carrinho e validar item listado', async () => {
      await cartPage.goto();
      await cartPage.expectProductInCart(sampleProduct.name);
    });
  });

  test('Cenário 4: Jornada Completa E2E (Login -> Produto -> Carrinho -> Checkout -> Pedido Concluído)', { tag: '@smoke' }, async ({
    loginPage,
    productPage,
    cartPage,
    checkoutPage,
  }) => {
    const dynamicBilling = createRandomBilling();

    await test.step('1. Autenticar usuário no sistema', async () => {
      await loginPage.goto();
      await loginPage.login(validUser.email, validUser.password);
      await loginPage.expectLoginSuccess(validUser.email);
    });

    await test.step('2. Selecionar produto e adicionar ao carrinho', async () => {
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);
      await productPage.addToCartAndExpectSuccess();
    });

    await test.step('3. Validar produto no carrinho e prosseguir para o Checkout', async () => {
      await cartPage.goto();
      await cartPage.expectProductInCart(sampleProduct.name);
      await cartPage.proceedToCheckout();
    });

    await test.step('4. Preencher e salvar Billings Information dinâmico (Faker)', async () => {
      await checkoutPage.fillAndSaveBillingInformation(dynamicBilling);
      await checkoutPage.expectBillingSavedSuccess();
    });

    await test.step('5. Finalizar pedido e validar modal "Order success!"', async () => {
      await checkoutPage.placeOrderAndExpectSuccess();
    });
  });

  test('Cenário 5: Deve realizar inscrição na Newsletter com sucesso', async ({ homePage }) => {
    await test.step('Acessar a página inicial', async () => {
      await homePage.goto();
    });

    await test.step('Enviar e-mail na Newsletter e validar modal de sucesso', async () => {
      await homePage.subscribeNewsletter(validUser.email);
      await homePage.expectNewsletterSuccess();
    });
  });
});
