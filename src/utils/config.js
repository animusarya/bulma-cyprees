export default {
  debug: process.env.NODE_ENV === 'development',
  siteName: 'Reviews System',
  graphQlUri: 'https://api.reviews-system.com/api',
  // graphQlUriDev: 'https://api.reviews-system.com/api',
  graphQlUriDev: 'http://localhost:4000/api',
  projectKey: 'reviews-system-app',
  currency: '£',
};
