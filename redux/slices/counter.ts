import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += 1
      console.log(action)
      return state
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= 1
      return state
    },
  },
})

export const counterActions = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

const counterReducer = counterSlice.reducer

export default counterReducer
