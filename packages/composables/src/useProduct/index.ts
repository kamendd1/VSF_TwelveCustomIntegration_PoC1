import { Context, useProductFactory, UseProductFactoryParams } from '@vue-storefront/core';
import type { Product } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseProductSearchParams as SearchParams } from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    productsSearch: async (context: Context, params) => {
        //hier kom je als je op een product klikt 
        console.info(`%c Entering: useProduct.productSearch with params`, 'color:blue', params);
        console.info('%c   calling:  context.$vsftwelvepoc1.api.fetchProducts(params)', 'color:blue');                

        const products = await context.$vsftwelvepoc1.api.fetchProducts(params);
        return products;
    }
};


//Returns an object of interface UseProduct (line 61 in ~\node_modules\@vue-storefront\core\lib\src\types.d.ts),
//having one method:
//  search(params: ComposableFunctionArgs<PRODUCT_SEARCH_PARAMS>): Promise<void>;
//and 3 properties:
//  products: ComputedProperty<PRODUCTS>;
//  loading: ComputedProperty<boolean>;
//  error: ComputedProperty<UseProductErrors>;
//and this:
//  [x: string]: any;
export const useProduct = useProductFactory<Product, SearchParams>(params);
