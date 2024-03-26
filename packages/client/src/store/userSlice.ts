import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileFieldType, User } from '@/helpers/types';
import { UserService } from '@/services/user';
import { Theme } from '@/helpers/constants/global';
import { userNotAutn } from '@/helpers/constants/store';

type CatPairsState = {
  currentUser: User;
  error: undefined | string;
  theme: string;
};

const initialState: CatPairsState = {
  currentUser: userNotAutn,
  error: undefined,
  theme: Theme.Light,
};
const abortController = new AbortController();
export const fetchGetCurrentUser = createAsyncThunk<
  string | User | undefined,
  undefined,
  { rejectValue: string }
>('user/fetchGetCurrentUser', async (_, { rejectWithValue }) => {
  const result = await UserService.getCurrentUser({
    signal: abortController.signal,
  });
  if (result?.isOk) {
    return result?.user;
  } else return result?.error && rejectWithValue(result?.error);
});

export const fetchChangeCurrentUser = createAsyncThunk<
  string | User | undefined,
  ProfileFieldType,
  { rejectValue: string }
>('user/fetchChangeCurrentUser', async (params, { rejectWithValue }) => {
  const result = await UserService.changeUser(params);
  if (result?.isOk) {
    return result?.user;
  } else return result?.error && rejectWithValue(result?.error);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>): void {
      state.currentUser.avatar = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>): void {
      Object.assign(state.currentUser, action.payload);
    },
    deleteCurrentUser(state): void {
      Object.assign(state.currentUser, userNotAutn);
    },
    setThemeDark(state): void {
      state.theme = Theme.Dark;
    },
    setThemeLight(state): void {
      state.theme = Theme.Light;
    },
  },
  extraReducers: builder => {
    builder
      /*.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })*/
      .addCase(fetchChangeCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});

export const {
  setAvatar,
  setCurrentUser,
  setThemeDark,
  setThemeLight,
  deleteCurrentUser,
} = userSlice.actions;
export default userSlice.reducer;

function isError(action: { type: string }) {
  return action.type.endsWith('rejected');
}
