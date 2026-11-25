import { type ProductRef } from './types';

export const sampleProduct: ProductRef = { id: 1, name: 'Green Dress For Woman' };

export const newCompareProduct: ProductRef = { id: 3, name: 'V-Neck Dress' };

/** Itens que a aplicação carrega por padrão no estado Redux (sem persistência). */
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

export const defaultCompareProducts = {
  firstItem: 'Green Dress For Woman',
  secondItem: 'T-Shirt For Men',
};
