"use strict";
describe('Pool', function () {
    beforeEach(function () { return cy.visit('/pool'); });
    it('import pool links to /import', function () {
        cy.get('#import-pool-link').click();
        cy.url().should('contain', '/find');
    });
});
