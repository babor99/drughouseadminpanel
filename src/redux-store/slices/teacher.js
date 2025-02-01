import { createSlice } from '@reduxjs/toolkit'

import {
  GET_TEACHER_SCHOOLS_WP,
  GET_TEACHER_SECTIONS_WP,

} from '@/constants/constants'


export const getTeacherSchoolsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_TEACHER_SCHOOLS_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setTeacherSchools(data?.schools))
    })
    .catch(() => { })
}

export const getTeacherSectionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_TEACHER_SECTIONS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setTeacherSections(data.sections)))
    .catch(() => { })
}

const teacherSlice = createSlice({
  name: 'liaSms/teacher',

  initialState: {
    myself: {},
    teacherSchools: [],
    teacherSections: [],
  },

  reducers: {
    setMyself: (state, action) => {
      state.myself = action.payload ? action.payload : {}
    },
    setTeacherSchools: (state, action) => {
      state.teacherSchools = action.payload ? action.payload : []
    },
    setTeacherSections: (state, action) => {
      state.teacherSections = action.payload ? action.payload : []
    },
  }
})

const {
  setMyself,
  setTeacherSchools,
  setTeacherSections,
} = teacherSlice.actions

export default teacherSlice.reducer
