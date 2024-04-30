import {
  DataChangePassword,
  ProfileFieldType,
  User,
} from '@/helpers/types/user';
import { BaseApi } from '@/api/base';

export class UserApi extends BaseApi {
  changePassword(params: DataChangePassword) {
    return this.put('/user/password', params);
  }

  changeAvatar(formData: FormData) {
    return this.fetch<User>('/user/profile/avatar', {
      method: 'PUT',
      body: formData,
      headers: [],
    });
  }

  changeUser(params: ProfileFieldType) {
    return this.put<User>('/user/profile', params);
  }
}
