// spec: specs/wishlist-e-busca.md
// seed: tests/seed.spec.ts
import { test } from '../fixtures/pom.fixture';
import {
  defaultWishlistProducts,
  errorMessages,
  sampleProduct,
} from '../test-data/ecommerce.data';

test.describe('Passo 4 - Wishlist (Favoritos) e Busca de Produtos', () => {
  test.describe('Parte A: Fluxos da Wishlist (Lista de Desejos / Favoritos)', () => {
    test('Cenário 1: Deve adicionar um produto à Wishlist com sucesso e validar na lista de Favoritos', async ({
      productPage,
      wishlistPage,
    }) => {
      // 1. Acessar a página de detalhes do produto
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);

      // 2. Clicar em "Add To Wishlist" e validar modal "Success" / "Added to Wishlist"
      await productPage.addToWishlistAndExpectModal(
        errorMessages.wishlist.addedTitle,
        errorMessages.wishlist.addedText
      );

      // 3. Navegar para a Wishlist via SPA e validar que o produto consta na tabela
      await wishlistPage.goto();
      await wishlistPage.expectProductInWishlist(sampleProduct.name);
    });

    test('Cenário 2: Deve exibir erro "Already Added in Wishlist" ao tentar favoritar o mesmo produto duas vezes', async ({
      productPage,
    }) => {
      // 1. Acessar o produto e adicioná-lo pela primeira vez aos favoritos
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.addToWishlistAndExpectModal(
        errorMessages.wishlist.addedTitle,
        errorMessages.wishlist.addedText
      );

      // 2. Clicar novamente em "Add To Wishlist" e validar modal "Failed" / "Already Added in Wishlist"
      await productPage.addToWishlistAndExpectModal(
        errorMessages.wishlist.duplicateTitle,
        errorMessages.wishlist.duplicateText
      );
    });

    test('Cenário 3: Deve mover um produto da Wishlist diretamente para o Carrinho', async ({
      wishlistPage,
      cartPage,
    }) => {
      // 1. Acessar a página da Wishlist e verificar o item padrão "Boho Tops for Girls"
      await wishlistPage.gotoDirect();
      await wishlistPage.expectProductInWishlist(defaultWishlistProducts.firstItem);

      // 2. Clicar em "Add to cart" na linha do produto na Wishlist
      await wishlistPage.moveProductToCartFromWishlist(defaultWishlistProducts.firstItem);

      // 3. Validar que o item saiu da Wishlist e foi adicionado ao Carrinho
      await wishlistPage.expectProductNotInWishlist(defaultWishlistProducts.firstItem);
      await cartPage.goto();
      await cartPage.expectProductInCart(defaultWishlistProducts.firstItem);
    });

    test('Cenário 4: Deve remover um item individual da tabela da Wishlist', async ({
      wishlistPage,
    }) => {
      // 1. Acessar a página da Wishlist
      await wishlistPage.gotoDirect();
      await wishlistPage.expectProductInWishlist(defaultWishlistProducts.secondItem);

      // 2. Clicar no ícone de lixeira para remover "Skater Dress"
      await wishlistPage.removeProductFromWishlist(defaultWishlistProducts.secondItem);

      // 3. Validar que o item removido não está mais na tabela e os demais permanecem
      await wishlistPage.expectProductNotInWishlist(defaultWishlistProducts.secondItem);
      await wishlistPage.expectProductInWishlist(defaultWishlistProducts.thirdItem);
    });

    test('Cenário 5: Deve remover todos os itens da Wishlist e exibir mensagem "YOUR WISHLIST IS EMPTY"', async ({
      wishlistPage,
    }) => {
      // 1. Acessar a página da Wishlist com os 4 itens iniciais
      await wishlistPage.gotoDirect();
      await wishlistPage.expectProductInWishlist(defaultWishlistProducts.firstItem);

      // 2. Remover todos os itens da lista de desejos
      await wishlistPage.removeAllProductsFromWishlist();

      // 3. Validar a mensagem "YOUR WISHLIST IS EMPTY"
      await wishlistPage.expectEmptyWishlistMessage(errorMessages.wishlist.emptyTitle);
    });
  });

  test.describe('Parte B: Fluxo de Busca de Produtos (Search Modal)', () => {
    test('Cenário 6: Deve pesquisar produto por palavra-chave no Search Modal e redirecionar para a loja', async ({
      homePage,
    }) => {
      // 1. Acessar a página inicial
      await homePage.goto();

      // 2. Abrir o modal de busca, pesquisar pela palavra-chave "Dress" e validar modal "Success" / "Check out the Results" e redirecionamento para /shop
      await homePage.searchProductAndExpectSuccess(
        errorMessages.search.keyword,
        errorMessages.search.successTitle,
        errorMessages.search.successText
      );
    });
  });
});
