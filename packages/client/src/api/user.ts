import { fetchHelper } from '@/helpers';
import { YANDEX_API_HOST } from '@/helpers/constants/api';
import { DataChangePassword, ProfileFieldType } from '@/helpers/types/user';

export class UserApi {
  static async changePassword(params: DataChangePassword) {
    return await fetchHelper({
      url: '/user/password',
      method: 'PUT',
      data: params,
    });
  }

  //здесь что бы применить fetchHelper нужно его поменять, что бы была возможность менять Content-Type у headers
  static async changeAvatar(data: FormData) {
    return await fetch(`${YANDEX_API_HOST}/user/profile/avatar`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
  }

  static async changeUser(params: ProfileFieldType) {
    return fetchHelper({
      url: '/user/profile',
      method: 'PUT',
      data: params,
    });
  }
}
