import { fetchGetCurrentUserServer } from '@/store/userSlice';
import { PageInitArgs } from '@/routes';

export const initProfilePage = async ({ dispatch, ctx }: PageInitArgs) => {
  return dispatch(fetchGetCurrentUserServer(ctx));
};
