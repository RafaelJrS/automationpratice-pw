# Plano de Testes: Passo 7 — Edição de Conta, Validações Negativas de Checkout/Formulários, Contato e 404

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Completar 100% da cobertura funcional E2E (positiva e negativa) cobrindo **Edição de Conta (`/account-edit`)**, **Validação negativa de E-mail inválido no Checkout e seleção de métodos de pagamento (`/checkout-one`)**, **Bloqueio de campos obrigatórios HTML5 (`/account-edit` e `/order-tracking`)**, **Fale Conosco (`/contact-two`)** e **Página 404 (`/error`)**.

---

## Parte A: Edição de Conta (`/account-edit`) — Positivo e Negativo

### Cenário 1: Atualizar informações cadastrais e senha em `/account-edit` com sucesso
**Estado Inicial:** Usuário na tela `/account-edit`.
**Passos:**
1. Preencher os campos obrigatórios:
   - First Name (`#f_name`)
   - Last Name (`input[placeholder="Dhoe"]`)
   - Email Address (`#email_address`)
   - Current Password (`#current_password`)
   - New Password (`#new_password`)
   - Re-type Password (`#re_password`)
2. Clicar no botão `Update Information`.
**Critério de Sucesso:**
- Submissão do formulário e redirecionamento para `/vendor/vendor-profile`.

### Cenário 2: Bloquear submissão de `/account-edit` quando os campos obrigatórios estiverem vazios
**Estado Inicial:** Usuário na tela `/account-edit`.
**Passos:**
1. Clicar diretamente em `Update Information` sem preencher os campos.
**Critério de Sucesso:**
- O navegador bloqueia o envio (HTML5 `:invalid` no `#f_name`) e o usuário permanece em `/account-edit`.

---

## Parte B: Checkout — Validação Negativa de E-mail e Seleção de Métodos de Pagamento (`/checkout-one`)

### Cenário 3: Exibir erro específico de e-mail inválido no Checkout mesmo com os demais campos preenchidos
**Estado Inicial:** Usuário na tela `/checkout-one`.
**Passos:**
1. Preencher todos os campos obrigatórios de `Billings Information`, porém informando um e-mail com formato inválido (`email_invalido_checkout`).
2. Clicar em `Save`.
**Critério de Sucesso:**
- Exibição exclusiva da mensagem de erro `O campo E-mail deve ser prenchido ou é inválido` e não exibição da mensagem de sucesso de faturamento.

### Cenário 4: Selecionar métodos de pagamento alternativos (Mobile Banking e Paypal) e concluir pedido no Checkout
**Estado Inicial:** Usuário na tela `/checkout-one` após preencher e salvar os dados de `Billings Information`.
**Passos:**
1. Selecionar o método de pagamento `Mobile Banking` (`#javascript`) e depois `Paypal` (`#css`).
2. Clicar em `Place Order`.
**Critério de Sucesso:**
- O radio button `Paypal` fica marcado e o pedido é finalizado com o modal `Order success!`.

---

## Parte C: Fale Conosco (`/contact-two`), Bloqueio no Order Tracking (`/order-tracking`) e Página 404 (`/error`)

### Cenário 5: Enviar mensagem de contato na página Contact Us (`/contact-two`) com sucesso e bloquear envio vazio
**Estado Inicial:** Usuário na tela `/contact-two`.
**Passos:**
1. Tentar clicar em `Submit` com os campos vazios e validar bloqueio `:invalid` no campo `Name`.
2. Preencher `Name`, `Email`, `Phone`, `Subject` e `Message` e clicar em `Submit`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Thank You` e mensagem `We Got Your Message`.

### Cenário 6: Validar Página 404 (`/error`) e botão de retorno para a Home, além de bloqueio de rastreio vazio (`/order-tracking`)
**Estado Inicial:** Usuário acessa `/order-tracking` e depois `/error`.
**Passos:**
1. Em `/order-tracking`, clicar em `Track` sem preencher `Order ID` e validar que o campo `#order_ID:invalid` bloqueia o redirecionamento.
2. Navegar para `/error`, validar o título `404` e subtítulo `We are sorry, the page you've requested is not available`.
3. Clicar em `Back To Home Page`.
**Critério de Sucesso:**
- Rastreio vazio permanece em `/order-tracking`, e a página 404 exibe os textos esperados e redireciona o usuário de volta para a Home (`/`).
