'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import WelcomeCard from './WelcomeCard'
import InterestedTopics from './InterestedTopics'
import PopularInstructors from './PopularInstructors'
import TopCourses from './TopCourses'
import UpcomingWebinar from './UpcomingWebinar'
import AssignmentProgress from './AssignmentProgress'

// Data Imports
// import { getAcademyData } from '@/app/server/actions'

import { GET_INSTRUCTOR_DASHBOARD_DATA } from '@/constants/constants'

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({})

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  useEffect(() => {
    const authHeaders = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    }

    try {
      fetch(GET_INSTRUCTOR_DASHBOARD_DATA, authHeaders)
        .then(response => response.json())
        .then(data => {

          setDashboardData(data?.dashboard_data)
        })
        .catch(error => {

        })
    } catch (err) {

    }
  }, [accessToken, csrfToken])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <WelcomeCard data={dashboardData} />
      </Grid>
      <Grid item xs={12} md={8}>
        <InterestedTopics />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <PopularInstructors />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TopCourses />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <UpcomingWebinar />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AssignmentProgress />
      </Grid>
      {/* <Grid item xs={12}>
        <CourseTable courseData={data?.courses} />
      </Grid> */}
    </Grid>
  )
}

export default TeacherDashboard
