import { UserApi } from '@/api';
import { DataChangePassword, ProfileFieldType, User } from '@/helpers/types';

export class UserService {
  constructor(public readonly api: UserApi = new UserApi()) {}

  changePassword(props: DataChangePassword) {
    return this.api.changePassword(props);
  }

  async changeAvatar(formData: FormData): Promise<{ avatar: string }> {
    const user = await this.api.changeAvatar(formData);
    return { avatar: user.avatar };
  }

  async changeUser(props: ProfileFieldType): Promise<User> {
    return this.api.changeUser(props);
  }
}
