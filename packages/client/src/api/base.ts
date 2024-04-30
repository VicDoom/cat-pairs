import { fetchHelper, getString, setHeaders } from '@/helpers';
import { FetchError, FetchHelperParams } from '@/helpers/fetch-helper';

type HTTPMethod = <ResponseData extends object>(
  url: string,
  params?: object
) => Promise<ResponseData>;

export class BaseApi {
  constructor(public readonly abortController = new AbortController()) {}

  async fetch<ResponseData extends object>(
    url: string,
    options: FetchHelperParams
  ): Promise<ResponseData | never> {
    const response: Response = await fetchHelper(url, {
      headers: setHeaders('application/json'),
      ...options,
      signal: this.abortController.signal,
    });

    const data = await this.getData(response);

    if (!response.ok) {
      throw new FetchError(
        `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as ResponseData;
  }

  post: HTTPMethod = (url: string, params?: object) => {
    return this.fetch(url, {
      method: 'POST',
      body: params ? getString(params) : undefined,
    });
  };

  put: HTTPMethod = (url: string, params?: object) => {
    return this.fetch(url, {
      method: 'PUT',
      body: params ? getString(params) : undefined,
    });
  };

  get = <ResponseData extends object>(
    url: string,
    params?: Record<string, string>
  ): Promise<ResponseData> => {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.fetch(url + queryString, {
      method: 'GET',
    });
  };

  private async getData(response: Response): Promise<object> {
    try {
      return await response.json();
    } catch (e) {
      try {
        return { reason: await response.text() };
      } catch (e) {
        return { reason: response.statusText };
      }
    }
  }
}
