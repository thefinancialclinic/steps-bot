const rp = require('request-promise');
require('dotenv').config();

const apiUrl = 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=' + process.env.FB_PAGE_ACCESS_TOKEN;

/**
 * adds the "Get Started" button from a Facebook page
 * @param  {String} accessToken - the access token for the Facebook page
 * @param  {String} payload - the user defined payload for the webhook
 * @return {Object} - the promise for the request
 */
console.log(process.env.FB_PAGE_ACCESS_TOKEN);

const addGetStarted = payload =>
  rp({
    uri: apiUrl,
    method: 'POST',
    body: {
      get_started: {
        payload
      }
    },
    json: true,
  }).then(res => console.log(res.result)).catch(error => console.log(`ERROR: ${error}`));

const deleteGetStarted = () =>
  rp({
    uri: apiUrl,
    method: 'DELETE',
    body: {
      fields: [
        'get_started'
      ]
    },
    json: true,
  }).then(res => console.log(res.result)).catch(error => console.log(`ERROR: ${error}`));

const checkGetStarted = payload =>
  rp({
    uri: apiUrl,
    method: 'GET',
    body: {
      get_started: {
        payload
      }
    },
    json: true,
  }).then(res => console.log(res.result)).catch(error => console.log(`ERROR: ${error}`));
addGetStarted('getstarted');
// checkGetStarted();