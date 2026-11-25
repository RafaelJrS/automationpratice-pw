// spec: specs/fluxos-remocao-e-erros.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import {
  defaultCartProducts,
  scenarioData,
  invalidCredentials,
  sampleProduct,
  validUser,
} from '../../test-data';

test.describe('Passo 3 - Fluxos de Remoção do Carrinho e Mensagens de Erro', { tag: ['@regression'] }, () => {
  test.describe('Parte A: Fluxos de Remoção do Carrinho', { tag: ['@cart', '@removal'] }, () => {
    test('Cenário 1: Deve remover um item individual da tabela do carrinho', async ({
      cartPage,
    }) => {
      // 1. Acessar a página do carrinho e validar que o primeiro item padrão está listado
      await cartPage.gotoDirect();
      await cartPage.expectProductInCart(defaultCartProducts.firstItem);

      // 2. Clicar no ícone de lixeira para remover o item "Fit-Flare Dress"
      await cartPage.removeProductFromCart(defaultCartProducts.firstItem);

      // 3. Validar que o item removido não consta mais na tabela e os demais permanecem
      await cartPage.expectProductNotInCart(defaultCartProducts.firstItem);
      await cartPage.expectProductInCart(defaultCartProducts.secondItem);
    });

    test('Cenário 2: Deve limpar todo o carrinho (Clear cart) e exibir mensagem de carrinho vazio', async ({
      cartPage,
    }) => {
      // 1. Acessar o carrinho com itens carregados
      await cartPage.gotoDirect();
      await cartPage.expectProductInCart(defaultCartProducts.firstItem);

      // 2. Clicar no botão "Clear cart"
      await cartPage.clearAllCart();

      // 3. Validar a exibição da mensagem "YOUR CART IS EMPTY" / "Sorry Mate... No Item Found Inside Your Cart!"
      await cartPage.expectEmptyCartMessage(
        scenarioData.cart.emptyTitle,
        scenarioData.cart.emptySubtitle
      );
    });
  });

  test.describe('Parte B: Mensagens de Erro no Login', { tag: ['@auth', '@negative'] }, () => {
    test('Cenário 3: Deve exibir erro "E-mail inválido." ao tentar logar com e-mail vazio ou inválido', async ({
      loginPage,
    }) => {
      // 1. Acessar a página de Login
      await loginPage.goto();

      // 2. Tentar logar com e-mail em formato inválido
      await loginPage.login(invalidCredentials.invalidEmail, validUser.password);

      // 3. Validar mensagem de erro "E-mail inválido."
      await loginPage.expectLoginError(scenarioData.login.invalidEmail);
    });

    test('Cenário 4: Deve exibir erro "Senha inválida." ao tentar logar com senha menor que 6 dígitos', async ({
      loginPage,
    }) => {
      // 1. Acessar a página de Login
      await loginPage.goto();

      // 2. Preencher e-mail válido e senha com menos de 6 dígitos
      await loginPage.login(validUser.email, invalidCredentials.shortPassword);

      // 3. Validar mensagem de erro "Senha inválida."
      await loginPage.expectLoginError(scenarioData.login.invalidPassword);
    });
  });

  test.describe('Parte C: Mensagens de Erro no Cadastro de Usuário', { tag: ['@auth', '@negative'] }, () => {
    test('Cenário 5: Deve exibir erro quando o campo Nome estiver vazio no Cadastro', async ({
      registerPage,
    }) => {
      // 1. Acessar a página de Cadastro
      await registerPage.goto();

      // 2. Tentar cadastrar deixando o campo Nome em branco
      await registerPage.registerUser('', validUser.email, validUser.password);

      // 3. Validar mensagem "O campo nome deve ser prenchido"
      await registerPage.expectRegisterError(scenarioData.register.emptyName);
    });

    test('Cenário 6: Deve exibir erro quando o campo E-mail for inválido no Cadastro', async ({
      registerPage,
    }) => {
      // 1. Acessar a página de Cadastro
      await registerPage.goto();

      // 2. Preencher Nome válido e E-mail inválido
      await registerPage.registerUser(
        validUser.name,
        invalidCredentials.invalidEmail,
        validUser.password
      );

      // 3. Validar mensagem "O campo e-mail deve ser prenchido corretamente"
      await registerPage.expectRegisterError(scenarioData.register.invalidEmail);
    });

    test('Cenário 7: Deve exibir erro quando a Senha tiver menos de 6 dígitos no Cadastro', async ({
      registerPage,
    }) => {
      // 1. Acessar a página de Cadastro
      await registerPage.goto();

      // 2. Preencher Nome e E-mail válidos, mas Senha curta (menos de 6 caracteres)
      await registerPage.registerUser(
        validUser.name,
        validUser.email,
        invalidCredentials.shortPassword
      );

      // 3. Validar mensagem "O campo senha deve ter pelo menos 6 dígitos"
      await registerPage.expectRegisterError(scenarioData.register.shortPassword);
    });
  });

  test.describe('Parte D: Mensagens de Erro em Produto, Cupom e Checkout', { tag: ['@negative'] }, () => {
    test('Cenário 8: Deve exibir modal de erro ao aplicar cupom de desconto inválido no Carrinho', async ({
      cartPage,
    }) => {
      // 1. Acessar a página do carrinho
      await cartPage.gotoDirect();

      // 2. Informar um código de cupom inválido e clicar em "Apply coupon"
      await cartPage.applyCouponAndExpectError(
        invalidCredentials.invalidCoupon,
        scenarioData.cart.invalidCouponTitle,
        scenarioData.cart.invalidCouponText
      );
    });

    test('Cenário 9: Deve exibir alerta ao tentar diminuir quantidade do produto abaixo do mínimo (1)', async ({
      productPage,
    }) => {
      // 1. Acessar a página de detalhes do produto (quantidade padrão = 1)
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);

      // 2. Clicar no botão "-" e validar modal "Sorry!" / "Minimun Quantity Reached"
      await productPage.decreaseQuantityBelowMinimumAndExpectWarning(
        scenarioData.product.minQuantityTitle,
        scenarioData.product.minQuantityText
      );
    });

    test('Cenário 10: Deve exibir mensagens de erro de campos obrigatórios e bloqueio de pedido no Checkout', async ({
      checkoutPage,
    }) => {
      // 1. Acessar a página de Checkout
      await checkoutPage.goto();

      // 2. Tentar finalizar pedido (Place Order) sem salvar dados de cobrança e validar erro "Preencha os dados de pagamento!"
      await checkoutPage.clickPlaceOrderWithoutBillingAndExpectError(
        scenarioData.checkout.missingBillingBeforeOrder
      );

      // 3. Clicar em "Save" com todos os campos de Billings Information vazios e validar os 9 erros obrigatórios
      await checkoutPage.clickSaveEmptyBillingAndExpectErrors(
        scenarioData.checkout.requiredFields
      );
    });
  });
});
