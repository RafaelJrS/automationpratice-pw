# Plano de Testes: Fluxos Positivos End-to-End (E-commerce Automation Practice)

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Validar todos os fluxos positivos (Happy Paths) e jornadas de ponta a ponta (E2E) do e-commerce QAZANDO Shop, garantindo a exibição correta das mensagens de sucesso em cada etapa.

---

## Cenário 1: Cadastro de Novo Usuário com Sucesso
**Estado Inicial:** Usuário na página inicial (`/`).
**Passos:**
1. Clicar no link `Cadastro` no cabeçalho para acessar `/register`.
2. Preencher os campos obrigatórios:
   - Nome (`#user`)
   - E-mail válido (`#email`)
   - Senha com pelo menos 6 dígitos (`#password`)
3. Clicar no botão `Cadastrar` (`#btnRegister`).
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Cadastro realizado!` e mensagem `Bem-vindo <Nome>`.
- Redirecionamento para `/my-account`.

---

## Cenário 2: Login de Usuário com Sucesso
**Estado Inicial:** Usuário na página inicial (`/`).
**Passos:**
1. Clicar no link `Login` no cabeçalho para acessar `/login`.
2. Preencher o campo E-mail (`#user`) com um e-mail válido e Senha (`#password`) com pelo menos 6 caracteres.
3. Clicar no botão `login` (`#btnLogin`).
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Login realizado` e mensagem `Olá, <E-mail>`.
- Redirecionamento para `/my-account`.

---

## Cenário 3: Adição de Produto ao Carrinho e Validação no Carrinho
**Estado Inicial:** Usuário acessando a página de detalhes de um produto (`/product-details-one/1`).
**Passos:**
1. Validar que o título do produto (`Green Dress For Woman`) está visível.
2. Clicar no botão `Add To Cart`.
3. Validar o modal SweetAlert2 de confirmação (`Success!` / `Successfully added to your Cart`).
4. Navegar para o carrinho (`/cart`) e verificar que o produto adicionado consta na tabela do carrinho.
**Critério de Sucesso:**
- Modal de adição ao carrinho exibido com sucesso e item listado na tabela do carrinho (`/cart`).

---

## Cenário 4: Jornada Completa End-to-End (Login -> Produto -> Carrinho -> Checkout -> Pedido Concluído)
**Estado Inicial:** Usuário na página inicial (`/`).
**Passos:**
1. Realizar login válido em `/login` e confirmar o modal `Login realizado`.
2. Acessar um produto do catálogo (`/product-details-one/1`) e adicioná-lo ao carrinho (`Add To Cart`), confirmando a mensagem `Success!`.
3. Acessar o carrinho (`/cart`), validar a presença do item na tabela e clicar em `Proceed to Checkout` (`/checkout-one`).
4. Preencher todos os dados obrigatórios de **Billings Information** (`First name`, `Last name`, `Company Name`, `Email Address`, `Country`, `State/City`, `Zip Code`, `Full Address`, `Additional Notes`) e clicar em `Save`.
5. Validar a mensagem de sucesso de faturamento: `Billings Information registred with success!`.
6. Selecionar a forma de pagamento e clicar em `Place Order`.
**Critério de Sucesso:**
- Exibição da mensagem `Billings Information registred with success!` ao salvar os dados de cobrança.
- Exibição do modal final de confirmação do pedido com título `Order success!` e subtítulo `Congrats! Your order was created with sucess!`.

---

## Cenário 5: Inscrição na Newsletter com Sucesso
**Estado Inicial:** Usuário na página inicial (`/`).
**Passos:**
1. Localizar a seção `NEWSLETTER` no rodapé da página.
2. Preencher o campo `Your Mail` com um e-mail válido e clicar em `Send Mail`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Success` e mensagem `Thank you for your Subscribtion`.
