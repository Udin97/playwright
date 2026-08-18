import { test, expect } from '../../fixtures/auth.fixture';
import { AddToCartPage } from '@pages/modules/AddToCartPage';

test.describe('E2E: Add To Cart', () => {
  test('Click on Add to Cart button', async ({ authenticatedPage }) => {
    const addToCartPage = new AddToCartPage(authenticatedPage.page);
    await addToCartPage.addToCart();

    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveText('1');
    await addToCartPage.screenshot('add-to-cart_after-add');
  });
});

test.describe('E2E: Remove From Cart', () => {
  test('Click on Remove from Cart button', async ({ authenticatedPage }) => {
    const addToCartPage = new AddToCartPage(authenticatedPage.page);
    await addToCartPage.addToCart();
    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveText('1');
    await addToCartPage.screenshot('remove-from-cart_after-add');

    await addToCartPage.removeFromCart();
    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveCount(0);
    await addToCartPage.screenshot('remove-from-cart_after-remove');
  });
});

test.describe('E2E: Checkout', () => {
  test('Click on Checkout button', async ({ authenticatedPage }) => {
    const addToCartPage = new AddToCartPage(authenticatedPage.page);
    await addToCartPage.addToCart();
    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveText('1');
    await addToCartPage.screenshot('checkout_after-add');

    await addToCartPage.cartbadge();
    await addToCartPage.screenshot('checkout_after-open-cart');

    await addToCartPage.cheoutbutton();
    await addToCartPage.screenshot('checkout_after-checkout-click');
  });
});

test.describe('E2E: Continue Shopping', () => {
  test('Click on Continue Shopping button', async ({ authenticatedPage }) => {
    const addToCartPage = new AddToCartPage(authenticatedPage.page);
    await addToCartPage.addToCart();
    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveText('1');

    await addToCartPage.screenshot('continue-shopping_after-add');
    await addToCartPage.cartbadge();
    await addToCartPage.screenshot('continue-shopping_after-open-cart');

    await addToCartPage.continueShopping();
    await addToCartPage.screenshot('continue-shopping_after-continue-shopping-click');
  });
  });

  test.describe('E2E: Shopping Calculation', () => {
  test('Click on Continue Shopping button', async ({ authenticatedPage }) => {
    const addToCartPage = new AddToCartPage(authenticatedPage.page);
    await addToCartPage.addToCart();
    await expect(authenticatedPage.page.locator('.shopping_cart_badge')).toHaveText('1');

    await addToCartPage.screenshot('continue-shopping_after-add');
    await addToCartPage.cartbadge();
    await addToCartPage.screenshot('continue-shopping_after-open-cart');

    await addToCartPage.continueShopping();
    await addToCartPage.screenshot('continue-shopping_after-continue-shopping-click');
  });
  });