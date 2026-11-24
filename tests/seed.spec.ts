import { test } from '../fixtures/pom.fixture';

test('seed', async ({ homePage }) => {
  await homePage.goto();
  await homePage.expectHomeLoaded();
});
