import fetch from 'dva/fetch';

const { API_URL_BASE } = require('./config').default;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {string} method    The method of HTTP request
 * @param  {string} body      The body of the request
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, method, body) {
  return fetch(API_URL_BASE + url, {
    method,
    body: JSON.stringify(body),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization':'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJleHBUaW1lIjoiMjAxOS0wNS0xNCAxODo0ODowMyIsImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0.vKOjqIWnNraYzzsPh7pbpq8SRCu2iAbLy0GjSxAp22wNVo2modvbbQDMT0uEr-dO_PokvyAANHUUWv3rTYwmvQ',
    }
  }).then(checkStatus).then(parseJSON).then(data => ({ data })).catch(err => ({ err }));
}

/**
 * Requests a URL, returning a promise with data count.
 *
 * @param  {string} url       The URL we want to request
 * @param  {string} method    The method of HTTP request
 * @param  {string} body      The body of the request
 * @return {object}           An object containing either "data" or "err"
 */
async function getDataAndTotal(url, method, body) {
  let headers = {};
  let data = await fetch(API_URL_BASE + url, {
    method,
    body: JSON.stringify(body),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization':'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJleHBUaW1lIjoiMjAxOS0wNS0xNCAxODo0ODowMyIsImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0.vKOjqIWnNraYzzsPh7pbpq8SRCu2iAbLy0GjSxAp22wNVo2modvbbQDMT0uEr-dO_PokvyAANHUUWv3rTYwmvQ',
    }
  })
  .then(checkStatus)
  .then(response => {
    if (response.headers.get('x-total-count')) {
      headers['count'] = parseInt(response.headers.get('x-total-count'));
    }
    return response;
  })
  .then(parseJSON)
  .then(data => ({ data }))
  .catch(err => ({ err }));
  
  return { ...data, headers: headers };
}

export default {
  get: url => request(url, 'GET'),
  post: (url, body) => request(url, 'POST', body),
  put: (url, body) => request(url, 'PUT', body),
  del: (url, body) => request(url, 'DELETE', body),
  getDataAndTotal: (url, method, body) => getDataAndTotal(url, method, body),
};
