// spec: specs/minha-conta-rastreio-e-comparacao.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import {
  defaultCompareProducts,
  scenarioData,
  newCompareProduct,
  sampleProduct,
  validUser,
} from '../../test-data';

test.describe('Passo 5 - Minha Conta, Rastreio de Pedido e Comparação de Produtos', { tag: ['@regression'] }, () => {
  test.describe('Parte A: Fluxos de Minha Conta (My Account) e Logout', { tag: ['@account'] }, () => {
    test('Cenário 1: Deve navegar pelas abas de Minha Conta (Orders, Downloads, Addresses e Account Details)', async ({
      loginPage,
      myAccountPage,
    }) => {
      await test.step('Realizar login válido para acessar o painel /my-account', async () => {
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await loginPage.expectLoginSuccess(validUser.email);
      });

      await test.step('Navegar pelas abas Orders, Downloads, Addresses e Account details', async () => {
        await myAccountPage.navigateToOrdersAndExpectLoaded();
        await myAccountPage.navigateToDownloads();
        await myAccountPage.navigateToAddresses();
        await myAccountPage.navigateToAccountDetailsAndExpectLoaded();
      });
    });

    test('Cenário 2: Deve realizar Logout com sucesso a partir do painel Minha Conta', async ({
      loginPage,
      myAccountPage,
    }) => {
      await test.step('Realizar login válido no sistema', async () => {
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await loginPage.expectLoginSuccess(validUser.email);
      });

      await test.step('Acionar logout e validar retorno para /login', async () => {
        await myAccountPage.logoutAndExpectSuccess(
          scenarioData.myAccount.logoutTitle,
          scenarioData.myAccount.logoutText
        );
      });
    });
  });

  test.describe('Parte B: Fluxo de Rastreio de Pedido (Order Tracking)', { tag: ['@tracking'] }, () => {
    test('Cenário 3: Deve rastrear um pedido informando Order ID e Billing Email com sucesso', async ({
      orderTrackingPage,
    }) => {
      await orderTrackingPage.goto();
      await orderTrackingPage.trackOrderAndExpectCompleted(
        scenarioData.orderTracking.orderId,
        scenarioData.orderTracking.billingEmail,
        scenarioData.orderTracking.completedHeading
      );
    });
  });

  test.describe('Parte C: Fluxos de Comparação de Produtos (Compare)', { tag: ['@compare'] }, () => {
    test('Cenário 4: Deve adicionar um novo produto à lista de Comparação e validar na tabela', async ({
      productPage,
      comparePage,
    }) => {
      await test.step('Acessar produto e adicionar à lista de Comparação', async () => {
        await productPage.gotoProduct(newCompareProduct.id);
        await productPage.expectProductLoaded(newCompareProduct.name);
        await productPage.addToCompareAndExpectModal(
          scenarioData.compare.addedTitle,
          scenarioData.compare.addedText
        );
      });

      await test.step('Navegar para /compare e validar produto na tabela', async () => {
        await comparePage.goto();
        await comparePage.expectProductInCompare(newCompareProduct.name);
      });
    });

    test('Cenário 5: Deve exibir erro "Already Added in Compare List" ao adicionar produto já existente na Comparação', async ({
      productPage,
    }) => {
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);
      await productPage.addToCompareAndExpectModal(
        scenarioData.compare.duplicateTitle,
        scenarioData.compare.duplicateText
      );
    });

    test('Cenário 6: Deve mover item da Comparação para o Carrinho e esvaziar a lista de Comparação', async ({
      comparePage,
    }) => {
      await test.step('Acessar /compare com os 2 produtos padrão', async () => {
        await comparePage.gotoDirect();
        await comparePage.expectProductInCompare(defaultCompareProducts.firstItem);
        await comparePage.expectProductInCompare(defaultCompareProducts.secondItem);
      });

      await test.step('Mover primeiro item para o carrinho', async () => {
        await comparePage.moveFirstCompareProductToCart();
        await comparePage.expectProductNotInCompare(defaultCompareProducts.firstItem);
      });

      await test.step('Excluir item restante e validar estado vazio', async () => {
        await comparePage.deleteRemainingCompareProduct();
        await comparePage.expectEmptyCompareMessage(
          scenarioData.compare.emptyTitle,
          scenarioData.compare.emptySubtitle
        );
      });
    });
  });
});
