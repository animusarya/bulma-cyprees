export default {
  debug: process.env.NODE_ENV === 'development',
  siteName: 'Intellishare',
  graphQlUri: 'https://api.intellishare.online/api',
  // graphQlUriDev: 'https://api.intellishare.online/api',
  graphQlUriDev: 'http://localhost:4000/api',
  projectKey: 'intellishare',
  stripePublishableKey: 'pk_test_mjhAjr7ARWNkUU2Yj6IQrjxb',
  currency: '£',
};
