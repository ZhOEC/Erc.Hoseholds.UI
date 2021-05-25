export const environment = {
  production: true,
  authUri: 'http://10.67.5.67:8080/auth/realms/master/protocol/openid-connect/auth',
  logoutUri: 'http://10.67.5.67:8080/auth/realms/master/protocol/openid-connect/logout',
  tokenUri: 'http://10.67.5.67:8080/auth/realms/master/protocol/openid-connect/token',
  clientId: 'erc-households',
  responseType: 'code',
  client_secret: '5ee672aa-4daa-4cfc-aafb-30deb8eb42d7',

  apiServer: 'http://10.67.5.68:5050/api/',
  userNotificationHub: 'http://10.67.5.68:5050/user-notification-hub'
};
