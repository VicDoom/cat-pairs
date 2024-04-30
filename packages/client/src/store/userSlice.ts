import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileFieldType, User } from '@/helpers/types';
import { UserService } from '@/services/user';
import { Theme } from '@/helpers/constants/global';
import { userNotAutn } from '@/helpers/constants/store';
import { RootState } from '@/store';
import { AuthService } from '@/services';

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

export const fetchGetCurrentUser = createAsyncThunk<
  string | User | undefined,
  undefined,
  { rejectValue: string }
>('user/fetchGetCurrentUser', async (_, thinkApi) => {
  try {
    return await new AuthService().getCurrentUser();
  } catch (e) {
    return thinkApi.rejectWithValue(
      e instanceof Error ? e.message : 'Unknown error'
    );
  }
});

export const fetchGetCurrentUserServer = createAsyncThunk<
  string | User | undefined,
  string,
  { rejectValue: string }
>('user/fetchGetCurrentUserServer', async (ctx, { rejectWithValue }) => {
  try {
    return await new AuthService().getCurrentUserWithCookie(ctx);
  } catch (e) {
    return rejectWithValue(e instanceof Error ? e.message : 'Unknown error');
  }
});
export const fetchChangeCurrentUser = createAsyncThunk<
  string | User | undefined,
  ProfileFieldType,
  { rejectValue: string }
>('user/fetchChangeCurrentUser', async (params, { rejectWithValue }) => {
  try {
    return await new UserService().changeUser(params);
  } catch (e) {
    return rejectWithValue(e instanceof Error ? e.message : 'Unknown error');
  }
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
    setTheme(state, action: PayloadAction<string>): void {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChangeCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addCase(fetchGetCurrentUserServer.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});

export const { setAvatar, setCurrentUser, setTheme, deleteCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;

function isError(action: { type: string }) {
  return action.type.endsWith('rejected');
}

export const selectUser = (state: RootState) => state.user.currentUser;
