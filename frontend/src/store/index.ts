import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const index = configureStore({
  reducer: {

  },
});

export type AppDispatch = typeof index.dispatch;
export type RootState = ReturnType<typeof index.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
