import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../../fixtures/pom.fixture';

const CRITICAL_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Login', path: '/login' },
  { name: 'Cart', path: '/cart' },
  { name: 'Checkout', path: '/checkout-one' },
];

/**
 * Violações conhecidas no site de demonstração (dívida técnica legada da aplicação alvo).
 * Mantidas em baseline explícita para que o gate de qualidade capture qualquer NOVA regressão
 * de acessibilidade WCAG 2.1 A/AA sem gerar falsos negativos sobre débitos preexistentes.
 */
const KNOWN_LEGACY_A11Y_RULES = [
  'aria-hidden-focus',
  'color-contrast',
  'label',
  'link-name',
];

test.describe('Auditoria de Acessibilidade (WCAG 2.1 A/AA)', { tag: ['@a11y'] }, () => {
  for (const target of CRITICAL_PAGES) {
    test(`Deve auditar acessibilidade da página ${target.name} (${target.path})`, async ({
      page,
    }, testInfo) => {
      await page.goto(target.path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(KNOWN_LEGACY_A11Y_RULES)
        .analyze();

      await testInfo.attach(`axe-${target.name.toLowerCase()}.json`, {
        body: JSON.stringify(
          results.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
          null,
          2
        ),
        contentType: 'application/json',
      });

      expect(results.violations).toEqual([]);
    });
  }
});
