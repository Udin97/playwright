export const selectors = {
  login: {
    usernameInput: '#user-name',
    passwordInput: '#password',
    submitButton: '#login-button',
    errorMessage: '[data-test="error"]',
  },
  dashboard: {
    welcomeBanner: '[data-test="title"]',
    navMenu: '#react-burger-menu-btn',
  },
  cif: {
    searchInput: '[data-testid="cif-search"]',
    createButton: '[data-testid="cif-create"]',
  },
  fundTransfer: {
    fromAccountInput: '[data-testid="from-account"]',
    toAccountInput: '[data-testid="to-account"]',
    amountInput: '[data-testid="amount"]',
    submitButton: '[data-testid="transfer-submit"]',
  },
  addToCart: {
    addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
    removeCartButton: '[data-test="remove-sauce-labs-backpack"]',
  },
  cart: {
    badge: '.shopping_cart_badge',
    cartButton: '[data-test="shopping-cart-link"]',
  },
  checkout: {
    checkoutButton: '[data-test="checkout"]',
  },
  continueShopping: {
    continueShoppingButton: '[data-test="continue-shopping"]',
  },
  yourinfoinput: {
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    zipcodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
  },
  finish: {
    finishButton: '[data-test="finish"]',
    cancelfinishButton: '[data-test="cancel"]',
  },
};
