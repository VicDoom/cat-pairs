import { fetchHelper } from '@/helpers';
import { GetUserRequestDto, LoginRequestDto } from '@/helpers/types/api';

export class AuthApi {
  static login(params: LoginRequestDto) {
    return fetchHelper({
      url: '/auth/signin',
      method: 'POST',
      data: params,
    });
  }

  static getUser({ signal }: GetUserRequestDto) {
    return fetchHelper({
      url: '/auth/user',
      method: 'GET',
      signal,
    });
  }

  static logout() {
    return fetchHelper({
      url: '/auth/logout',
      method: 'POST',
    });
  }
}
