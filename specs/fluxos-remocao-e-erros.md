# Plano de Testes: Passo 3 — Fluxos de Remoção e Mensagens de Erro (E-commerce Automation Practice)

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Validar os fluxos de remoção de itens do carrinho (remoção individual e esvaziamento completo) e todas as mensagens de erro e bloqueios de validação nas telas de **Login**, **Cadastro**, **Detalhes do Produto**, **Carrinho (Cupom)** e **Checkout (Faturamento e Pagamento)**.

---

## Parte A: Fluxos de Remoção do Carrinho (`/cart`)

### Cenário 1: Remoção individual de um produto da tabela do carrinho
**Estado Inicial:** Usuário acessa `/cart` (que inicia com 3 produtos padrão no estado Redux: `Fit-Flare Dress`, `Midi Dress`, `Tulip Dress`).
**Passos:**
1. Verificar que o produto `Fit-Flare Dress` está visível na tabela do carrinho.
2. Clicar no ícone de lixeira (`i.fa-trash`) na linha do produto `Fit-Flare Dress`.
**Critério de Sucesso:**
- O produto `Fit-Flare Dress` não deve mais estar visível na tabela do carrinho, enquanto os demais itens (`Midi Dress` e `Tulip Dress`) permanecem listados.

### Cenário 2: Limpar todo o carrinho (`Clear cart`) e validar mensagem de carrinho vazio
**Estado Inicial:** Usuário acessa `/cart` com itens na tabela.
**Passos:**
1. Clicar no botão `Clear cart`.
**Critério de Sucesso:**
- A tabela do carrinho desaparece e o sistema exibe a seção `#empty_cart_area` com o título `YOUR CART IS EMPTY` e subtítulo `Sorry Mate... No Item Found Inside Your Cart!`.

---

## Parte B: Mensagens de Erro — Login (`/login`)

### Cenário 3: Tentativa de Login com e-mail vazio ou inválido
**Estado Inicial:** Usuário na tela `/login`.
**Passos:**
1. Clicar diretamente em `login` (`#btnLogin`) com o e-mail vazio, ou preencher um e-mail com formato inválido (`email_invalido`) e clicar em `login`.
**Critério de Sucesso:**
- O sistema exibe a mensagem de erro `E-mail inválido.` (`.invalid_input`).

### Cenário 4: Tentativa de Login com e-mail válido e senha inválida (menos de 6 dígitos ou vazia)
**Estado Inicial:** Usuário na tela `/login`.
**Passos:**
1. Preencher um e-mail válido (`rafael.qa@qazando.com`) e uma senha curta (`123`).
2. Clicar no botão `login` (`#btnLogin`).
**Critério de Sucesso:**
- O sistema exibe a mensagem de erro `Senha inválida.` (`.invalid_input`).

---

## Parte C: Mensagens de Erro — Cadastro de Usuário (`/register`)

### Cenário 5: Tentativa de Cadastro com campo Nome vazio
**Estado Inicial:** Usuário na tela `/register`.
**Passos:**
1. Deixar o campo Nome (`#user`) vazio e clicar em `Cadastrar` (`#btnRegister`).
**Critério de Sucesso:**
- O sistema exibe a mensagem de erro `O campo nome deve ser prenchido` (`#errorMessageFirstName`).

### Cenário 6: Tentativa de Cadastro com Nome preenchido e E-mail inválido/vazio
**Estado Inicial:** Usuário na tela `/register`.
**Passos:**
1. Preencher o campo Nome (`Rafael QA`), informar um e-mail inválido (`rafael@invalido`) e clicar em `Cadastrar` (`#btnRegister`).
**Critério de Sucesso:**
- O sistema exibe a mensagem de erro `O campo e-mail deve ser prenchido corretamente` (`#errorMessageFirstName`).

### Cenário 7: Tentativa de Cadastro com Nome e E-mail válidos, mas Senha com menos de 6 dígitos
**Estado Inicial:** Usuário na tela `/register`.
**Passos:**
1. Preencher Nome (`Rafael QA`), E-mail válido (`rafael.qa@qazando.com`) e Senha com 5 dígitos (`12345`).
2. Clicar em `Cadastrar` (`#btnRegister`).
**Critério de Sucesso:**
- O sistema exibe a mensagem de erro `O campo senha deve ter pelo menos 6 dígitos` (`#errorMessageFirstName`).

---

## Parte D: Mensagens de Erro — Produto, Cupom e Checkout

### Cenário 8: Aplicar cupom de desconto inválido no Carrinho (`/cart`)
**Estado Inicial:** Usuário na tela `/cart`.
**Passos:**
1. Preencher o campo `Coupon code` com um código inválido (`CUPOMINVALIDO10`).
2. Clicar no botão `Apply coupon`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Error!!` e mensagem `Invalid Cuppon Code`.

### Cenário 9: Tentar diminuir a quantidade do produto abaixo do mínimo permitido (`/product-details-one/1`)
**Estado Inicial:** Usuário na tela de detalhes do produto (`/product-details-one/1`), onde a quantidade inicial é `1`.
**Passos:**
1. Clicar no botão de diminuir quantidade (`i.fa-minus`).
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 de alerta com título `Sorry!` e mensagem `Minimun Quantity Reached`.

### Cenário 10: Validação de campos obrigatórios em branco e tentativa de finalizar pedido sem salvar faturamento no Checkout (`/checkout-one`)
**Estado Inicial:** Usuário na tela `/checkout-one`.
**Passos:**
1. Clicar diretamente em `Place Order` sem ter salvo as informações de faturamento (`Billings Information`).
2. Validar a mensagem de erro de pagamento/faturamento pendente.
3. Clicar no botão `Save` do formulário `Billings Information` com todos os campos obrigatórios em branco.
**Critério de Sucesso:**
- Ao clicar em `Place Order` sem salvar o faturamento, exibe `Preencha os dados de pagamento!`.
- Ao clicar em `Save` com os campos de faturamento vazios, exibe as mensagens de erro de todos os campos obrigatórios (`O campo First Name deve ser prenchido`, `O campo Last Name deve ser prenchido`, `O campo Company deve ser prenchido`, `O campo E-mail deve ser prenchido ou é inválido`, `O campo Country deve ser prenchido`, `O campo City deve ser prenchido`, `O campo Zip Code deve ser prenchido`, `O campo Address deve ser prenchido`, `O campo Additional Notes deve ser prenchido`).
