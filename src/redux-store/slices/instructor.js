import { createSlice } from '@reduxjs/toolkit'

import {
  GET_INSTRUCTOR_COURSES_WP,
  GET_INSTRUCTOR_LECTURE_SECTIONS_BY_COURSE_ID_WP,

} from '@/constants/constants'

export const getInstructorCoursesWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_INSTRUCTOR_COURSES_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setInstructorCourses(data?.courses))
    })
    .catch(() => { })
}

export const getInstructorLectureSectionsByCourseIdWP = (accessToken, csrfToken, courseId) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(`${GET_INSTRUCTOR_LECTURE_SECTIONS_BY_COURSE_ID_WP}${courseId}`, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setInstructorLectureSectionsByCourseId(data?.sections))
    })
    .catch(() => { })
}

const instructorSlice = createSlice({
  name: 'liaSms/instructor',

  initialState: {
    instructorCourses: [],
    instructorLectureSectionsByCourseId: [],
  },

  reducers: {
    setInstructorCourses: (state, action) => {
      state.instructorCourses = action.payload ? action.payload : []
    },
    setInstructorLectureSectionsByCourseId: (state, action) => {
      state.instructorLectureSectionsByCourseId = action.payload ? action.payload : []
    },
  }
})

const {
  setInstructorCourses,
  setInstructorLectureSectionsByCourseId,
} = instructorSlice.actions

export default instructorSlice.reducer
