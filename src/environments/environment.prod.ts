export const environment = {
  production: true,
  authUri: 'http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/auth',
  clientId: 'erc-households',
  responseType: 'code',
  tokenUri: 'http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/token',
  client_secret: '5ee672aa-4daa-4cfc-aafb-30deb8eb42d7',
  apiServer: 'http://10.67.1.238:5050/api/',
  userNotificationHub: 'http://10.67.1.238:5050/user-notification-hub',
  logoutUri: 'http://10.67.1.238:8080/auth/realms/master/protocol/openid-connect/logout'
};
