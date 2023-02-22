import { Context, useProductFactory, UseProductFactoryParams } from '@vue-storefront/core';
import type { Product } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseProductSearchParams as SearchParams } from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    productsSearch: async (context: Context, params) => {        
        //hier kom je als je op een product klikt 
        console.info(`%c Entering: useProduct.productSearch with params`, 'color:blue; font-weight:bold', params);
        console.info('%c    calling:  context.$vsftwelvepoc1.api.fetchProducts(params)', 'color:blue');                

        //note: returned value is of type any; is probably by design.
        const products = await context.$vsftwelvepoc1.api.fetchProducts(params);
        
        console.info(`%c    filtering on params.id:  ${!!params.id}`, 'color:blue');
        const foundProducts = params.id
                                ? products.filter(p => p.id === params.id)
                                : products; 

        console.info(`%c    product to return:  ${foundProducts.length}`, 'color:blue');
        return foundProducts;
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
