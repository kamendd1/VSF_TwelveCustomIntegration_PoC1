module.exports = {
  integrations: {
    vsftwelvepoc1: {
      location: '@vue-storefront/vsftwelvepoc1-api/server',

      //configuration will be read as Settings parameter in packages\api-client\src\index.server.ts
      configuration: {
        apiConfig: {          
          baseUrl: 'https://apim-asf-poc.azure-api.net'
        }
      }
    }
  }
};
