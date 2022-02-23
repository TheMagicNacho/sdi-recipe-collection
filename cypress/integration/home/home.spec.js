/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */


describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("header contains recipe heading with a message that there are no recipes", () => {
      cy.findByRole('heading').should('contain', 'My Recipes')
      cy.get('p')
        .findByText('There are no recipes to list.')
        .should('exist')
    })

    // cypress/integration/home/home.spec.js
    it("contains an add recipe button that when clicked opens a form", () => {
    cy.findByRole('button').click();
  
    cy.get('form')
      .findByRole('button')
      .should('exist')
  })


    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        cy.findByRole('button').click();
        expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist()
        cy.findByRole('textbox', {name: /instructions/i}).should('exist')
    })


    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const recipeName = 'Tofu Scramble Tacos';
        cy.findByRole('button').click()
        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
        cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
        cy.findByRole('button').click();

        return cy.get('#cool-list').should('include.text', 'Nuggies' && 'Tacos')
      })

      it("displays all of them displayed below the ‘My Recipes’ heading", () => {
        const recipeName1 = 'Chicken Nuggies';
        const recipeName2 = 'Tofu Scramble Tacos';
        cy.findByRole('button').click()
        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName1)
        cy.findByRole('textbox', {name: /instructions/i}).type("1. Grab nuggies. 2. Shove in microwave 3. Shove in mouth");
        cy.get('#submit-recipe').click()

        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName2)
        cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
        cy.get('#submit-recipe').click()

        return cy.get('#cool-list').should('include.text', 'Nuggies' && 'Tacos')


        
            
      })


      it("displays recipe on hover", () => {
        const recipeName1 = 'nuggs';
        
        cy.findByRole('button').click()
        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName1)
        cy.findByRole('textbox', {name: /instructions/i}).type("TEST");
        cy.get('#submit-recipe').click();

        cy.get('.btn-secondary').trigger('mouseover');
     

        return cy.get('.sdi-tooltip').should('be.visible') 


        
            
      })

  })

