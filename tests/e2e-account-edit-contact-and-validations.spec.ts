// spec: specs/edicao-conta-contato-404-e-validacoes.md
// seed: tests/seed.spec.ts
import { test } from '../fixtures/pom.fixture';
import {
  errorMessages,
  invalidCredentials,
  validBilling,
} from '../test-data/ecommerce.data';

test.describe('Passo 7 - Edição de Conta, Validações Negativas de Checkout/Formulários, Contato e 404', () => {
  test.describe('Parte A: Edição de Conta (/account-edit) — Positivo e Negativo', () => {
    test('Cenário 1: Deve atualizar informações cadastrais e senha em /account-edit com sucesso', async ({
      accountEditPage,
    }) => {
      // 1. Acessar a página de edição de conta (/account-edit)
      await accountEditPage.goto();

      // 2. Preencher nome, sobrenome, e-mail, senha atual e nova senha e submeter
      await accountEditPage.fillAndUpdateAccount(
        errorMessages.accountEditAndContact.firstName,
        errorMessages.accountEditAndContact.lastName,
        errorMessages.accountEditAndContact.email,
        errorMessages.accountEditAndContact.currentPass,
        errorMessages.accountEditAndContact.newPass
      );
    });

    test('Cenário 2: Deve bloquear submissão de /account-edit quando os campos obrigatórios estiverem vazios', async ({
      accountEditPage,
    }) => {
      // 1. Acessar a página de edição de conta (/account-edit)
      await accountEditPage.goto();

      // 2. Clicar em Update Information sem preencher os campos e validar bloqueio HTML5 (:invalid)
      await accountEditPage.submitEmptyAndExpectBlocked();
    });
  });

  test.describe('Parte B: Checkout — Validação Negativa de E-mail e Métodos de Pagamento (/checkout-one)', () => {
    test('Cenário 3: Deve exibir erro específico de e-mail inválido no Checkout mesmo com demais campos preenchidos', async ({
      checkoutPage,
    }) => {
      // 1. Acessar a página de Checkout (/checkout-one)
      await checkoutPage.goto();

      // 2. Preencher todos os campos obrigatórios com um e-mail inválido e clicar em Save
      await checkoutPage.fillAndSaveBillingInformation({
        ...validBilling,
        email: invalidCredentials.invalidEmail,
      });

      // 3. Validar erro "O campo E-mail deve ser prenchido ou é inválido" e bloqueio do salvamento
      await checkoutPage.expectInvalidEmailErrorOnly(
        errorMessages.accountEditAndContact.checkoutInvalidEmailError
      );
    });

    test('Cenário 4: Deve selecionar métodos de pagamento alternativos (Mobile Banking e Paypal) e concluir pedido', async ({
      checkoutPage,
    }) => {
      // 1. Acessar o Checkout e salvar os dados válidos de Billings Information
      await checkoutPage.goto();
      await checkoutPage.fillAndSaveBillingInformation(validBilling);
      await checkoutPage.expectBillingSavedSuccess();

      // 2. Alternar entre os métodos Mobile Banking e Paypal e finalizar o pedido com sucesso
      await checkoutPage.selectAlternativePaymentMethodsAndPlaceOrder();
    });
  });

  test.describe('Parte C: Fale Conosco (/contact-two), Bloqueio no Order Tracking e Página 404 (/error)', () => {
    test('Cenário 5: Deve bloquear envio vazio e enviar mensagem de contato com sucesso em Contact Us (/contact-two)', async ({
      contactPage,
    }) => {
      // 1. Acessar a página Fale Conosco (/contact-two)
      await contactPage.goto();

      // 2. Tentar enviar formulário vazio e validar bloqueio HTML5 (:invalid)
      await contactPage.submitEmptyAndExpectBlocked();

      // 3. Preencher todos os dados de contato, enviar e validar modal "Thank You" / "We Got Your Message"
      await contactPage.fillAndSubmitContactForm(
        errorMessages.accountEditAndContact.firstName,
        errorMessages.accountEditAndContact.email,
        errorMessages.accountEditAndContact.phone,
        errorMessages.accountEditAndContact.subject,
        errorMessages.accountEditAndContact.message,
        errorMessages.accountEditAndContact.contactSuccessTitle,
        errorMessages.accountEditAndContact.contactSuccessText
      );
    });

    test('Cenário 6: Deve bloquear rastreio de pedido vazio e validar Página 404 (/error) com retorno à Home', async ({
      orderTrackingPage,
      error404Page,
    }) => {
      // 1. Acessar /order-tracking e tentar rastrear com campos vazios validando bloqueio
      await orderTrackingPage.goto();
      await orderTrackingPage.submitEmptyTrackingAndExpectBlocked();

      // 2. Acessar a página 404 (/error), validar mensagens e clicar em "Back To Home Page"
      await error404Page.goto();
      await error404Page.expect404PageAndReturnHome(
        errorMessages.accountEditAndContact.error404Title,
        errorMessages.accountEditAndContact.error404Subtitle
      );
    });
  });
});
