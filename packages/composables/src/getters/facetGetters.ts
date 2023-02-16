import {
    FacetsGetters,
    FacetSearchResult,
    AgnosticCategoryTree,
    AgnosticGroupedFacet,
    AgnosticPagination,
    AgnosticSort,
    AgnosticBreadcrumb,
    AgnosticFacet
} from '@vue-storefront/core';


import type { Facet, FacetSearchCriteria } from '@vue-storefront/vsftwelvepoc1-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
    return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
    return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
    return {
        options: [],
        selected: ''
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(params: FacetSearchResult<Facet>): AgnosticCategoryTree {
    return {
        label: '',
        slug: '',
        items: null,
        isCurrent: false,
        count: 0
    };
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(params: FacetSearchResult<Facet>): any {
    console.log('%c facetGetters.getProducts with params xxx', 'color:green', {...params.input});
    //if (!params || !params.data || !params.data.items) {
    //    return [];
    //}

    debugger;
    if(params.input.categorySlug === 'Foodzzz')
        return (params.data as any).slice(0, 3); //first 4 items
    else
        return (params.data as any).slice(3); //remaining 6 items
    // const { products, loading, error, search }  = useProduct("a");
    //const aaa = useProduct("a");
    //await aaa.search({        perPage: 1,        page: 1,
    //    //sort: any;        //term: any;        //filters: any;        //[x: string]: any;
    //}      
    //const vvv = aaa.products.value; 
    //console.log('%c facetGetters.getProduct2 2 resulted in', 'color:green', vvv);        
    //return aaa.products;
    

    return [
        {
            _id: 1,
            _description: 'Some description',
            _categoriesRef: [
                '1',
                '2'
            ],
            name: 'Black jacket 2 van Floris',
            sku: 'black-jacket',
            images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
            ],
            price: {
                original: 12.34,
                current: 10.00
            }
        }
    ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
    return {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
        pageOptions: []
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>): AgnosticBreadcrumb[] {
    return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
    getSortOptions,
    getGrouped,
    getAll,
    getProducts,
    getCategoryTree,
    getBreadcrumbs,
    getPagination
};
