import { AxiosError } from "axios";
import { Category } from "../types";

export async function fetchCategories(context, params): Promise<Category[]> {
    console.info('%c Entering:  api.fetchCategories(params)', 'background-color:black;color:yellow');
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
        const { data } = await context.client.get(`/shopserviceapi/productlabels/${shopId}`);

        console.info(`%c fetchCategories: api returned ${data.length} records`, 'color:blue');
        
        //for now, apply mapping. TODO: complete category model.
        const categories: Category[] = data.map(item => {
            return {
                id: item.id,
                name: item.name,
                imgUrl: `${assetsBaseUrl}/${item.defaultImagePath}`,
                slug: `slugfor${item.name}`, // TODO: use proper slug
                items: []  //children  (type: Category[] )
            }
        });

        //console.info(`%c fetchCategories: returns ${categories.length} categories. First item:`, 'color:blue', categories[0]);

        return categories;

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