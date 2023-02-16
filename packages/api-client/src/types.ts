import { AxiosInstance } from "axios";

export type TODO = unknown;
export type TODO2 = any;

export type Wishlist = TODO2;
export type WishlistItem = TODO2;

export type Setttings = {
    apiClient: AxiosInstance,
    apiConfig: { baseUrl: string; }
};


export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Cart = TODO;

export type CartItem = TODO;

export type Category = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = {
    id: string;
    name: string;
    title: string;
    imgUrl: string;
    slug: string;
    price: { regular: number };
    rating: { max: number, score: number },
}


export type ProductFilter = TODO2;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

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


