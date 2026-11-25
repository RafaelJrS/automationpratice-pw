// spec: specs/minha-conta-rastreio-e-comparacao.md
// seed: tests/seed.spec.ts
import { test } from '../fixtures/pom.fixture';
import {
  defaultCompareProducts,
  errorMessages,
  newCompareProduct,
  sampleProduct,
  validUser,
} from '../test-data/ecommerce.data';

test.describe('Passo 5 - Minha Conta, Rastreio de Pedido e Comparação de Produtos', () => {
  test.describe('Parte A: Fluxos de Minha Conta (My Account) e Logout', () => {
    test('Cenário 1: Deve navegar pelas abas de Minha Conta (Orders, Downloads, Addresses e Account Details)', async ({
      loginPage,
      myAccountPage,
    }) => {
      // 1. Realizar login válido para acessar o painel /my-account
      await loginPage.goto();
      await loginPage.login(validUser.email, validUser.password);
      await loginPage.expectLoginSuccess(validUser.email);

      // 2. Navegar pelas abas Orders, Downloads, Addresses e Account details validando o carregamento
      await myAccountPage.navigateToOrdersAndExpectLoaded();
      await myAccountPage.navigateToDownloads();
      await myAccountPage.navigateToAddresses();
      await myAccountPage.navigateToAccountDetailsAndExpectLoaded();
    });

    test('Cenário 2: Deve realizar Logout com sucesso a partir do painel Minha Conta', async ({
      loginPage,
      myAccountPage,
    }) => {
      // 1. Realizar login válido no sistema
      await loginPage.goto();
      await loginPage.login(validUser.email, validUser.password);
      await loginPage.expectLoginSuccess(validUser.email);

      // 2. Clicar em logout no menu lateral e validar modal "Logout Sucessfull" / "Thank You" e retorno para /login
      await myAccountPage.logoutAndExpectSuccess(
        errorMessages.myAccount.logoutTitle,
        errorMessages.myAccount.logoutText
      );
    });
  });

  test.describe('Parte B: Fluxo de Rastreio de Pedido (Order Tracking)', () => {
    test('Cenário 3: Deve rastrear um pedido informando Order ID e Billing Email com sucesso', async ({
      orderTrackingPage,
    }) => {
      // 1. Acessar a página de rastreio de pedidos (/order-tracking)
      await orderTrackingPage.goto();

      // 2. Preencher Order ID e Billing Email, clicar em Track e validar tela "Your order is completed!"
      await orderTrackingPage.trackOrderAndExpectCompleted(
        errorMessages.orderTracking.orderId,
        errorMessages.orderTracking.billingEmail,
        errorMessages.orderTracking.completedHeading
      );
    });
  });

  test.describe('Parte C: Fluxos de Comparação de Produtos (Compare)', () => {
    test('Cenário 4: Deve adicionar um novo produto à lista de Comparação e validar na tabela', async ({
      productPage,
      comparePage,
    }) => {
      // 1. Acessar produto ainda não incluído na lista de comparação (/product-details-one/3 - V-Neck Dress)
      await productPage.gotoProduct(newCompareProduct.id);
      await productPage.expectProductLoaded(newCompareProduct.name);

      // 2. Clicar em "Add To Compare" e validar modal "Success!" / "Successfully added to Compare List"
      await productPage.addToCompareAndExpectModal(
        errorMessages.compare.addedTitle,
        errorMessages.compare.addedText
      );

      // 3. Navegar para /compare via link SPA do rodapé e validar o produto na tabela
      await comparePage.goto();
      await comparePage.expectProductInCompare(newCompareProduct.name);
    });

    test('Cenário 5: Deve exibir erro "Already Added in Compare List" ao adicionar produto já existente na Comparação', async ({
      productPage,
    }) => {
      // 1. Acessar produto que já consta por padrão na lista de comparação (/product-details-one/1)
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);

      // 2. Clicar em "Add To Compare" e validar modal "Failed!" / "Already Added in Compare List"
      await productPage.addToCompareAndExpectModal(
        errorMessages.compare.duplicateTitle,
        errorMessages.compare.duplicateText
      );
    });

    test('Cenário 6: Deve mover item da Comparação para o Carrinho e esvaziar a lista de Comparação', async ({
      comparePage,
    }) => {
      // 1. Acessar a página de comparação (/compare) com os 2 produtos padrão
      await comparePage.gotoDirect();
      await comparePage.expectProductInCompare(defaultCompareProducts.firstItem);
      await comparePage.expectProductInCompare(defaultCompareProducts.secondItem);

      // 2. Clicar em "ADD TO CART" no primeiro produto e validar que ele saiu da tabela de comparação
      await comparePage.moveFirstCompareProductToCart();
      await comparePage.expectProductNotInCompare(defaultCompareProducts.firstItem);

      // 3. Excluir o produto restante na lixeira e validar mensagem "PRODUCT NOT FOUND" / "Sorry Mate... No Item Found Inside Your Compare List!"
      await comparePage.deleteRemainingCompareProduct();
      await comparePage.expectEmptyCompareMessage(
        errorMessages.compare.emptyTitle,
        errorMessages.compare.emptySubtitle
      );
    });
  });
});
