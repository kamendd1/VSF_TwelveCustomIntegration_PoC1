import * as coreTypes from '@vue-storefront/core';

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

//TODO: Or use this? --->  export type UseFacetSearchParams = coreTypes.AgnosticFacetSearchParams;
export type UseFacetSearchParams = {
    categorySlug: string;
    rootCatSlug: string;
    term: string | string[];
    page: number;
    itemsPerPage: number;
    sort: string | string[];
    filters: any; 
}	

export type UseProductSearchParams = coreTypes.ProductsSearchParams;

export type UseReviewSearchParams = TODO;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseStoreFilterParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;
