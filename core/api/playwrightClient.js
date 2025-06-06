const logger = require('../utils/logger');

class APIClient {
  constructor(requestContext) {
    this.requestContext = requestContext;
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
  }

  buildAuthHeaders(headers = {}) {
    return this.token
      ? { ...headers, Authorization: `Bearer ${this.token}` }
      : headers;
  }

  async requestHandler(method, url, options = {}) {
    const { data, headers = {} } = options;
    const requestOptions = {
      headers: this.buildAuthHeaders(headers),
    };

    if (data) {
      requestOptions.data = data;
    }
    try {
      const response = await this.requestContext[method](url, requestOptions);
      logger.info({
        status: response.status(),
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json(),
      };
    }
    catch (error) {

      logger.error({
        message: `[ERROR] ${method.toUpperCase()} ${url}`,
        error: error.message,
        stack: error.stack,
      });


      throw error;
    }
  }

  get(url, headers = {}) {
    return this.requestHandler('get', url, { headers });
  }

  post(url, data = {}, headers = {}) {
    return this.requestHandler('post', url, { data, headers });
  }

  put(url, data = {}, headers = {}) {
    return this.requestHandler('put', url, { data, headers });
  }

  delete(url, headers = {}) {
    return this.requestHandler('delete', url, { headers });
  }
}
module.exports = { APIClient };