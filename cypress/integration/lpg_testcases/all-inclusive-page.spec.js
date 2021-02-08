Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

before(()=> {
  cy.visit('/all-inclusive');
  


})



describe('Tests the Boston GO All-Inclusive page', () => {
  it('Navigates to the All Inclusive page', () => {
    cy.title().should('contain', 'Go Boston Pass | All-Inclusive Pass');
    cy.url().should('include', '/boston/en-us/products/all-inclusive');
  });

  describe('Tests the Home page', () => {
    it('Redirects user to Home page after clicking Home link', () => {
      cy.contains('Home').click();
      cy.title().should('contain', 'Go Boston Pass | Attraction Pass');
      cy.contains('Experience more with Go Boston');
      cy.url().should('include', '/boston/en-us');
    });
  });

  describe('Tests the Pricing page links', () => {
    it('Redirects user to Pricing page after clicking Buy button', () => {
      cy.visit('/all-inclusive/pricing');
      cy.contains('Buy').click({ force: true });
      cy.title().should('contain', 'Prices | All-Inclusive');
      cy.get('.products-stack-header--title').should(
        'contain',
        'Choose your All-Inclusive pass'
      );
    });

    it('Selects the Whats included link on the Pricing page', () => {
      cy.get('.secondary-menu--item').first().click();
      cy.title().should('contain', 'What You Get');
      cy.get('.content--title').should(
        'contain',
        'What’s included with the Go Boston All-Inclusive pass'
      );
    });

    it('Selects the How it works link on the Pricing page', () => {
      cy.get('.secondary-menu--item').eq('1').click();
      cy.title().should('contain', 'How It Works');
      cy.url().should('include', '/all-inclusive/how-it-works'
      );
      cy.get('.content--title').should('contain','How does the Go Boston All–Inclusive pass work?');
      cy.get('.field').first().should('contain', 'How to get your Go Boston All-Inclusive pass');
      cy.get('.wyg-text').should('contain','Go Boston includes everything you need to sightsee and save');
    });
    it('Selects the Attractions link on the Pricing page', () => {
      cy.get('.secondary-menu--item').eq('2').click();
      cy.title().should('contain', 'Attractions');
      cy.url().should('include','/all-inclusive/attractions');
      cy.get('.content--title').should('contain','All-in admission to 45+ Boston attractions');
      cy.get('.content--notice > .container').should('contain','Choice of one premium attraction only on 3, 5, and 7 day passes');
      cy.get('.lpg-attractions-filter__button').first().click()      
      cy.get('.lpg-attractions-filter__filter-content-tags > :nth-child(1) > label').first().click({force: true})
      .should('contain', 'Cultural & Historic')
      cy.get('.site-content-inner > .region').click({force:true})
      cy.get('.attraction-tile--details').first().click()
      cy.url().should('include','/boston/en-us/attractions/salem-witch-museum')

    });

    it('Selects the Real customer saving link on the Pricing page', ()=> {
      cy.visit('/all-inclusive/')
      cy.get('.secondary-menu--item').eq('3').click();
      cy.title().should('contain', 'Real Customer Savings');
      cy.url().should('include','/all-inclusive/customer-savings');
      cy.get('.content--title').should('contain','Real Customer Savings');
    })

    it('Selects the Plan your trip link of the Pricing page', ()=> {
      cy.get('.secondary-menu--item').eq('4').click();
      cy.title().should('contain', 'Free Guidebook');
      cy.url().should('include','/all-inclusive-guidebook');
      cy.get('.content--title').should('contain','Download your free Boston guidebook');

    })
  });
  describe('Tests the Explorer page links', ()=> {
    it('Selects the Save up to 45% link on the Explorer page', ()=> {
      cy.visit('/explorer')
      cy.title().should('contain', 'Go Boston Pass | Explorer')
      cy.get('.content--subtitle').should('contain','Admission to 2, 3, 4 or 5 attractions');
      cy.contains('dmission to 2, 3, 4 or 5 attractions')
      cy.url().should('include','/products/explorer');
      cy.get('.key-selling-points-item--description').eq('0').click()
      cy.get('.content--title').should('contain','What’s included with the Go Boston Explorer pass');
    })
    it('Selects the Admission to 2,3,4 or 5 link Explorer page', ()=> {
      cy.visit('/explorer')
      cy.title().should('contain', 'Go Boston Pass | Explorer')
      cy.url().should('include','boston/en-us/products/explorer');
      cy.get('.key-selling-points-item--description').eq('1').click()
      cy.get('.content--title').should('contain','What’s included with the Go Boston Explorer pass');
    })
    it('Selects the All on one digital pass link on the Explorer page', ()=> {
      cy.visit('/explorer')
      cy.title().should('contain', 'Go Boston Pass | Explorer')
      cy.url().should('include','boston/en-us/products/explorer');
      cy.get('.key-selling-points-item--description').eq('2').click()
      cy.get('.content--title').should('contain','What’s included with the Go Boston Explorer pass');
    })
    it('Selects the Plan in advance or visit on the fly link on the Explorer page', ()=> {
      cy.visit('/explorer')
      cy.title().should('contain', 'Go Boston Pass | Explorer')
      cy.url().should('include','boston/en-us/products/explorer');
      cy.get('.key-selling-points-item--description').eq('3').click()
      cy.get('.content--title').should('contain','What’s included with the Go Boston Explorer pass');
    })
  })

    describe('Test Adding an Explorer pass to cart', () => {
      it('Chooses an Explorer pass to add to cart', () => {
        cy.visit('/explorer')
        cy.get('select').select('Bos_Prod_Exp_c2').should('have.value', 'Bos_Prod_Exp_c2')
        cy.get('.form-control').eq('0').select(['2 Choice Pass from $60'])
        cy.wait(1000)
        cy.get(':nth-child(3) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > [data-testid=cartItemIncrease]').click().click()
        cy.wait(1000)
        cy.get(':nth-child(4) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > [data-testid=cartItemIncrease]').click().click()
        cy.get('.lc-cart__prices-number > .formatted-price').should('contain', '$97')
        cy.get('.lc-cart__purchase').should('contain', 'Checkout').click()
        cy.get('.content--title').should('contain', 'Review your order')
        cy.get('.block-title').should('contain', 'When will you be visiting Boston?')
        cy.get('.lc-cart__title').should('contain', 'Your Cart')
        cy.get(':nth-child(2) > .lc-cart__item-name > .lc-cart__pass-product-name').should('contain', '2 Choice Pass Adult Explorer')
        cy.get('.formatted-price').eq('1').should('contain', '$60')
        cy.get(':nth-child(3) > .lc-cart__item-name > .lc-cart__pass-product-name').should('contain','2 Choice Pass Child (3–12) Explorer' )
        cy.get('.lc-cart__prices-number > .formatted-price').should('contain', '$97')
      })
    })

    describe('Test Removing an Explorer Pass from cart', ()=> {
      it('Removes Explorer pass from cart', ()=> {
        cy.visit('/explorer')
        cy.get('select').select('Bos_Prod_Exp_c2').should('have.value', 'Bos_Prod_Exp_c2')
        cy.get('.form-control').eq('0').select(['2 Choice Pass from $60'])
        cy.wait(1000)
        cy.get(':nth-child(4) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > [data-testid=cartItemIncrease]').click().click()
        cy.get('.lc-cart__prices-number > .formatted-price').should('contain', '$37')
        cy.get('.lc-cart__purchase').should('contain', 'Checkout').click()
        cy.get('.content--title').should('contain', 'Review your order')
        cy.get('.block-title').should('contain', 'When will you be visiting Boston?')
        cy.get('.lc-cart__title').should('contain', 'Your Cart')
        cy.get(':nth-child(2) > .lc-cart__item-name > .lc-cart__pass-product-name').should('contain','2 Choice Pass Child (3–12) Explorer' )
        cy.get('.lc-cart__prices-number > .formatted-price').should('contain', '$37')
        cy.get('.lc-cart__item-delete').click()
        cy.get('.custom-ui > :nth-child(2)').click()
        cy.url().should('include', '/explorer#block-react-products-stack')
      })

    })

    describe('Test Adding & Removing an Explorer pass to cart from the Pricing page', ()=>{
      it('Selects a pass to buy on Pricing page', ()=> {
        cy.visit('/explorer/pricing')
        cy.get('.products-stack-header--title').should('contain', 'Choose your Explorer pass')
        cy.get('[data-index="0"] > :nth-child(1) > .lc-products-list__item-wrapper > .lc-products-list__item > .btn').click({force:true})
        cy.get('.lc-cart__item-function-pass').should('contain', '2 Choice Pass')
        cy.wait(1000)
        cy.get('.lc-cart__purchase').click({force:true})
        cy.wait(10000)
        cy.get(':nth-child(2) > .lc-cart__item-name > .lc-cart__pass-product-name').should('contain', '2 Choice Pass Adult Explorer')
        cy.get('.formatted-price').eq('1').should('contain', '$60')
        cy.get('.lc-cart__item-delete').click()
        cy.get('.custom-ui > :nth-child(2)').click()
        cy.url().should('include', '/explorer#block-react-products-stack')

      })
    })

    describe('Test Signing up for a Limited Time Offer with a valid email address', ()=> {
      it('Can sign up for a limited offer', ()=>{
        cy.get('#edit-email').type("hello@cypress.io", {force:true})
        cy.get('#edit-subscription').click()
        cy.get('#edit-actions-submit').click()
        cy.wait(8000)
        cy.get('.slide-in--content--header').should('contain', 'Thanks for signing up!')
      })

    describe('Test Signing up for a Limited Time Offer with an invalid email address', ()=> {
      it('Cannot sign up for a limited offer', ()=>{
        cy.visit('/all-inclusive')
        cy.get('#edit-email').type("testing1234@1234.com")
        cy.get('#edit-subscription').click()
        cy.get('#edit-actions-submit').click()
        cy.get('.form-item--error-message').should('contain', 'The email address testing1234@1234.com is not valid.')

      })
  
    })

    describe('Test Cannot Sign up for Limited Time offer without accepting privacy policy', ()=>{
      it('Cannot sign up for Limited Time offer', ()=>{
        cy.visit('/all-inclusive')
        cy.get('#edit-email').clear()
        cy.get('#edit-email').type("testing1234@gmail.com", {force:true})
        cy.get('#edit-actions-submit').click()
        cy.get('.form-item--error-message').should('contain', 'Please agree to our privacy policy.')

      })
    })

    describe('Test Building Your Own Boston Pass & Adding it to the cart', ()=>{
      it('Builds Your Own Boston Pass', ()=> {
        cy.visit('/build-your-own')
        cy.get('.attraction-tile--details').first()
        cy.get('.cart-button').first().click({force:true})
        cy.get('.cart-icon__icon').first().click({force:true})
        cy.get('.lpg-attractions-cart__checkout').first().click({force:true})
        cy.wait(8000)
        cy.get('.lpg-attractions-cart__products-item-name').should('contain', 'Franklin Park Zoo')
        cy.get('.lpg-attractions-cart__prices-number ').should('contain', '$21.95')
        cy.get('.travel-date--datepicker > img').click()
        cy.get(':nth-child(2) > :nth-child(6) > .ui-state-default').click()
        cy.get('.block-region-first > .block-go-commerce > .block-container > .block-inner > .block-content-wrapper > .react-component > :nth-child(1) > :nth-child(1) > [data-testid=continueToPayment]').click()
      })
    })
    describe('Test Boston Pass Can Be Removed from Build Your Own Page', ()=>{
      it('Boston Pass Can Be Removed', ()=>{
        cy.visit('/build-your-own')
        cy.get('.attraction-tile--details').first()
        cy.get('.cart-button').first().click({force:true})
        cy.get('.cart-icon__icon').first().click({force:true})
        cy.get('.cart-button--active').should('contain', 'Remove').click()
        cy.get('.cart-button').should('contain', 'Add to cart')

      })
    })

  
  })

});

