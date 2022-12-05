import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  isLogged: boolean
}
const initialState: CounterState = {
  isLogged: false,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkStatus: (state) => {
      const isLogged = localStorage.getItem('logged')
      console.log(isLogged)
      if (!!isLogged) state.isLogged = true
      else state.isLogged = false
      return state
    },
    login: (state) => {
      localStorage.setItem('logged', 'true')
      state.isLogged = true
    },
    logout: (state) => {
      localStorage.setItem('logged', 'false')
      state.isLogged = false
      return state
    },
  },
})

export const authActions = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
