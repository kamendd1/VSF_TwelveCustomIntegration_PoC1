import { AxiosError } from "axios";

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
export async function fetchProducts(context, params) {
    console.log('%ccalling:  context.$vsftwelvepoc1.api.fetchProducts(params)', 'background-color:black;color:yellow', params);

    //TODO: let backend resolve this from frontend uri origin
    const shopId = '0d8ce85c-29ba-47ee-a854-4069d57ddcce';

    const productsUrlPath = `/shopserviceapi/products/${shopId}`;

    //TODO: read assetsBaseUrl from a call to: /shopserviceapi/blobStorageConnectionInfo/<shopId>
    const assetsBaseUrl = `https://st0asf0shopsvc0dev.blob.core.windows.net/${shopId}`;

    // Add parameters passed from composable as query strings to the URL
    // // params.id && url.searchParams.set('id', params.id);
    // // params.catId && url.searchParams.set('catId', params.catId);
    // // params.limit && url.searchParams.set('limit', params.limit);

    // Use axios to send a GET request
    try {
        const { data } = await context.client.get(productsUrlPath);

        //for now, apply mapping. TODO: complete product model.
        const products = data.map(item => {
            return {
                id: item.id,
                name: item.name,
                slug: `slugfor${item.id.substring(0, 5)}`,
                title: item.description,
                imgUrl: `${assetsBaseUrl}/${item.defaultImagePath}`,
                price: { regular: item.price.amount },
                rating: { max: 5, score: 4 },
                isInWishlist: true
            }
        });

        console.info(`%c fetchProducts: returns ${products.length} products`, 'color:blue', products);

        return products

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