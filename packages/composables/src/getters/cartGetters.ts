import {
    CartGetters,
    AgnosticPrice,
    AgnosticTotals,
    AgnosticCoupon,
    AgnosticDiscount,
    AgnosticAttribute
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@vue-storefront/vsftwelvepoc1-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(cart: Cart): CartItem[] {
    return cart.cartItems;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: CartItem): string {
    return item.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: CartItem): string {
    return item.imgUrl;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: CartItem): AgnosticPrice {
    return {
        regular: item.price.regular,
        special: item.price.special
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: CartItem): number {
    return item.quantity;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: CartItem, filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> {
    return {
        color: 'red'
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: CartItem): string {
    return item.productId; //TODO: change this
}

function hasSpecialPrices(cart: Cart): boolean {
    return cart.cartItems.some(ci => !!ci.price.special);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(cart: Cart): AgnosticTotals {

    const regularSubTotal = cart.cartItems.reduce((sum, current) => sum + current.quantity * current.price.regular, 0);

    return {
        subtotal: regularSubTotal,
        special: hasSpecialPrices(cart)
            ? cart.cartItems.reduce((sum, current) => sum + current.quantity * current.price.special, 0)
            : regularSubTotal,
        total: 777,
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart: Cart): number {
    return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(cart: Cart): number {
    return cart.cartItems.reduce((sum, current) => sum + current.quantity, 0);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
    return `${price}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoupons(cart: Cart): AgnosticCoupon[] {
    return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart: Cart): AgnosticDiscount[] {
    return [];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
    getTotals,
    getShippingPrice,
    getItems,
    getItemName,
    getItemImage,
    getItemPrice,
    getItemQty,
    getItemAttributes,
    getItemSku,
    getFormattedPrice,
    getTotalItems,
    getCoupons,
    getDiscounts
};
