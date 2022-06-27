"use strict";
describe('Swap', function () {
    beforeEach(function () {
        cy.visit('/swap');
    });
    it('can enter an amount into input', function () {
        cy.get('#swap-currency-input .token-amount-input')
            .type('0.001', { delay: 200 })
            .should('have.value', '0.001');
    });
    it('zero swap amount', function () {
        cy.get('#swap-currency-input .token-amount-input')
            .type('0.0', { delay: 200 })
            .should('have.value', '0.0');
    });
    it('invalid swap amount', function () {
        cy.get('#swap-currency-input .token-amount-input')
            .type('\\', { delay: 200 })
            .should('have.value', '');
    });
    it('can enter an amount into output', function () {
        cy.get('#swap-currency-output .token-amount-input')
            .type('0.001', { delay: 200 })
            .should('have.value', '0.001');
    });
    it('zero output amount', function () {
        cy.get('#swap-currency-output .token-amount-input')
            .type('0.0', { delay: 200 })
            .should('have.value', '0.0');
    });
    it('can swap AVAX for ADA', function () {
        cy.get('#swap-currency-output .open-currency-select-button').click();
        cy.get('.token-item-0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47').click({ force: true });
        cy.get('#swap-currency-input .token-amount-input').should('be.visible');
        cy.get('#swap-currency-input .token-amount-input').type('0.001', { force: true, delay: 200 });
        cy.get('#swap-currency-output .token-amount-input').should('not.equal', '');
        // Wallet not connected so shows 'connect wallet', not swap-button.
        // cy.get('#swap-button').click()
        // cy.get('#confirm-swap-or-send').should('contain', 'Confirm Swap')
    });
    it('add a recipient does not exist unless in expert mode', function () {
        cy.get('#add-recipient-button').should('not.exist');
    });
});
