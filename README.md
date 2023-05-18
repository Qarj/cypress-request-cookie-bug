# Cypress opening new tabs causes cookies to be introduced into subsequent tests

Update: This bug is fixed in Cypress 12.12.0.

Cookies are seemingly coming out of nowhere causing independent tests to fail.

## Installing

```
git clone https://github.com/Qarj/cypress-request-cookie-bug.git
cd cypress-request-cookie-bug
npm install
```

## Reproducing the problem

```
npm run cypress:open
```

Double click on `requestCookies.js`.

In my testing this doesn't fail in a consistent manner, the first run may be different
to subsequent runs. In fact, even if you close the Cypress runner entirely and reopen
it can seem to remember the previous state as if there has been no clean-up.

## Get the test to pass

In `requestCookies.js`, uncomment these two lines:
```
    // let healthcheckUrl = 'https://www.stepstone.de/membersarea/health?format=html';
    // cy.visit(healthcheckUrl); // MUST BE .visit do not change for .request
```

Now the tests passes every time.

Comment out the two lines again. The test continues to pass every time.

Now run `spec.js` then run `requestCookies.js` again. Now it will fail, for me
it failed in a different way though.
