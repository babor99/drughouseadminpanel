'use client'

// Third-party Imports
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

import { CHECK_LOGIN_URL } from '@/constants/constants'

import {
  getRolesWP,
  getPermissionsWP,
  getUsersWP,
  getUserPermissionsWP,
  getAllMenuNestedWp,
  getParentMenus,
  getRegionsWP,
  getStatesWP,
  getSchoolsWP,
  getSectionsWP2,
  getCourseCategorysWP,
} from '@/redux-store/slices/data'

import {
  getStudentEnrollmentsWP,
  getStudentLectureProgressesWP,
  getEventEnrollmentsByStudent,
  getCompetitionEnrollmentsByStudent
} from '@/redux-store/slices/student'

import { getRpmSchoolsWP, getRpmRegionsWP, getRpmSectionsWP } from '@/redux-store/slices/rpm'
import { getTeacherSchoolsWP, getTeacherSectionsWP } from '@/redux-store/slices/teacher'
import { getInstructorCoursesWP } from '@/redux-store/slices/instructor'

import { setLoginSuccess, setLoginFailed } from '@/redux-store/slices/authentication'
import { setUser } from '@/redux-store/slices/user'

export default function AuthGuard({ children, locale }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
  const accessToken = useSelector(state => state.authentication.accessToken)

  useEffect(() => {
    if (!isAuthenticated) {
      const authHeaders = {
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      fetch(`${CHECK_LOGIN_URL}`, authHeaders)
        .then(response => response.json())
        .then(resData => {
          const data = resData?.data

          if (data?.is_authenticated) {
            dispatch(setUser(data))
            dispatch(setLoginSuccess({ isAuthenticated: data?.is_authenticated, accessToken: data?.access, csrfToken: data?.csrftoken }))

            // This is For Dynamic Sidebar
            // dispatch(setMenuItem(data?.access))

            dispatch(getUsersWP(data?.access, data?.csrftoken))
            dispatch(getRolesWP(data?.access, data?.csrftoken))
            dispatch(getPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getParentMenus(data?.access, data?.csrftoken))
            dispatch(getUserPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getAllMenuNestedWp(data?.access, data?.csrftoken))
            dispatch(getStatesWP(data?.access, data?.csrftoken))
            dispatch(getRegionsWP(data?.access, data?.csrftoken))
            dispatch(getSchoolsWP(data?.access, data?.csrftoken))
            dispatch(getSectionsWP2(data?.access, data?.csrftoken))

            dispatch(getCourseCategorysWP(data?.access, data?.csrftoken))

            if (data?.is_rpm) {
              dispatch(getRpmRegionsWP(data?.access, data?.csrftoken))
              dispatch(getRpmSchoolsWP(data?.access, data?.csrftoken))
              dispatch(getRpmSectionsWP(data?.access, data?.csrftoken))
            }

            if (data?.is_teacher) {
              dispatch(getTeacherSchoolsWP(data?.access, data?.csrftoken))
              dispatch(getTeacherSectionsWP(data?.access, data?.csrftoken))
            }

            if (data?.is_instructor) {
              dispatch(getInstructorCoursesWP(data?.access, data?.csrftoken))
            }

            if (data?.is_student) {
              dispatch(getStudentEnrollmentsWP(data?.access, data?.csrftoken))
              dispatch(getStudentLectureProgressesWP(data?.access, data?.csrftoken))
              dispatch(getEventEnrollmentsByStudent(data?.access, data?.csrftoken))
              dispatch(getCompetitionEnrollmentsByStudent(data?.access, data?.csrftoken))
            }
          } else {
            dispatch(setLoginFailed())

            setLoading(false)

            return <AuthRedirect lang={locale} />
          }

          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          dispatch(setLoginFailed())

          return <AuthRedirect lang={locale} />
        })
    } else {
      setLoading(false)
    }
  }, [])

  return <>{loading ? '' : isAuthenticated ? children : <AuthRedirect lang={locale} />}</>
}
