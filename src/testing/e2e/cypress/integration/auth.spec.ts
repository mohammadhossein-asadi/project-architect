describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully login with valid credentials', () => {
    cy.login('test@example.com', 'password123');
    cy.assertToastMessage('Successfully logged in');
    cy.get('[data-testid=user-menu]').should('be.visible');
  });

  it('should show error message with invalid credentials', () => {
    cy.login('invalid@example.com', 'wrongpassword');
    cy.assertToastMessage('Invalid credentials');
    cy.url().should('include', '/login');
  });

  it('should successfully register a new user', () => {
    cy.visit('/register');
    cy.get('[data-testid=name-input]').type('Test User');
    cy.get('[data-testid=email-input]').type('newuser@example.com');
    cy.get('[data-testid=password-input]').type('password123');
    cy.get('[data-testid=confirm-password-input]').type('password123');
    cy.get('[data-testid=register-button]').click();
    
    cy.assertToastMessage('Registration successful');
    cy.url().should('not.include', '/register');
  });
});