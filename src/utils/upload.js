/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const uploadFile = (signedRequest, file, options) =>
  new Promise((resolve, reject) => {
    axios
      .put(signedRequest, file, options)
      .then(result => {
        const returnData = {
          requestResponse: result,
        };
        resolve(returnData);
      })
      .catch(err => {
        reject(err);
      });
  });
