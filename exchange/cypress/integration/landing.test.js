"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Landing Page', function () {
    beforeEach(function () { return cy.visit('/'); });
    it('loads swap page', function () {
        cy.get('#swap-page');
    });
    it('redirects to url /swap', function () {
        cy.url().should('include', '/swap');
    });
    it('allows navigation to pool', function () {
        cy.get('#pool-nav-link').click();
        cy.url().should('include', '/pool');
    });
    // Wallet not connected - test will not pass.
    // it('is connected', () => {
    //   cy.get('#web3-status-connected').click()
    //   cy.get('#web3-account-identifier-row').contains(TEST_ADDRESS_NEVER_USE_SHORTENED)
    // })
});
