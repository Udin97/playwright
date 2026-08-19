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

  async checkoutbutton() {
    await this.click(this.page.locator(selectors.checkout.checkoutButton));
  }
  async cartbadge() {
    await this.click(this.page.locator(selectors.cart.badge));
  }
  async clickcart(){
    await this.click(this.page.locator(selectors.cart.cartButton));
  }
  async continueShopping() {
    await this.click(this.page.locator(selectors.continueShopping.continueShoppingButton));
  }
  async continuebutton(){
    await this.click(this.page.locator(selectors.yourinfoinput.continueButton))
  }
  

  async fillform(firstName: string, lastName: string, zipCode: string) {
    await this.fill(this.page.locator(selectors.yourinfoinput.firstNameInput), firstName);
    await this.fill(this.page.locator(selectors.yourinfoinput.lastNameInput), lastName);
    await this.fill(this.page.locator(selectors.yourinfoinput.zipcodeInput), zipCode);
  }

  async finishbutton(){
    await this.click(this.page.locator(selectors.finish.finishButton))
  }
  async cancelfinishbutton(){
    await this.click(this.page.locator(selectors.finish.cancelfinishButton))
  }
  
}
