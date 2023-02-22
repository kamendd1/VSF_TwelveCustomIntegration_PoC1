import { Context, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import type { Cart, CartItem, Product } from '@vue-storefront/vsftwelvepoc1-api';

const inMemoryTmpCart = { foo:'bar'};

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: async (context: Context, { customQuery }) => {
        console.info(`%c Entering: useCart.load`, 'color:blue; font-weight:bold', inMemoryTmpCart); 
        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
        debugger;
        console.info(`%c Entering: useCart.addItem`, 'color:blue; font-weight:bold', currentCart); 
        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: async (context: Context, { currentCart, product, customQuery }) => {
        debugger;
        console.info(`%c Entering: useCart.removeItem`, 'color:blue; font-weight:bold', currentCart);
        return "";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
        console.log('Mocked: useCart.updateItemQty');
        return {};
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: async (context: Context, { currentCart }) => {
        console.log('Mocked: useCart.clear');
        return {};
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
        console.log('Mocked: useCart.applyCoupon');
        return {
            updatedCart: {},
            updatedCoupon: {}
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
        console.log('Mocked: useCart.removeCoupon');
        return {
            updatedCart: {}
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isInCart: (context: Context, { currentCart, product }) => {
        console.log('Mocked: useCart.isInCart');
        return false;
    }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
