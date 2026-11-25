# Plano de Testes: Passo 6 — Carrinho Avançado, Catálogo/Variações de Produto e Produto Inexistente

## Contexto da Aplicação
- **URL Base:** `https://automationpratice.com.br`
- **Objetivo:** Validar cenários avançados de cálculo dinâmico de quantidades/totais no carrinho (`/cart` e `/cartTwo`), interação pelo Mini-Carrinho lateral (Offcanvas Drawer), ordenação e Quick View na vitrine da loja (`/shop`), seleção de variações de produto (Tamanho, Cor e aumento de quantidade) e tratamento de erro para produto inexistente (`/product-details-one/99999`).

---

## Parte A: Carrinho Avançado e Mini-Carrinho Lateral (Offcanvas)

### Cenário 1: Alteração de quantidade e recálculo matemático dinâmico do Total na tabela do Carrinho (`/cart`)
**Estado Inicial:** Usuário acessa `/cart` (onde o item `Fit-Flare Dress` custa `$52.00` com quantidade `1` e total `$52.00`).
**Passos:**
1. Alterar o campo numérico de quantidade do produto `Fit-Flare Dress` para `3`.
**Critério de Sucesso:**
- A coluna `Total` da linha do produto `Fit-Flare Dress` deve atualizar imediatamente para `$156.00`.

### Cenário 2: Interação pelo Mini-Carrinho Lateral (Offcanvas Drawer) — Remoção de item, atualização do Subtotal e navegação para Checkout
**Estado Inicial:** Usuário na página inicial (`/`), onde o mini-carrinho lateral inicia com 3 itens e Subtotal `$107.00`.
**Passos:**
1. Clicar no ícone da sacola no cabeçalho para abrir o drawer `#offcanvas-add-cart`.
2. Validar que o título `Shopping Cart` e o Subtotal inicial `$107.00` estão visíveis.
3. Clicar no botão de excluir (`a.offcanvas-wishlist-item-delete`) do item `Fit-Flare Dress` (`$52`).
4. Validar que o Subtotal no drawer atualiza para `$55.00` e clicar no botão `Checkout` do drawer.
**Critério de Sucesso:**
- O item `Fit-Flare Dress` é removido do drawer, o Subtotal passa a ser `$55.00` e o usuário é direcionado para `/checkout-one`.

### Cenário 3: Incremento de quantidade pelo botão `+` e recálculo no Layout Cart View Two (`/cartTwo`)
**Estado Inicial:** Usuário acessa `/cartTwo`.
**Passos:**
1. Localizar a linha do produto `Midi Dress` (preço unitário `$14.00`, quantidade `1`).
2. Clicar no botão `+` (`i.fa-plus`) na coluna Quantity.
**Critério de Sucesso:**
- O input de quantidade passa para `2` e o total da linha atualiza para `$28.00`.

---

## Parte B: Catálogo da Loja (`/shop`), Variações de Produto e Produto Inexistente

### Cenário 4: Ordenação de produtos, abertura do modal Quick View e adição ao carrinho direto pela vitrine (`/shop`)
**Estado Inicial:** Usuário acessa `/shop`.
**Passos:**
1. Selecionar a opção `Price: Low to High` no filtro de ordenação (`Sort By`).
2. Clicar no botão `Add to cart` do primeiro card de produto da vitrine.
3. Validar o modal `Success!` / `Successfully added to your Cart`.
**Critério de Sucesso:**
- Filtro aplicado na vitrine e produto adicionado ao carrinho diretamente pelo card do catálogo.

### Cenário 5: Seleção de Variações do Produto (Tamanho, Cor e incremento de quantidade `+`) na página de detalhes (`/product-details-one/1`)
**Estado Inicial:** Usuário acessa `/product-details-one/1` (`Green Dress For Woman`).
**Passos:**
1. Selecionar o tamanho `XL` no dropdown `select.customs_sel_box`.
2. Selecionar a variação de cor `Green` (`#modal-product-color-green3`).
3. Clicar no botão `+` para aumentar a quantidade de `1` para `2`.
4. Clicar em `Add To Cart`.
**Critério de Sucesso:**
- O tamanho selecionado é `xl`, o radio de cor `Green` fica marcado, o campo de quantidade exibe `2` e o modal `Success!` confirma a adição ao carrinho.

### Cenário 6: Tratamento de erro ao acessar ID de Produto Inexistente (`/product-details-one/99999`)
**Estado Inicial:** Usuário navega para uma URL de produto com ID inexistente (`/product-details-one/99999`).
**Passos:**
1. Aguardar a renderização da tela de fallback de produto não encontrado.
**Critério de Sucesso:**
- Exibição do título `PRODUCT NOT FOUND`, subtítulo `Sorry Mate... No Item Found according to Your query!` e botão `Continue Shopping` direcionando para `/shop`.
