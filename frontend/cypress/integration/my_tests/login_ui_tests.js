const random = Math.floor(Math.random() * 99999) + 1;

context('Signup flow - happy path', () => {
  beforeEach(() => {});

  it('Sucessfully navigates to register', () => {
    cy.visit('localhost:3000');
    cy.contains('Register').click();
    cy.url().then((url) => {
      expect(url).to.equal('http://localhost:3000/register');
    });
  });

  it('Sucessfully signs up', () => {
    const name = `andrew${random}`;
    const email = `${random}@gmail.com`;
    const password = '123';
    cy.get('input[name=Name]').focus().type(name);
    cy.get('input[name=Email]').focus().type(email);
    cy.get('input[name=Password]').focus().type(password);

    cy.get('button[name=register').click();
    cy.get('[data-test-target=Dashboard]').then((el) => {
      expect(el.text()).to.contain('Create New Game');
    });
  });
  Cypress.config('defaultCommandTimeout', 35000);

  it('Creates a new game successfully', () => {
    const randomNumber = Math.floor(Math.random() * 99999) + 1;
    cy.get('input[name="Insert new quiz name"]').focus().type(randomNumber);
    cy.get('[data-test-target=Dashboard]').click();
    cy.get('h2').then((el) => {
      expect(el.text()).to.contain(randomNumber.toString());
    });
  });

  it('is able to start and stop the game', () => {
    cy.get('[data-test-target=Start]').click();
    cy.contains('New Session Started').then((el) => {
      expect(el.text()).to.contain('New Session Started');
    });
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('[data-test-target=Stop]').click();
    cy.get('[data-test-target=Results]').then((el) => {
      expect(el.text()).to.contain('Result');
    });
  });

  it('is able to navigate to results page', () => {
    cy.get('[data-test-target=Results]').click();
    cy.contains('Final Results!').then((el) => {
      expect(el.text()).to.contain('Final Results!');
    });
  });

  it('is able to log out', () => {
    cy.get('[data-test-target=LogOut]').click();
    cy.get('h4').then((el) => {
      expect(el.text()).to.contain('Sign in');
    });
  });

  it('is able to log back in', () => {
    const name = `andrew${random}`;
    const password = '123';
    cy.get('input[name=Name]').focus().type(name);
    cy.get('input[name=Password]').focus().type(password);
    cy.contains('Log in').click();
    cy.get('[data-test-target=Dashboard]').then((el) => {
      expect(el.text()).to.contain('Create New Game');
    });
  });
});
