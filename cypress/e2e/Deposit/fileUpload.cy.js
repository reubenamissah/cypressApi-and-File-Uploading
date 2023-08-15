/// <reference types="Cypress" />

describe("FILE UPLOAD TEST", function () {
    beforeEach(function () {
        cy.visit("https://fineuploader.com/demos.html")
        

    });


it("FILE UPLOAD - I Should be able to upload file", function () {
    const imagefile = 'kuda.png';
    cy.get('[name="qqfile"]').attachFile(imagefile);
});
});