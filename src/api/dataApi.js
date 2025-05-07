import axios from 'axios'

const createApiClient = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return instance
}

export const dataApi = {
  apiClient: null,

  initialize(baseURL) {
    this.apiClient = createApiClient(baseURL)
  },

  async getData(endpoint) {
    // console.log("Getting data at", endpoint)
    return this.apiClient.get(endpoint)
      .then(({ data }) => data)
      .catch(error => {
        console.log('GET request failed:', error);
        return false;
      });
  },

  async postData(endpoint, payload) {
    return this.apiClient.post(endpoint, payload)
      .then(({ data }) => data)
      .catch(error => {
        console.log('POST request failed:', error);
        return false;
      });
  },

  async putData(endpoint, payload) {
    return this.apiClient.post(endpoint, payload)
      .then(({ data }) => data)
      .catch(error => {
        console.log('PUT request failed:', error);
        return false;
      });
  },

  async deleteData(endpoint) {
    return this.apiClient.delete(endpoint)
      .then(({ data }) => data)
      .catch(error => {
        console.log('PUT request failed:', error);
        return false;
      });
  }

}