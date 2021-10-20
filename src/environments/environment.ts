// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseEndpoint: 'https://api.biblia.com/v1/bible/',
  baseEndpointBook: 'https://api.biblia.com/v1/bible/contents',
  baseEndpointVideo: 'https://www.googleapis.com/youtube/v3/',
  apyKey:'1269d47e5be7166370b38c898b9c4920',
  apyKeyGoogle: 'AIzaSyB6lt4F1kCLbwL8ZzNMX3Ms-x9FhuaG7Oc'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
