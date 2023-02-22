import { AxiosInstance } from "axios";

export type TODO = unknown;
export type TODO2 = any;

export type Setttings = {
    apiClient: AxiosInstance,
    apiConfig: { baseUrl: string; }
};

export type Category = {
    id: string;
    name: string;
    imgUrl: string;
    slug: string;
    items: Category[];
};

export type Product = {
    id: string;
    name: string;
    title: string;
    imgUrl: string;
    slug: string;
    price: { regular: number };
    rating: { max: number, score: number },
    categoryIds: string[]
}

export type ProductFilter = TODO2;


export type Cart = {
    cartItems: CartItem[];
};

export type CartItem = {
    id: string;
    name: string;
    productId: string;
    quantity: number; /* TODO: use ASF Quantity definition */
    imgUrl: string;    
    price: { 
        regular: number, 
        special?: number 
    };
};

export type Wishlist = TODO2;
export type WishlistItem = TODO2;


export type Coupon = TODO;


export type Facet = TODO;

export type FacetSearchCriteria = TODO;


export type Order = TODO;

export type OrderItem = TODO;


export type Review = TODO;

export type ReviewItem = TODO;


export type User = TODO;

export type PasswordResetResult = TODO;


export type Endpoints = TODO;

export type BillingAddress = TODO;


export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;


export type Store = TODO;


