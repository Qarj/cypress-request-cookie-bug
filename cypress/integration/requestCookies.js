/// <reference types="Cypress" />
context('Applications Cards CE', (done) => {
  beforeEach(() => {

    // Uncomment the next two lines and the test runs reliably
    // let healthcheckUrl = 'https://www.stepstone.de/membersarea/health?format=html';
    // cy.visit(healthcheckUrl); // MUST BE .visitdo not change for .request

    // If you run the test after uncommenting the lines, the recomment the two lines
    // above, you can continue to re-run the test ok

    // BUT - if you then run spec.js and try to run requestCookie.js again, it will fail

    cy.request({
        url: `https://www.stepstone.de/public-api/v1/candidate/authentication`,
        failOnStatusCode: true,
        method: 'POST',
        body: { "email": 'cookiebug@in.fistep.com', "password": '_cypress721', "rememberMe": true, "loginSource": "Homepage_top-login" },
    }).then((response) => {
        expect(response.status).to.eq(201)
    });
  });

  it('should be able to see the cookies', () => {

    cy.getCookie('STEPSTONEV5LANG')
      .should('exist')
      .then((cookie) => {
        cy.log (`cookie ${cookie.name} has value ${cookie.value}`)
      });

    logCookies ('Names of cookies present');

  });

});

function logCookies(message) {
    cy.log(message);
    cy.getCookies()
    .then((cookies) => {
        cookies.forEach(element => cy.log(element.name));
  })
}
