'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CourseHeader from './CourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'

const MyCourses = ({ mode }) => {
  const studentEnrollments = useSelector(state => state.student?.enrollments)

  const [enrollments, setEnrollments] = useState([])

  const [categoryId, setCategoryId] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [hideCompleted, setHideCompleted] = useState(false)

  useEffect(() => {
    let newEnrollments = studentEnrollments.filter((enrollment) => {
      if (categoryId === null) return !hideCompleted || enrollment?.completed_lectures !== enrollment?.course?.lectures

      return enrollment?.course?.category?.id === categoryId && (!hideCompleted || enrollment?.completed_lectures !== enrollment?.course?.lectures)
    })

    if (searchValue) {
      newEnrollments = newEnrollments.filter((enrollment) => enrollment?.course?.name?.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    }

    setEnrollments(newEnrollments)


  }, [studentEnrollments, searchValue, categoryId, hideCompleted])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourseHeader
          mode={mode}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Courses
          enrollments={enrollments}
          setCategoryId={setCategoryId}
          hideCompleted={hideCompleted}
          setHideCompleted={setHideCompleted}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <ColoredCards />
      </Grid>
      <Grid item xs={12}>
        <FreeCourses />
      </Grid> */}
    </Grid>
  )
}

export default MyCourses
