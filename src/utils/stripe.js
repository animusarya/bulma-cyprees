import config from './config';

const stripe = window.Stripe(config.stripePublishableKey);

export default stripe;
