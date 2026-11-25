// spec: specs/fluxos-positivos-e2e.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import { sampleProduct, validBilling, validUser } from '../../test-data';

test.describe('Passo 2 - Fluxos Positivos End-to-End (E-commerce Automation Practice)', { tag: ['@regression', '@positive'] }, () => {
  test('Cenário 1: Deve realizar cadastro de novo usuário com sucesso', async ({
    homePage,
    registerPage,
  }) => {
    // 1. Acessar a página inicial e navegar para a tela de Cadastro
    await homePage.goto();
    await homePage.goToRegister();

    // 2. Preencher Nome, E-mail e Senha válidos e submeter o formulário
    await registerPage.registerUser(validUser.name, validUser.email, validUser.password);

    // 3. Validar mensagem de sucesso "Cadastro realizado!" e redirecionamento para /my-account
    await registerPage.expectRegisterSuccess(validUser.name);
  });

  test('Cenário 2: Deve realizar login de usuário com sucesso', { tag: '@smoke' }, async ({
    homePage,
    loginPage,
  }) => {
    // 1. Acessar a página inicial e navegar para a tela de Login
    await homePage.goto();
    await homePage.goToLogin();

    // 2. Preencher E-mail e Senha válidos e clicar em login
    await loginPage.login(validUser.email, validUser.password);

    // 3. Validar mensagem de sucesso "Login realizado" e redirecionamento para /my-account
    await loginPage.expectLoginSuccess(validUser.email);
  });

  test('Cenário 3: Deve adicionar um produto ao carrinho e validar mensagem de sucesso', { tag: '@smoke' }, async ({
    productPage,
    cartPage,
  }) => {
    // 1. Acessar a página de detalhes do produto
    await productPage.gotoProduct(sampleProduct.id);
    await productPage.expectProductLoaded(sampleProduct.name);

    // 2. Clicar em Add To Cart e validar mensagem de sucesso "Successfully added to your Cart"
    await productPage.addToCartAndExpectSuccess();

    // 3. Navegar para o carrinho e verificar que o produto está presente na lista
    await cartPage.goto();
    await cartPage.expectProductInCart(sampleProduct.name);
  });

  test('Cenário 4: Jornada Completa E2E (Login -> Produto -> Carrinho -> Checkout -> Pedido Concluído)', { tag: '@smoke' }, async ({
    loginPage,
    productPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Realizar login válido no sistema
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);
    await loginPage.expectLoginSuccess(validUser.email);

    // 2. Acessar produto e adicionar ao carrinho com validação de sucesso
    await productPage.gotoProduct(sampleProduct.id);
    await productPage.expectProductLoaded(sampleProduct.name);
    await productPage.addToCartAndExpectSuccess();

    // 3. Acessar o carrinho, validar o produto adicionado e prosseguir para o Checkout
    await cartPage.goto();
    await cartPage.expectProductInCart(sampleProduct.name);
    await cartPage.proceedToCheckout();

    // 4. Preencher Billings Information, salvar e validar mensagem "Billings Information registred with success!"
    await checkoutPage.fillAndSaveBillingInformation(validBilling);
    await checkoutPage.expectBillingSavedSuccess();

    // 5. Finalizar pedido (Place Order) e validar modal "Order success!" / "Congrats! Your order was created with sucess!"
    await checkoutPage.placeOrderAndExpectSuccess();
  });

  test('Cenário 5: Deve realizar inscrição na Newsletter com sucesso', async ({ homePage }) => {
    // 1. Acessar a página inicial
    await homePage.goto();

    // 2. Preencher e-mail na seção Newsletter e enviar
    await homePage.subscribeNewsletter(validUser.email);

    // 3. Validar modal de sucesso "Thank you for your Subscribtion"
    await homePage.expectNewsletterSuccess();
  });
});
