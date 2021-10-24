const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
  reactStrictMode = true;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'username',
        mongodb_password: 'dev-server-password',
        mongodb_clustername: 'cluster-name',
        mongodb_database: 'dev-database-name',
        googleMapApi: 'dev-map-api'
      }
    };
  }
  return {
    env: {
      mongodb_username: 'username',
      mongodb_password: 'production-server-password',
      mongodb_clustername: 'cluster-name',
      mongodb_database: 'production-database-name',
      googleMapApi: 'production-map-api'
    }
  };
};