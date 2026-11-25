export interface UserCredentials {
  name: string;
  email: string;
  password: string;
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  fullAddress: string;
  additionalNotes: string;
}

export const validUser: UserCredentials = {
  name: process.env.TEST_USER_NAME || 'Rafael QA',
  email: process.env.TEST_USER_EMAIL || 'rafael.qa@qazando.com',
  password: process.env.TEST_USER_PASSWORD || '123456',
};

export const invalidCredentials = {
  invalidEmail: 'email_invalido_sem_dominio',
  shortPassword: '123',
  invalidCoupon: 'CUPOMINVALIDO10',
};

export const errorMessages = {
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
    sampleOrderId: '#78153',
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
    nonExistentProductId: 99999,
    notFoundTitle: 'PRODUCT NOT FOUND',
    notFoundSubtitle: 'Sorry Mate... No Item Found according to Your query!',
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

export const validBilling: BillingDetails = {
  firstName: 'Rafael',
  lastName: 'Silva',
  companyName: 'QAZANDO QA Academy',
  email: 'rafael.qa@qazando.com',
  country: 'usa',
  city: 'Aland Islands',
  zipCode: '01310-100',
  fullAddress: 'Av. Paulista, 1000 - São Paulo/SP',
  additionalNotes: 'Entrega do pedido automatizado E2E via Playwright.',
};

export const sampleProduct = {
  id: 1,
  name: 'Green Dress For Woman',
};

export const newCompareProduct = {
  id: 3,
  name: 'V-Neck Dress',
};

export const defaultCompareProducts = {
  firstItem: 'Green Dress For Woman',
  secondItem: 'T-Shirt For Men',
};

export const defaultCartProducts = {
  firstItem: 'Fit-Flare Dress',
  secondItem: 'Midi Dress',
  thirdItem: 'Tulip Dress',
};

export const defaultWishlistProducts = {
  firstItem: 'Boho Tops for Girls',
  secondItem: 'Skater Dress',
  thirdItem: 'Rocking Chair',
  fourthItem: 'Easy Chair',
};
