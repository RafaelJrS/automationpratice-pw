# Plano de Testes: Passo 4 — Wishlist (Favoritos) e Busca de Produtos

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Validar todos os fluxos positivos, de erro/duplicidade e de remoção da **Lista de Desejos (Wishlist / Favoritos)**, bem como o fluxo de **Busca de Produtos (Search Modal)**.

---

## Parte A: Fluxos da Wishlist (Lista de Desejos / Favoritos)

### Cenário 1: Adicionar um novo produto à Wishlist com sucesso e validar na tabela de Favoritos
**Estado Inicial:** Usuário na tela de detalhes do produto (`/product-details-one/1` — `Green Dress For Woman`).
**Passos:**
1. Clicar no link `Add To Wishlist`.
2. Validar o modal SweetAlert2 com título `Success` e mensagem `Added to Wishlist` e clicar em `OK`.
3. Navegar via link SPA do rodapé (`Wishlist`) para `/wishlist`.
**Critério de Sucesso:**
- O produto `Green Dress For Woman` deve estar visível na tabela da Wishlist (`#Wishlist_area table`).

### Cenário 2: Impedir adição duplicada de um mesmo produto na Wishlist (Mensagem de erro `Already Added in Wishlist`)
**Estado Inicial:** Usuário na tela de detalhes do produto (`/product-details-one/1`).
**Passos:**
1. Clicar em `Add To Wishlist` pela primeira vez e confirmar o modal `Success` / `Added to Wishlist` clicando em `OK`.
2. Clicar novamente em `Add To Wishlist` para o mesmo produto.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 de falha com título `Failed` e mensagem `Already Added in Wishlist`.

### Cenário 3: Mover um produto da Wishlist diretamente para o Carrinho (`Add to cart`)
**Estado Inicial:** Usuário acessa `/wishlist` (que inicia com 4 itens padrão: `Boho Tops for Girls`, `Skater Dress`, `Rocking Chair`, `Easy Chair`).
**Passos:**
1. Localizar a linha do produto `Boho Tops for Girls` na tabela da Wishlist.
2. Clicar no botão `Add to cart` dessa linha.
3. Validar o modal `Success!` / `Successfully added to your Cart`.
4. Verificar que o item `Boho Tops for Girls` foi removido automaticamente da Wishlist e adicionado à tabela do Carrinho (`/cart`).
**Critério de Sucesso:**
- Produto removido da Wishlist e presente na tabela do Carrinho (`/cart`).

### Cenário 4: Remover um item individual da Wishlist
**Estado Inicial:** Usuário na página `/wishlist`.
**Passos:**
1. Validar que o produto `Skater Dress` está na tabela da Wishlist.
2. Clicar no ícone de lixeira (`i.fa-trash`) na linha do produto `Skater Dress`.
**Critério de Sucesso:**
- O produto `Skater Dress` não deve mais constar na tabela da Wishlist, enquanto os demais itens permanecem.

### Cenário 5: Remover todos os itens da Wishlist e validar mensagem de lista vazia (`YOUR WISHLIST IS EMPTY`)
**Estado Inicial:** Usuário na página `/wishlist` com os 4 produtos padrão.
**Passos:**
1. Clicar no ícone de lixeira (`i.fa-trash`) de todos os itens presentes na tabela da Wishlist até esvaziá-la.
**Critério de Sucesso:**
- A tabela desaparece e a página exibe a seção `#empty_cart_area` com o título `YOUR WISHLIST IS EMPTY`.

---

## Parte B: Fluxo de Busca de Produtos (Search Modal)

### Cenário 6: Realizar busca de produtos por palavra-chave no Search Modal com sucesso
**Estado Inicial:** Usuário na página inicial (`/`).
**Passos:**
1. Clicar no ícone de lupa (`a.search_width`) no cabeçalho para abrir o modal de busca (`#search`).
2. Digitar a palavra-chave (`Dress`) no campo `type keyword(s) here` e clicar no botão `Search`.
**Critério de Sucesso:**
- Exibição do modal SweetAlert2 com título `Success` e mensagem `Check out the Results`.
- Redirecionamento automático para o catálogo da loja (`/shop`).
