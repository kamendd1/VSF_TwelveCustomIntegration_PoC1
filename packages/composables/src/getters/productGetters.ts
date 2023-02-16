import { AgnosticMediaGalleryItem, AgnosticAttribute, AgnosticPrice, ProductGetters } from '@vue-storefront/core';
import type { Product, ProductFilter } from '@vue-storefront/vsftwelvepoc1-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {    
    return product.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
    return product.title;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
    return product.slug;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {    
    return {
        regular: product.price.regular,
        special: 0
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
    return [
        {
            small: product.imgUrl,
            normal: product.imgUrl,
            big: product.imgUrl,
        }
    ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
    return product.imgUrl;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): any[] {
    console.info('%c productGetters.getFiltered...', 'color:green', filters);
    
    //const productsFiltered = products.filter(p => p.id)
    return products.slice(0, 1);

    //return [
    //    {
    //        _id: 1,
    //        _description: 'Some description',
    //        _categoriesRef: [
    //            '1',
    //            '2'
    //        ],
    //        name: 'Black jacket 1 van Floris',
    //        sku: 'black-jacket',
    //        images: [
    //            'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    //        ],
    //        price: {
    //            original: 12.34,
    //            current: 10.00
    //        }
    //    }
    //];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
    return {};
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
    return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string {
    return product.id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
    return `Formttd  ${price}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
    return 99;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
    return 2;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
    getName,
    getSlug,
    getPrice,
    getGallery,
    getCoverImage,
    getFiltered,
    getAttributes,
    getDescription,
    getCategoryIds,
    getId,
    getFormattedPrice,
    getTotalReviews,
    getAverageRating
};
