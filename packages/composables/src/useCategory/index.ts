import { Context, useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/vsftwelvepoc1-api';
import type { UseCategorySearchParams as SearchParams } from '../types';

import { useProduct } from '../useProduct/index'


const params: UseCategoryFactoryParams<Category, SearchParams> = {

    // use another composable (https://docs.vuestorefront.io/v2/integrate/integration-guide.html#implement-useproduct-composable)
    provide() {
        return useProduct('a');
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    categorySearch: async (context: Context, { customQuery, ...params }) => {
        console.log('Mocked: useCategory.categorySearch');



        return [
            {
                id: 1,
                name: 'Womenx',
                slug: 'women',
                items: []
            },
            {
                id: 2,
                name: 'Men',
                slug: 'men',
                items: []
            },
            {
                id: 3,
                name: 'Kids',
                slug: 'kids',
                items: []
            }
        ];
    }
};

export const useCategory = useCategoryFactory<Category, SearchParams>(params);
