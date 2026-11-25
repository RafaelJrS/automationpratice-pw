/**
 * Entradas e mensagens esperadas (sucesso e erro) agrupadas por funcionalidade.
 * Os textos refletem exatamente o que a aplicação exibe (incluindo erros de digitação do próprio site).
 */
export const scenarioData = {
  login: {
    invalidEmail: 'E-mail inválido.',
    invalidPassword: 'Senha inválida.',
  },
  register: {
    emptyName: 'O campo nome deve ser prenchido',
    invalidEmail: 'O campo e-mail deve ser prenchido corretamente',
    shortPassword: 'O campo senha deve ter pelo menos 6 dígitos',
  },
  cart: {
    emptyTitle: 'YOUR CART IS EMPTY',
    emptySubtitle: 'Sorry Mate... No Item Found Inside Your Cart!',
    invalidCouponTitle: 'Error!!',
    invalidCouponText: 'Invalid Cuppon Code',
  },
  product: {
    minQuantityTitle: 'Sorry!',
    minQuantityText: 'Minimun Quantity Reached',
  },
  wishlist: {
    addedTitle: 'Success',
    addedText: 'Added to Wishlist',
    duplicateTitle: 'Failed',
    duplicateText: 'Already Added in Wishlist',
    emptyTitle: 'YOUR WISHLIST IS EMPTY',
  },
  search: {
    keyword: 'Dress',
    successTitle: 'Success',
    successText: 'Check out the Results',
  },
  myAccount: {
    logoutTitle: 'Logout Sucessfull',
    logoutText: 'Thank You',
  },
  orderTracking: {
    orderId: '78153',
    billingEmail: 'rafael.qa@qazando.com',
    completedHeading: 'Your order is completed!',
  },
  compare: {
    addedTitle: 'Success!',
    addedText: 'Successfully added to Compare List',
    duplicateTitle: 'Failed!',
    duplicateText: 'Already Added in Compare List',
    emptyTitle: 'PRODUCT NOT FOUND',
    emptySubtitle: 'Sorry Mate... No Item Found Inside Your Compare List!',
  },
  advancedCartAndCatalog: {
    fitFlareUpdatedQty: '3',
    fitFlareUpdatedTotal: '$156.00',
    offcanvasInitialSubtotal: '$107.00',
    offcanvasUpdatedSubtotal: '$55.00',
    midiDressUpdatedTotal: '$28.00',
    sortOptionLowToHigh: 'Price: Low to High',
    sizeOptionXL: 'XL',
  },
  accountEditAndContact: {
    firstName: 'Rafael',
    lastName: 'Silva',
    email: 'rafael.qa@qazando.com',
    currentPass: '123456',
    newPass: '654321',
    phone: '11999999999',
    subject: 'Dúvida sobre Pedido E2E',
    message: 'Mensagem enviada pelo teste automatizado Playwright.',
    contactSuccessTitle: 'Thank You',
    contactSuccessText: 'We Got Your Message',
    error404Title: '404',
    error404Subtitle: "We are sorry, the page you've requested is not available",
    checkoutInvalidEmailError: 'O campo E-mail deve ser prenchido ou é inválido',
  },
  checkout: {
    missingBillingBeforeOrder: 'Preencha os dados de pagamento!',
    requiredFields: [
      'O campo First Name deve ser prenchido',
      'O campo Last Name deve ser prenchido',
      'O campo Company deve ser prenchido',
      'O campo E-mail deve ser prenchido ou é inválido',
      'O campo Country deve ser prenchido',
      'O campo City deve ser prenchido',
      'O campo Zip Code deve ser prenchido',
      'O campo Address deve ser prenchido',
      'O campo Additional Notes deve ser prenchido',
    ],
  },
};
