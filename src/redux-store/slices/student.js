import { createSlice } from '@reduxjs/toolkit'

import {
  GET_ENROLLMENTS_BY_STUDENT,
  GET_STUDENT_LECTURE_PROGRESSES_BY_STUDENT_WP,
  GET_SUBMITTED_ASSIGNMENTS_BY_STUDENT,
  GET_STUDENT_QUIZ_SUBMISSIONS_COUNT_LIST_BY_STUDENT,
  GET_EVENT_ENROLLMENTS_BY_STUDENT_WP,
  GET_COMPETITION_ENROLLMENTS_BY_STUDENT_WP
} from '@/constants/constants'

export const getStudentEnrollmentsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_ENROLLMENTS_BY_STUDENT, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setStudentEnrollments(data?.enrollments)))
    .catch(() => { })
}

export const getStudentLectureProgressesWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_STUDENT_LECTURE_PROGRESSES_BY_STUDENT_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setStudentLectureProgresses(data?.progresses))
    })
    .catch(() => { })
}

export const getSubmittedAssignments = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_SUBMITTED_ASSIGNMENTS_BY_STUDENT, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setSubmittedAssignments(data?.submitted_assignments))
    })
    .catch(() => { })
}

export const getStudentQuizSubmissionsCountByStudent = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_STUDENT_QUIZ_SUBMISSIONS_COUNT_LIST_BY_STUDENT, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setStudentQuizSubmissionsCount(data))
    })
    .catch(() => { })
}

export const getEventEnrollmentsByStudent = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_EVENT_ENROLLMENTS_BY_STUDENT_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setEventEnrollments(data?.event_enrollments))
    })
    .catch(() => { })
}

export const getCompetitionEnrollmentsByStudent = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_COMPETITION_ENROLLMENTS_BY_STUDENT_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setCompetitionEnrollments(data?.competition_enrollments))
    })
    .catch(() => { })
}

const studentSlice = createSlice({
  name: 'liaSms/student',

  initialState: {
    enrollments: [],
    studentLectureProgresses: [],
    submittedAssignments: [],
    studentQuizSubmissionsCountList: [],
    eventEnrollments: [],
    competitionEnrollments: [],
  },

  reducers: {
    setStudentEnrollments: (state, action) => {
      state.enrollments = action.payload ? action.payload : []
    },
    setStudentLectureProgresses: (state, action) => {
      state.studentLectureProgresses = action.payload ? action.payload : []
    },
    setSubmittedAssignments: (state, action) => {
      state.submittedAssignments = action.payload ? action.payload : []
    },
    setStudentQuizSubmissionsCount: (state, action) => {
      state.studentQuizSubmissionsCountList = action.payload ? action.payload : []
    },
    setEventEnrollments: (state, action) => {
      state.eventEnrollments = action.payload ? action.payload : []
    },
    setCompetitionEnrollments: (state, action) => {
      state.competitionEnrollments = action.payload ? action.payload : []
    },
  }
})

const {
  setStudentEnrollments,
  setStudentLectureProgresses,
  setSubmittedAssignments,
  setStudentQuizSubmissionsCount,
  setEventEnrollments,
  setCompetitionEnrollments,
} = studentSlice.actions

export default studentSlice.reducer
