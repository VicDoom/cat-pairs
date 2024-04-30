import { AuthApi } from '@/api';
import { LoginRequestDto, RegistrationFieldDto, User } from '@/helpers/types';

export class AuthService {
  constructor(public readonly api: AuthApi = new AuthApi()) {}

  login(props: LoginRequestDto) {
    return this.api.login(props);
  }

  registration(props: RegistrationFieldDto) {
    return this.api.registration(props);
  }

  async getServiceId(): Promise<string> {
    const { service_id } = await this.api.fetchServiceId();
    return service_id;
  }

  loginOauth({ code }: { code: string }) {
    return this.api.loginOauth({ code });
  }

  getCurrentUser(): Promise<User> {
    return this.api.fetchUser();
  }

  getCurrentUserWithCookie(ctx: string): Promise<User> {
    return this.api.getUserWithCookie(ctx);
  }

  logout() {
    return this.api.logout();
  }
}
