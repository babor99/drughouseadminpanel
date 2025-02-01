import { createSlice } from '@reduxjs/toolkit'

import {
  DASHBOARD_DATA,

} from '@/constants/constants'

export const getDashboardData = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(DASHBOARD_DATA, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setDashboardData(data)))
    .catch(() => { })
}

const dashboardSlice = createSlice({
  name: 'liaSms/dashboard',

  initialState: {
    dashboardData: {},
  },

  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload ? action.payload : {}
    },
  }
})

const {
  setDashboardData,
} = dashboardSlice.actions

export default dashboardSlice.reducer
