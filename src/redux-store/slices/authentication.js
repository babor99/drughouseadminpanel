import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  csrfToken: null,
  message: null
}

const authenticationSlice = createSlice({
  name: 'liaSms/authentication',
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.isAuthenticated = action.payload?.isAuthenticated
      state.accessToken = action.payload?.accessToken
      state.csrfToken = action.payload?.csrfToken
      state.message = 'Login successful!'
    },
    setLoginFailed: (state, action) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.csrfToken = null
      state.message = 'Login failed!'
    },
    setLogoutSuccess: (state, action) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.csrfToken = null
      state.message = 'Logout successful!'
    },
    setLogoutFailed: (state, action) => {
      state.message = 'Logout failed!'
    }
  }
})

export const { setLoginSuccess, setLoginFailed, setLogoutSuccess, setLogoutFailed } = authenticationSlice.actions

export default authenticationSlice.reducer
