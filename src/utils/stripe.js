import Stripe from 'stripe-client';

import config from './config';

const stripe = new Stripe(config.stripeKey);

export const createStripeCardToken = ({ number, expMonth, expYear, cvc }) =>
  new Promise((resolve, reject) => {
    stripe
      .createToken({
        card: {
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      })
      .then((result, err) => {
        console.log(result, err);
      });
  });

export const createStripeCard = (customerId, source) =>
  new Promise((resolve, reject) => {
    stripe.customers.createSource(
      customerId,
      {
        source,
      },
      (err, confirmation) => {
        if (err) {
          reject(err);
        } else {
          resolve(confirmation);
        }
      },
    );
  });
