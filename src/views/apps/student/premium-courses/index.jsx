'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CourseHeader from './CourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'

import { objectToQueryString } from '@/commons/utils'
import { GET_PREMIUM_COURSES, CREATE_ENROLLMENT } from '@/constants/constants'
import { getStudentEnrollmentsWP } from '@/redux-store/slices/student'

const PremiumCourses = ({ courseData, mode }) => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)
  const studentEnrollments = useSelector(state => state.student.enrollments)

  const dispatch = useDispatch()

  // States
  const [enrollBtnDisabled, setEnrollBtnDisabled] = useState(false)
  const [courses, setCourses] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState({
    page: 1,
    size: 12,
    category: null,
    keyword: "",
  })

  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  const getAllCourses = () => {
    setLoading(true)

    try {
      fetch(`${GET_PREMIUM_COURSES}?${objectToQueryString(params)}`, authHeaders)
        .then(response => {
          if (response.ok && response.status === 200) {
            return response.json()
          }

          throw new Error(`Get all course failed with status code ${response.status}`)
        })
        .then(data => {

          setCourses(data?.courses)
          setTotalPages(data?.total_pages)
          setParams(prevParams => {
            return { ...prevParams, page: data?.page, size: data?.size }
          })
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)

        })
    } catch (err) {
      setLoading(false)

    }
  }

  useEffect(() => {
    getAllCourses()
  }, [params.page, params.size, params.category])


  const createEnrollment = (courseId) => {
    setEnrollBtnDisabled(true)

    try {
      fetch(CREATE_ENROLLMENT, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders?.headers,
        body: JSON.stringify({ course: courseId })
      })
        .then(response => response.json())
        .then(data => {
          getAllCourses()
          dispatch(getStudentEnrollmentsWP())

        })
        .catch(error => {

        })
    } catch (err) {

    }

    setTimeout(() => {
      setEnrollBtnDisabled(false)
    }, 3000)
  }



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourseHeader mode={mode} params={params} setParams={setParams} getAllCourses={getAllCourses} />
      </Grid>
      <Grid item xs={12}>
        <Courses
          courseData={courses}
          studentEnrollments={studentEnrollments}
          params={params}
          setParams={setParams}
          loading={loading}
          createEnrollment={createEnrollment}
          enrollBtnDisabled={enrollBtnDisabled}
          totalPages={totalPages}
        />
      </Grid>
      <Grid item xs={12}>
        <ColoredCards />
      </Grid>
    </Grid>
  )
}

export default PremiumCourses
