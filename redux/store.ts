import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import counterReducer from './slices/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
