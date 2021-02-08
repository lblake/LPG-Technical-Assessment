# LPG-Technical-Assessment

1: Prerequisites - 1 - install Node

2 - after installing node open any IDE or Terminal or Git bash and run the following two commands      (1) - npm install ---- npm install to install the project dependencies      (2) - npm update ----- npm update to update webdriver

3: There are a number of ways you can run the tests from the command-line:

A: npx cypress open this will open the cypress test runner
Select “all-inclusive-page.spec.js” this will open a new Chrome browser and start running the tests

B: npx cypress run
C: This will run all the test in ‘headless’ mode (no browser)

D: You can use mochawesome to run the tests and generate a report using the following command:
npx cypress run --reporter mochawesome --spec cypress/integration/lpg_testcases/

To view this report you need to open cypress/results folder via your browser and select the file ending with .html

The Cypress test framework was used to write the tests in conjunction with ‘Mocha & Chai’:
See https://www.cypress.io & https://docs.cypress.io/guides/references/bundled-tools.html#Mocha for more information

NOTE There were a number of issues with pages not loading or not being visible when running the tests I had to use timeouts to allow these pages to load correctly.  I also came across an issue with the ‘Test Building Your Own Boston Pass’ test where the page would either not load or would reload a different page.  This required the test to be run a number of times before it passed.

There where multiple user journeys that could have been automated on https://gocity.com/boston/en-us/products/all-inclusive page.  I choose to automate the following user journeys:

1: Navigating to the All Inclusive home page
2: Redirecting user to home page when selecting home link
3: Redirect user to pricing page after clicking ‘Buy’ button
4: Navigates to ‘Whats included’ page from pricing page
5: Navigates to ‘How it works’ page from pricing page
6: Navigates to ‘Attractions’ page from pricing page
7: Navigates to ‘Real customer’ page from pricing page
8: Navigates to ‘Plan your trip’ page from pricing page
9: Tests all the ‘Explorer’ page links
10: Tests you can add an ‘Explorer’ pass to the cart
11: Tests that you can remove an ‘Explorer’ pass from the cart
12: Tests that you can sign-up for a ‘Limited Time Offer’ with a valid email
13: Tests that you cannot sign-up for a ‘Limited Time Offer’ with an invalid email
14: Tests that you cannot sign-up for a ‘Limited Time Offer’ without accepting privacy terms 
15: Tests Building Your Own Boston pass & adding it to the cart
16: Tests Building Your Own Boston pass can be removed from the  cart

