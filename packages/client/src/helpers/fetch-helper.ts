import { HOST } from './constants/api';

export interface FetchHelperParams {
  body?: string | FormData;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  signal?: AbortSignal | null | undefined;
}

export const setHeaders = (contentType: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', contentType);
  return requestHeaders;
};

export const setHeadersWithCookie = (contetType: string, ctx: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', contetType);
  requestHeaders.set('cookie', ctx);
  return requestHeaders;
};

export const getString = (object: object) => {
  return JSON.stringify(object);
};

export const fetchHelper = (url: string, options: FetchHelperParams) => {
  return fetch(`${HOST}/api/v2${url}`, {
    ...options,
    credentials: 'include',
  });
};

export class FetchError extends Error {
  statusCode: number;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
