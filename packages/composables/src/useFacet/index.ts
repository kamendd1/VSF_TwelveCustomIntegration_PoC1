import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { Category, Product } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseFacetSearchParams as SearchParams } from '../types';
import { useCategory } from '../useCategory';
import { useProduct } from '../useProduct';

const factoryParams = {
    // Use another composable (https://docs.vuestorefront.io/v2/integrate/integration-guide.html#implement-useproduct-composable)
    provide() {
        return useCategory('categories');
        //return [useCategory('categories'), useProduct('products')];
    },


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search: async (context: Context, params: FacetSearchResult<SearchParams>): Promise<SearchParams> => {        
        console.info(`%c Entering: useFacet.search, with params: `, 'color:blue; font-weight:bold', params.input);
        console.info('%c   calling:  context.$vsftwelvepoc1.api.fetchProducts(params)', 'color:blue');                

        //TODO: is fetching from api okay? 
        const allProducts: Product[] = await context.$vsftwelvepoc1.api.fetchProducts(params);        
        
        const categoriesFromContext: Category[] = context.categories.value;

        const currentCat = categoriesFromContext.find(c => c.slug === params.input.categorySlug);

        if (!currentCat)
            throw new Error(`No category found for slug '${params.input.categorySlug}'`);

        const    productsForCategory = allProducts.filter(p => p.categoryIds.includes(currentCat.id));
        console.info(`%c filtering ${allProducts.length} products on categoryId '${currentCat.id}' yields: ${productsForCategory.length} products`, 'color:blue');  

        //TODO: should be of type SearchParams (that is a local alias for UseFacetSearchParams)
        //      Therefore this casting-to-any hack. Looks very odd, but strangely enough, the returned result is picked properly.
        return productsForCategory as any; 
    }
};

//Returns an object of interface UseFacet (line 163 in ~\node_modules\@vue-storefront\core\lib\src\types.d.ts),
//having one method:
//  search: (params?: AgnosticFacetSearchParams) => Promise<void>;
//and 3 properties:
//  result: ComputedProperty<FacetSearchResult<SEARCH_DATA>>;
//  loading: ComputedProperty<boolean>;
//  error: ComputedProperty<UseFacetErrors>;
export const useFacet = useFacetFactory<SearchParams>(factoryParams);
