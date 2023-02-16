import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import type { UseFacetSearchParams as SearchParams } from '../types';

//import { useProduct } from '../useProduct/index'
const factoryParams = {
    //// use another composable (https://docs.vuestorefront.io/v2/integrate/integration-guide.html#implement-useproduct-composable)
    //provide() {
    //    return useProduct('a');
    //},

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
        
        console.info(`%c useFacet : search with params`, 'color:blue', params.input);
                
        const products = await context.$vsftwelvepoc1.api.fetchProducts(params);
        //debugger;

        return products;

    }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
