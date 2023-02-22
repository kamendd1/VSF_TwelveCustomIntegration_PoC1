import { Context, useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseCategorySearchParams as SearchParams } from '../types';

const factoryParams: UseCategoryFactoryParams<Category, SearchParams> = {

    // Use another composable (https://docs.vuestorefront.io/v2/integrate/integration-guide.html#implement-useproduct-composable)
    // -->   provide() { return useProduct('products'); },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    categorySearch: async (context: Context, { customQuery, ...params }) => {
        console.info(`%c Entering: useCategory.categorySearch with params`, 'color:blue', params);          
     
        console.info('%c   calling:  context.$vsftwelvepoc1.api.fetchCategories(params)', 'color:blue');
        const categories = await context.$vsftwelvepoc1.api.fetchCategories(params);
                
        return categories;
        //return [{ id: "1", name: 'Womenx', slug: 'women', items: [] }, { id: "2", name: 'Men', slug: 'men', items: [] }];
    }
};

//Returns an object of interface UseCategory (line 267 in ~\node_modules\@vue-storefront\core\lib\src\types.d.ts),
//having one method:
//  search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
//and 3 properties:
//  categories: ComputedProperty<CATEGORY[]>;
//  loading: ComputedProperty<boolean>;
//  error: ComputedProperty<UseCategoryErrors>;
export const useCategory = useCategoryFactory<Category, SearchParams>(factoryParams);
