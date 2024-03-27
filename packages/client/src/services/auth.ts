import { AuthApi } from '@/api';
import { VALID_AUTH_ERROR } from '@/helpers/constants/api';
import { isRequestError } from '@/helpers/request';
import {
  GetUserRequestDto,
  LoginRequestDto,
  LoginRequestResult,
} from '@/helpers/types';

const successAuthData = { isOk: true, reason: '' };

export class AuthService {
  static async login(
    props: LoginRequestDto
  ): Promise<LoginRequestResult | undefined> {
    try {
      const response = await AuthApi.login(props);
      if (response.ok && !isRequestError(response.status)) {
        return successAuthData;
      }
      const { reason } = await response.json();
      if (reason === VALID_AUTH_ERROR) {
        return successAuthData;
      }
      return { isOk: false, reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async getUser(props: GetUserRequestDto): Promise<boolean> {
    const response = await AuthApi.getUser(props);
    return response.ok;
  }

  static async logout(): Promise<LoginRequestResult | undefined> {
    try {
      const response = await AuthApi.logout();
      if (response.ok && !isRequestError(response.status)) {
        return { isOk: true, reason: '' };
      }
      const error = await response.json();
      return { isOk: false, reason: error.reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
