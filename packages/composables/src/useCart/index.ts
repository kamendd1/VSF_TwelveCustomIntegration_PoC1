import { Context, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import type { Cart, CartItem, Product } from '@vue-storefront/vsftwelvepoc1-api';

//Temporary construct. TODO.
const inMemoryTmpCart: Cart = {
    cartItems: []
};

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: async (context: Context, { customQuery }) => {
        console.info(`%c Entering: useCart.load`, 'color:blue; font-weight:bold', inMemoryTmpCart);
        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

        let cartItemForProduct = currentCart.cartItems.find(ci => ci.productId === product.id);

        if (!cartItemForProduct) {
            //add new cartItem to the cartItems
            cartItemForProduct = {
                id: product.id, //TODO: temporarily we use product.id as cartitem.id
                name: product.name,
                productId: product.id,
                quantity: quantity,
                imgUrl: product.imgUrl,
                price: {
                    regular: product.price.regular
                }
            };

            inMemoryTmpCart.cartItems.push(cartItemForProduct);
        }
        else {
            cartItemForProduct.quantity += quantity;
        }

        // just for demoing: make a special price if you add more than 5 instances of a product. 
        // TODO: remove.
        if (cartItemForProduct.quantity > 5)
            cartItemForProduct.price.special = cartItemForProduct.price.regular - cartItemForProduct.quantity / 10;

        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: async (context: Context, { currentCart, product, customQuery }) => {        
        //Bug? The argument is called 'product' but it really is a cartItem
        const cartItem = product;

        const cartItemIndex = currentCart.cartItems.indexOf(cartItem, 0);

        if (cartItemIndex === -1)
            console.warn('No cartItem found to delete'); //should not happen
        else        
            currentCart.cartItems.splice(cartItemIndex, 1);
        

        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {

        //Bug? The argument is called 'product' but it really is a catItem
        const cartItem = product;

        cartItem.quantity = quantity;

        // just for demoing: make a special price if you add more than 5 instances of a product. 
        // TODO: remove.
        if (cartItem.quantity > 5)
            cartItem.price.special = cartItem.price.regular - cartItem.quantity / 10;
        else
            cartItem.price.special = null;

        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: async (context: Context, { currentCart }) => {
        currentCart.cartItems = [];
        return inMemoryTmpCart;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
        console.log('Mocked: useCart.applyCoupon');
        return {
            updatedCart: inMemoryTmpCart,
            updatedCoupon: {}
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
        console.log('Mocked: useCart.removeCoupon');
        return {
            updatedCart: inMemoryTmpCart
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isInCart: (context: Context, { currentCart, product }) => {
        return !!(currentCart?.cartItems?.some(ci => ci.productId === product.id));
    }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
