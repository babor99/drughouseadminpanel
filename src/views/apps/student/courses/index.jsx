'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CourseHeader from './CourseHeader'
import CourseList from './CourseList'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'

import { objectToQueryString } from '@/commons/utils'
import { GET_COURSES, CREATE_ENROLLMENT } from '@/constants/constants'
import { getStudentEnrollmentsWP } from '@/redux-store/slices/student'

const Courses = ({ courseData, mode }) => {
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

  useEffect(() => {
    getAllCourses()
  }, [params.page, params.size, params.category])

  const getAllCourses = () => {
    setLoading(true)

    try {
      fetch(`${GET_COURSES}?${objectToQueryString(params)}`, authHeaders)
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
          toast.success("Success! Enrolled successfully!")

        })
        .catch(error => {
          toast.error("Failed! Enrollment failed!")

        })
    } catch (err) {
      toast.error("Failed! Enrollment failed!")

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
        <CourseList
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
    </Grid>
  )
}

export default Courses
