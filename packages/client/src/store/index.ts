import { /*Action, ThunkAction,*/ configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;*/
