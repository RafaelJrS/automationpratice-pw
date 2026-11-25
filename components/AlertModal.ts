import { type Locator, type Page } from '@playwright/test';

/**
 * Componente reutilizável (Component Object) para os modais SweetAlert2
 * exibidos em toda a aplicação (login, cadastro, carrinho, wishlist, etc.).
 * Centraliza os locators em um único lugar, evitando duplicação entre Page Objects.
 */
export class AlertModal {
  readonly title: Locator;
  readonly text: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.title = page.locator('#swal2-title');
    this.text = page.locator('#swal2-html-container');
    this.confirmButton = page.locator('.swal2-confirm');
  }
}
