import axios, {AxiosInstance} from 'axios';

class BaseClient {
  static client = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: 'https://tasty.p.rapidapi.com/recipes/',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '{your_api_key}',
      },
    });

    // axiosRetry(instance, { retries: 3 });
    // intercept response
    instance.interceptors.response.use(
      async response => {
        // log the response
        console.log(
          '%cResponse:',
          'color: ' + '#00ff3b' + 'AF' + '; font-weight: bold',
          {
            header: response.config.headers,
            address: `${response.config.baseURL}${response.config.url}`,
            responseBody: response.data,
          },
        );
        // return the response
        return Promise.resolve(response);
      },
      error => {
        return Promise.reject(error);
      },
    );

    // intercept request
    instance.interceptors.request.use(
      config => {
        // log the request
        console.log(
          '%cRequest:',
          'color: ' + '#e100ff' + 'AF' + '; font-weight: bold',
          {
            header: config.headers,
            address: `${config.baseURL}${config.url}`,
            requestBody: config.data,
          },
        );
        // return the request config
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    return instance;
  };
}

const ClientInstance = BaseClient.client();

export {ClientInstance};
