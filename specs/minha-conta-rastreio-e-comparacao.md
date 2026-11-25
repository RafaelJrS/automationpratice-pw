# Plano de Testes: Passo 5 — Minha Conta, Rastreio de Pedido e Comparação de Produtos

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Validar os fluxos de **Minha Conta (`/my-account`)** incluindo navegação pelas abas e Logout, **Rastreio de Pedido (`/order-tracking`)** e **Comparação de Produtos (`/compare`)** (adição, bloqueio de duplicidade, mover para o carrinho e remoção total).

---

## Parte A: Fluxos de Minha Conta (`My Account`) e Logout

### Cenário 1: Navegar pelas abas do painel Minha Conta e acessar detalhes da conta
**Estado Inicial:** Usuário realiza login válido (`/login`) e é redirecionado para `/my-account`.
**Passos:**
1. Navegar pela aba `Orders` (`/my-account/customer-order`) e validar a presença da tabela de pedidos (`#78153`).
2. Navegar pela aba `Downloads` (`/my-account/customer-download`).
3. Navegar pela aba `Addresses` (`/my-account/customer-address`).
4. Navegar pela aba `Account details` (`/my-account/customer-account-details`) e validar o botão `Update Account`.
**Critério de Sucesso:**
- Todas as abas carregam corretamente com suas URLs e elementos de negócio visíveis.

### Cenário 2: Realizar Logout com sucesso a partir do painel Minha Conta
**Estado Inicial:** Usuário autenticado na página `/my-account`.
**Passos:**
1. Clicar na opção `logout` no menu lateral do painel `My Account`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Logout Sucessfull` e mensagem `Thank You`.
- Redirecionamento automático para `/login`.

---

## Parte B: Fluxo de Rastreio de Pedido (`Order Tracking`)

### Cenário 3: Rastrear um pedido informando Order ID e Billing Email com sucesso
**Estado Inicial:** Usuário na tela `/order-tracking`.
**Passos:**
1. Preencher o campo `Order ID` (`#order_ID`) com um código de pedido (`#78153`).
2. Preencher o campo `Billing Email` (`#billing_email`) com o e-mail de cobrança (`rafael.qa@qazando.com`).
3. Clicar no botão `Track`.
**Critério de Sucesso:**
- Redirecionamento para `/order-complete` e exibição da mensagem `Your order is completed!`.

---

## Parte C: Fluxos de Comparação de Produtos (`Compare`)

### Cenário 4: Adicionar um novo produto à lista de Comparação com sucesso
**Estado Inicial:** Usuário acessa a página de detalhes do produto ID 3 (`/product-details-one/3` — `V-Neck Dress`, que não está na lista inicial de comparação).
**Passos:**
1. Clicar no link `Add To Compare`.
2. Validar o modal SweetAlert2 com título `Success!` e mensagem `Successfully added to Compare List`.
3. Navegar via link SPA do rodapé (`Compare`) para `/compare`.
**Critério de Sucesso:**
- O produto `V-Neck Dress` deve estar visível na tabela de comparação (`#compare_area table`).

### Cenário 5: Impedir adição duplicada de um produto já existente na Comparação (`Already Added in Compare List`)
**Estado Inicial:** Usuário acessa `/product-details-one/1` (`Green Dress For Woman`, que já faz parte dos 2 itens iniciais da lista de comparação).
**Passos:**
1. Clicar no link `Add To Compare`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Failed!` e mensagem `Already Added in Compare List`.

### Cenário 6: Mover produto da Comparação para o Carrinho e esvaziar a lista de Comparação (`PRODUCT NOT FOUND`)
**Estado Inicial:** Usuário acessa `/compare` (que inicia com 2 produtos padrão: `Green Dress For Woman` e `T-Shirt For Men`).
**Passos:**
1. Clicar no botão `ADD TO CART` do primeiro produto (`Green Dress For Woman`) na tabela de comparação e validar que ele é removido da comparação.
2. Clicar no botão de lixeira (`i.fa-trash`) do produto restante (`T-Shirt For Men`) para esvaziar a lista.
**Critério de Sucesso:**
- Exibição da seção `#empty_cart_area` com o título `PRODUCT NOT FOUND` e subtítulo `Sorry Mate... No Item Found Inside Your Compare List!`.
