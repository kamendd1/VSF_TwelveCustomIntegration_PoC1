import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import axios, { AxiosRequestConfig } from 'axios';

import { fetchProducts } from './api/fetchProducts';

//Is called ONCE on the middleware setup. You can use it to set up the GraphQL or axios client instance.
//It can return any result, and the server will merge it into the configuration object.
//For our purpose, we'll return our API Client settings and the axios client instance.
const init = (settings: Setttings) => {
    let config: AxiosRequestConfig = {
        baseURL: settings.apiConfig.baseUrl,
        headers: {
            'tenant-id': '0d8ce85c-29ba-47ee-a854-4069d57ddcce' //TODO: let backend infer this from shop domain origin.
        }
    };
    const client = axios.create(config);

    return {
        config: settings,
        client: client
    };
};

//is called on EVERY REQUEST. You can use it to customize the request, response, or settings.
// settings: a parameter which is a configuration provided in packages/theme/middleware.config.js.
function onCreate(settings: Setttings) {
    if (!settings?.apiClient) {
        return init(settings);
    }

    //Must return an object with at least config and client properties 
    //but it can have any number of custom properties if needed. This object is later available in API endpoints.
    return {
        config: settings,
        client: settings.apiClient
    };
}


//Server Middleware calls this method on every request to create a fresh API client and to handle integration-specific endpoints.
const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
    onCreate,
    //add every apihandler here
    api: {
        fetchProducts
    }
});

export { createApiClient, init };