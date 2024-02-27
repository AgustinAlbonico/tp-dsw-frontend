describe('Registro', () => {
  it('Debería poder completar el formulario de registr', () => {
    cy.visit('http://localhost:5173/register'); 

    // Rellenar el formulario
    cy.get('[data-testid="cypress-nombre"]').type('John');
    cy.get('[data-testid="cypress-apellido"]').type('Doe');
    cy.get('[data-testid="cypress-fechaNacimiento"]').type('1990-01-01');
    cy.get('[data-testid="cypress-telefono"]').type('123456789');
    cy.get('[data-testid="cypress-email"]').type('john.doe@example.com');
    cy.get('[data-testid="cypress-password"]').type('password');
    cy.get('[data-testid="cypress-passwordRepeat"]').type('password');

    // Enviar el formulario
    cy.get('[data-testid="cypress-button"]').click();

    // Verificar mensaje de éxito
    cy.contains('Cuenta creada con exito!').should('be.visible');
    cy.contains('Email de verificacion enviado!').should('be.visible');
  });

  it('Debería mostrar un error si las contraseñas no coinciden', () => {
    cy.visit('http://localhost:5173/register');

    // Rellenar el formulario con contraseñas diferentes
    cy.get('[data-testid="cypress-nombre"]').type('John');
    cy.get('[data-testid="cypress-apellido"]').type('Doe');
    cy.get('[data-testid="cypress-fechaNacimiento"]').type('1990-01-01');
    cy.get('[data-testid="cypress-telefono"]').type('123456789');
    cy.get('[data-testid="cypress-email"]').type('john.doe@example.com');
    cy.get('[data-testid="cypress-password"]').type('password');
    cy.get('[data-testid="cypress-passwordRepeat"]').type('password123'); // Contraseña diferente

    // Enviar el formulario
    cy.get('[data-testid="cypress-button"]').click();

    // Verificar mensaje de error
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });
})