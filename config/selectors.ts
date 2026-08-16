export const selectors = {
  login: {
    usernameInput: '#user-name',
    passwordInput: '#password',
    submitButton: '#login-button',
    errorMessage: '[data-test="error"]',
  },
  dashboard: {
    welcomeBanner: '[data-testid="welcome-banner"]',
    navMenu: '[data-testid="nav-menu"]',
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
};
