import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
  name: 'liaSms/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    unsetUser: (state, action) => {
      return {}
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer
