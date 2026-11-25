// spec: specs/carrinho-avancado-catalogo-e-variacoes.md
// seed: tests/seed.spec.ts
import { test } from '../../fixtures/pom.fixture';
import {
  defaultCartProducts,
  scenarioData,
  sampleProduct,
} from '../../test-data';

test.describe('Passo 6 - Carrinho Avançado, Catálogo e Variações de Produto', { tag: ['@regression'] }, () => {
  test.describe('Parte A: Carrinho Avançado e Mini-Carrinho Lateral (Offcanvas)', { tag: ['@cart'] }, () => {
    test('Cenário 1: Deve alterar a quantidade de um item no Carrinho e recalcular o Total dinamicamente', async ({
      cartPage,
    }) => {
      // 1. Acessar o carrinho (/cart) e verificar o produto "Fit-Flare Dress" ($52.00)
      await cartPage.gotoDirect();
      await cartPage.expectProductInCart(defaultCartProducts.firstItem);

      // 2. Alterar a quantidade para 3 e validar recálculo do Total da linha para "$156.00"
      await cartPage.updateProductQuantityAndExpectTotal(
        defaultCartProducts.firstItem,
        scenarioData.advancedCartAndCatalog.fitFlareUpdatedQty,
        scenarioData.advancedCartAndCatalog.fitFlareUpdatedTotal
      );
    });

    test('Cenário 2: Deve interagir pelo Mini-Carrinho Lateral (Offcanvas), remover item, atualizar Subtotal e ir para o Checkout', async ({
      homePage,
      cartPage,
    }) => {
      // 1. Acessar a página inicial
      await homePage.goto();

      // 2. Abrir o drawer do mini-carrinho, remover "Fit-Flare Dress", validar Subtotal ($107.00 -> $55.00) e ir para Checkout
      await cartPage.openOffcanvasRemoveItemAndGoToCheckout(
        defaultCartProducts.firstItem,
        scenarioData.advancedCartAndCatalog.offcanvasInitialSubtotal,
        scenarioData.advancedCartAndCatalog.offcanvasUpdatedSubtotal
      );
    });

    test('Cenário 3: Deve incrementar quantidade pelo botão "+" e recalcular Total no layout Cart View Two (/cartTwo)', async ({
      cartPage,
    }) => {
      // 1. Acessar o layout alternativo de carrinho (/cartTwo)
      await cartPage.gotoCartTwoDirect();

      // 2. Clicar no botão "+" do produto "Midi Dress" ($14.00) e validar novo Total "$28.00"
      await cartPage.incrementProductInCartTwoAndExpectTotal(
        defaultCartProducts.secondItem,
        scenarioData.advancedCartAndCatalog.midiDressUpdatedTotal
      );
    });
  });

  test.describe('Parte B: Catálogo da Loja (/shop), Variações de Produto e Layout Alternativo', { tag: ['@catalog'] }, () => {
    test('Cenário 4: Deve ordenar produtos no Catálogo (/shop) e adicionar produto ao carrinho direto pela vitrine', async ({
      shopPage,
    }) => {
      // 1. Acessar a vitrine da loja (/shop)
      await shopPage.goto();

      // 2. Ordenar por "Price: Low to High" e clicar em "Add to cart" no primeiro card da vitrine
      await shopPage.sortProductsAndAddFirstToCart(
        scenarioData.advancedCartAndCatalog.sortOptionLowToHigh
      );
    });

    test('Cenário 5: Deve selecionar variações do produto (Tamanho XL, Cor Green e Quantidade 2) e adicionar ao carrinho', async ({
      productPage,
    }) => {
      // 1. Acessar a página de detalhes do produto (/product-details-one/1)
      await productPage.gotoProduct(sampleProduct.id);
      await productPage.expectProductLoaded(sampleProduct.name);

      // 2. Selecionar tamanho XL, cor Green, incrementar quantidade no "+" para 2 e clicar em Add To Cart
      await productPage.selectVariationsAndAddToCart(
        scenarioData.advancedCartAndCatalog.sizeOptionXL
      );
    });

    test('Cenário 6: Deve acessar página de detalhes no Layout 2 (/product-details-two/1) e adicionar produto ao carrinho', async ({
      productPage,
    }) => {
      // 1. Navegar para o layout alternativo de detalhes do produto (/product-details-two/1) e adicionar ao carrinho
      await productPage.gotoProductLayoutTwoAndAddToCart(sampleProduct.id, sampleProduct.name);
    });
  });
});
