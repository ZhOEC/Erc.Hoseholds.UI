// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUri: 'http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/auth',
  clientId: 'erc-households',
  responseType: 'code',
  tokenUri: "http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/token",
  client_secret: '5ee672aa-4daa-4cfc-aafb-30deb8eb42d7',
  apiServer: 'http://localhost:54535/api/',
  logoutUri: "http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/logout"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
