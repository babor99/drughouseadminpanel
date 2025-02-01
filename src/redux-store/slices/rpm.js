import { createSlice } from '@reduxjs/toolkit'

import {
  GET_RPM_REGIONS_WP,
  GET_RPM_SCHOOLS_WP,
  GET_RPM_SECTIONS_WP,

} from '@/constants/constants'

export const getRpmRegionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_RPM_REGIONS_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setRpmRegions(data?.regions))
    })
    .catch(() => { })
}

export const getRpmSchoolsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_RPM_SCHOOLS_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setRpmSchools(data?.schools))
    })
    .catch(() => { })
}

export const getRpmSectionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_RPM_SECTIONS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setRpmSections(data.sections)))
    .catch(() => { })
}

const rpmSlice = createSlice({
  name: 'liaSms/rpm',

  initialState: {
    myself: {},
    rpmRegions: [],
    rpmSchools: [],
    rpmSections: [],
  },

  reducers: {
    setMyself: (state, action) => {
      state.myself = action.payload ? action.payload : {}
    },
    setRpmRegions: (state, action) => {
      state.rpmRegions = action.payload ? action.payload : []
    },
    setRpmSchools: (state, action) => {
      state.rpmSchools = action.payload ? action.payload : []
    },
    setRpmSections: (state, action) => {
      state.rpmSections = action.payload ? action.payload : []
    },
  }
})

const {
  setMyself,
  setRpmRegions,
  setRpmSchools,
  setRpmSections,
} = rpmSlice.actions

export default rpmSlice.reducer
