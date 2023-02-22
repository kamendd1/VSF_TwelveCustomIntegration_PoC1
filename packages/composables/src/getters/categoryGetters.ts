import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/vsftwelvepoc1-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(category: Category): string {
    return category.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
    debugger;
    return {
        label: '',
        slug: '',
        items: [],
        isCurrent: false
    };
}

export const categoryGetters: CategoryGetters<Category> = {
    getTree,
    getName
};
