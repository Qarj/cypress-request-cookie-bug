/// <reference types="Cypress" />
context('Applications Cards CE', (done) => {
  beforeEach(() => {

    // Uncomment the next two lines and the test runs reliably
    // let healthcheckUrl = 'https://www.stepstone.de/membersarea/health?format=html';
    // cy.visit(healthcheckUrl); // MUST BE .visitdo not change for .request

    // If you run the test after uncommenting the lines, the recomment the two lines
    // above, you can continue to re-run the test ok

    // BUT - if you then run spec.js and try to run requestCookie.js again, it will fail

    // UPDATE Thursday 18 May 2023, bug is fixed in Cypress 12.12.0

    cy.request({
      url: 'https://www.stepstone.de/5/index.cfm?event=auth:candidate.loginregistrationpopover.labelsJson',
      failOnStatusCode: true,
      retryOnStatusCodeFailure: true,
      method: 'GET',
    }).then(() => {
      cy.getCookie('X-AUTH-CSRF-TOKEN').then((token) => {
        let xCsrfToken = token === null ? 'no_token' : token.value;
        cy.request({
          url: `https://www.stepstone.de/public-api/v1/candidate/authentication`,
          failOnStatusCode: true,
          retryOnStatusCodeFailure: true,
          method: 'POST',
          headers: { 'X-CSRF-TOKEN': xCsrfToken },
          body: { "email": 'cookiebug@in.fistep.com', "password": '_cypress721', "rememberMe": true, "loginSource": "Homepage_top-login" },
        })
      })
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
