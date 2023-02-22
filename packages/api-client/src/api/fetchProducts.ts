import { AxiosError } from "axios";
import { Product } from "../types";

/**
 * This function has two arguments (https://docs.vuestorefront.io/v2/integrate/integration-guide.html#implement-getproduct-endpoint)
 * - context which includes:
 *     config - integration configuration,
 *     client - API client created in packages/api-client/src/index.server.ts,
 *     req - HTTP request object,
 *     res - HTTP response object,
 *     extensions - extensions registered within integration,
 *     customQueries - custom GraphQL queries registered within integration (used only with GraphQL),
 *     extendQuery - helper function for handling custom queries (used only with GraphQL).
 * - params - parameters passed from composable.
 */
export async function fetchProducts(context, params): Promise<Product[]> {
    console.info('%c Entering:  api.fetchProducts(params)', 'background-color:black;color:yellow');
    console.info('PARAMS.input:', params.input);
    console.info('PARAMS.data:', params.data && params.data.length ? `${params.data.length} items` : 'null-or-empty');

    //tenant-id header: see index.server.ts

    //TODO: let backend resolve this from frontend uri origin
    const shopId = '1e9267df-0fca-4c6c-b29f-1a9f2d1c3087';

    //TODO: read assetsBaseUrl from a call to: /shopserviceapi/blobStorageConnectionInfo/<shopId>
    const assetsBaseUrl = `https://st0asf0shopsvc0dev.blob.core.windows.net/assets-of-shop-${shopId}`;

    // Add parameters passed from composable as query strings to the URL
    // // params.id && url.searchParams.set('id', params.id);
    // // params.catId && url.searchParams.set('catId', params.catId);
    // // params.limit && url.searchParams.set('limit', params.limit);
        
    try {
        const { data } = await context.client.get(`/shopserviceapi/products/${shopId}`);

        console.info(`%c fetchProducts: api returned ${data.length} records`, 'color:blue');

        //for now, apply mapping. TODO: complete product model.
        const products: Product[] = data.map(item => {
            return {
                id: item.id,
                name: item.name,
                slug: `slugfor${item.id.substring(0, 5)}`,
                title: item.description,
                imgUrl: `${assetsBaseUrl}/${item.defaultImagePath}`,
                price: { regular: item.price.amount },
                rating: { max: 5, score: 4 },
                isInWishlist: true,
                categoryIds: item.productLabelIds
            }
        });

        //console.info(`%c fetchProducts: returns ${products.length} products. First item:`, 'color:blue', products[0]);
        return products;

    } catch (error) {

        if (error.isAxiosError) {
            const axiosError = (error as AxiosError);

            //custom backend errorcode (TODO: move elsewhere)
            if (axiosError.response.status === 499)
                error = new Error(`${axiosError.message} ${axiosError.response.data}`);
        }

        console.log(error);
        debugger;
        throw (error);
    }
}