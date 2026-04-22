// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should display login page correctly", () => {
    cy.contains("Login");
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.contains("button", "Login").should("be.visible");
  });

  it("should show alert when email is empty", () => {
    cy.get('input[placeholder="Password"]').type("123456");
    cy.contains("button", "Login").click();

    cy.on("window:alert", (text) => {
      expect(text).to.exist;
    });
  });

  it("should show alert when password is empty", () => {
    cy.get('input[placeholder="Email"]').type("test@mail.com");
    cy.contains("button", "Login").click();

    cy.on("window:alert", (text) => {
      expect(text).to.exist;
    });
  });

  it("should show alert when login credentials are wrong", () => {
    cy.get('input[placeholder="Email"]').type("salah@mail.com");
    cy.get('input[placeholder="Password"]').type("wrongpassword");
    cy.contains("button", "Login").click();

    cy.on("window:alert", (text) => {
      expect(text).to.exist;
    });
  });

  it("should redirect to homepage when login success", () => {
    cy.get('input[placeholder="Email"]').type("test@mail.com");
    cy.get('input[placeholder="Password"]').type("123456");
    cy.contains("button", "Login").click();

    cy.url().should("include", "/");
  });
});
