import { Context, useProductFactory, UseProductFactoryParams } from '@vue-storefront/core';
import type { Product } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseProductSearchParams as SearchParams } from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    productsSearch: async (context: Context, params) => {
        //hier kom je als je op een product klikt 
        console.info(`%c useProduct: productSearch with params`, 'color:blue', params);

        const products = await context.$vsftwelvepoc1.api.fetchProducts(params);
        return products;
    }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
