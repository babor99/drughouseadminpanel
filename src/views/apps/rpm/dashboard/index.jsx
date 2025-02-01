'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import WelcomeCard from './WelcomeCard'
import RPMStudentList from './students/list'

// Data Imports
// import { getAcademyData } from '@/app/server/actions'

import { GET_RPM_DASHBOARD_DATA } from '@/constants/constants'

const RPMDashboard = () => {
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
      fetch(GET_RPM_DASHBOARD_DATA, authHeaders)
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
      <Grid item xs={12}>
        <RPMStudentList />
      </Grid>
    </Grid>
  )
}

export default RPMDashboard
