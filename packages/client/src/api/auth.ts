import { setHeadersWithCookie } from '@/helpers';
import {
  DefaultResult,
  LoginOauthRequestDto,
  LoginRequestDto,
  RegistrationFieldDto,
} from '@/helpers/types/api';
import {
  HOST,
  REDIRECT_TO_LOGIN,
  VALID_AUTH_ERROR,
} from '@/helpers/constants/api';
import { BaseApi } from '@/api/base';
import { User } from '@/helpers/types';
import { FetchError } from '@/helpers/fetch-helper';

export class AuthApi extends BaseApi {
  async login(params: LoginRequestDto): Promise<true | never> {
    try {
      await this.post<DefaultResult>('/auth/signin', params);
      return true;
    } catch (e) {
      if (e instanceof FetchError && e?.data?.reason === VALID_AUTH_ERROR) {
        console.info(e?.data?.reason);
        return true;
      } else {
        throw new Error(e instanceof Error ? e.message : 'Unknown error');
      }
    }
  }

  async registration(params: RegistrationFieldDto): Promise<User> {
    try {
      return await this.post<User>('/auth/signup', params);
    } catch (e) {
      if (
        e instanceof FetchError &&
        e.statusCode >= 400 &&
        e.statusCode < 500
      ) {
        throw new Error(e?.data?.reason);
      } else {
        throw new Error(e instanceof Error ? e.message : 'Unknown error');
      }
    }
  }

  fetchServiceId() {
    return this.get<{ service_id: string }>('/oauth/yandex/service-id', {
      redirect_uri: `${HOST}${REDIRECT_TO_LOGIN}`,
    });
  }

  loginOauth({ code }: LoginOauthRequestDto) {
    return this.post('/oauth/yandex', {
      code,
      redirect_uri: `${HOST}${REDIRECT_TO_LOGIN}`,
    });
  }

  fetchUser() {
    return this.get<User>('/auth/user');
  }

  getUserWithCookie(ctx: string) {
    return this.fetch<User>('/auth/user', {
      method: 'GET',
      headers: setHeadersWithCookie('application/json', ctx),
    });
  }

  logout() {
    return this.post<DefaultResult>('/auth/logout');
  }
}
