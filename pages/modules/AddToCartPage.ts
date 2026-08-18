import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { selectors } from '../../config/selectors';

export class AddToCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addToCart() {
    await this.click(this.page.locator(selectors.addToCart.addToCartButton));
  }

  async cartBadgeCount() {
    return this.page.locator(selectors.cart.badge).textContent();
  }

  async removeFromCart() {
    await this.click(this.page.locator(selectors.addToCart.removeCartButton));
  }

  async cheoutbutton() {
    await this.click(this.page.locator(selectors.checkout.checkoutButton));
  }
  async cartbadge() {
    await this.click(this.page.locator(selectors.cart.badge));
  }
  async continueShopping() {
    await this.click(this.page.locator(selectors.continueShopping.continueShoppingButton));
  }
}
