// spec: specs/edicao-conta-contato-404-e-validacoes.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import {
  scenarioData,
  invalidCredentials,
  validBilling,
} from '../../test-data';

test.describe('Passo 7 - Edição de Conta, Validações Negativas de Checkout/Formulários, Contato e 404', { tag: ['@regression'] }, () => {
  test.describe('Parte A: Edição de Conta (/account-edit) — Positivo e Negativo', { tag: ['@account'] }, () => {
    test('Cenário 1: Deve atualizar informações cadastrais e senha em /account-edit com sucesso', async ({
      accountEditPage,
    }) => {
      await accountEditPage.goto();
      await accountEditPage.fillAndUpdateAccount(
        scenarioData.accountEditAndContact.firstName,
        scenarioData.accountEditAndContact.lastName,
        scenarioData.accountEditAndContact.email,
        scenarioData.accountEditAndContact.currentPass,
        scenarioData.accountEditAndContact.newPass
      );
    });

    test('Cenário 2: Deve bloquear submissão de /account-edit quando os campos obrigatórios estiverem vazios', async ({
      accountEditPage,
    }) => {
      await accountEditPage.goto();
      await accountEditPage.submitEmptyAndExpectBlocked();
    });
  });

  test.describe('Parte B: Checkout — Validação Negativa de E-mail e Métodos de Pagamento (/checkout-one)', { tag: ['@checkout', '@negative'] }, () => {
    test('Cenário 3: Deve exibir erro específico de e-mail inválido no Checkout mesmo com demais campos preenchidos', async ({
      checkoutPage,
    }) => {
      await checkoutPage.goto();
      await checkoutPage.fillAndSaveBillingInformation({
        ...validBilling,
        email: invalidCredentials.invalidEmail,
      });
      await checkoutPage.expectInvalidEmailErrorOnly(
        scenarioData.accountEditAndContact.checkoutInvalidEmailError
      );
    });

    test('Cenário 4: Deve selecionar métodos de pagamento alternativos (Mobile Banking e Paypal) e concluir pedido', async ({
      checkoutPage,
    }) => {
      await test.step('Acessar Checkout e salvar Billings Information válido', async () => {
        await checkoutPage.goto();
        await checkoutPage.fillAndSaveBillingInformation(validBilling);
        await checkoutPage.expectBillingSavedSuccess();
      });

      await test.step('Alternar métodos de pagamento e concluir pedido', async () => {
        await checkoutPage.selectAlternativePaymentMethodsAndPlaceOrder();
      });
    });
  });

  test.describe('Parte C: Fale Conosco (/contact-two), Bloqueio no Order Tracking e Página 404 (/error)', { tag: ['@contact', '@negative'] }, () => {
    test('Cenário 5: Deve bloquear envio vazio e enviar mensagem de contato com sucesso em Contact Us (/contact-two)', async ({
      contactPage,
    }) => {
      await test.step('Acessar Contact Us e validar bloqueio de envio vazio', async () => {
        await contactPage.goto();
        await contactPage.submitEmptyAndExpectBlocked();
      });

      await test.step('Preencher formulário de contato e validar modal "Thank You"', async () => {
        await contactPage.fillAndSubmitContactForm(
          scenarioData.accountEditAndContact.firstName,
          scenarioData.accountEditAndContact.email,
          scenarioData.accountEditAndContact.phone,
          scenarioData.accountEditAndContact.subject,
          scenarioData.accountEditAndContact.message,
          scenarioData.accountEditAndContact.contactSuccessTitle,
          scenarioData.accountEditAndContact.contactSuccessText
        );
      });
    });

    test('Cenário 6: Deve bloquear rastreio de pedido vazio e validar Página 404 (/error) com retorno à Home', async ({
      orderTrackingPage,
      error404Page,
    }) => {
      await test.step('Validar bloqueio de rastreio vazio em /order-tracking', async () => {
        await orderTrackingPage.goto();
        await orderTrackingPage.submitEmptyTrackingAndExpectBlocked();
      });

      await test.step('Validar página 404 e retorno à Home', async () => {
        await error404Page.goto();
        await error404Page.expect404PageAndReturnHome(
          scenarioData.accountEditAndContact.error404Title,
          scenarioData.accountEditAndContact.error404Subtitle
        );
      });
    });
  });
});
