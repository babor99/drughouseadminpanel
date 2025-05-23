'use client'

import { useSelector } from 'react-redux'

import AdminDashboard from '@/views/apps/store/dashboard'
// import RPMDashboard from '@/views/apps/rpm/dashboard'

const Dashboard = () => {
  const isAdmin = useSelector(state => state.user.is_admin)
  const isEmployee = useSelector(state => state.user.is_employee)

  // here all dashboards will be rendered conditionally.

  return <>
    {
      <AdminDashboard />
    }
  </>
}

export default Dashboard
