import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardStatVertical from '@/components/card-statistics/Vertical'
import MedicineTypeListTable from './MedicineTypeListTable'

import { GET_ADMIN_DASHBOARD_DATA } from '@/constants/constants'
import { getLocalizedUrl } from '@/utils/i18n'

const AdminDashboard = () => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const [dashboardData, setDashboardData] = useState({})
  const [productTypes, setProductTypes] = useState([])

  const { lang: locale } = useParams()

  useEffect(() => {
    getAdminDashboardData()
  }, [accessToken, csrfToken])

  const getAdminDashboardData = () => {
    const authHeaders = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    }

    try {
      fetch(GET_ADMIN_DASHBOARD_DATA, authHeaders)
        .then(response => {
          if (response.ok && [200, 201].includes(response.status)) {
            return response.json()
          }

          throw new Error(`Admin dashboard data fetch failed with status code ${response.status}`)
        })
        .then(data => {
          console.log('dashboard-data: ', data)
          setDashboardData(data?.counts)
          setProductTypes(data?.product_types_list)
        })
        .catch(error => { })
    } catch (err) { }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href={getLocalizedUrl(`/apps/admin/low_stock_products`, locale)}>
          <CardStatVertical
            title='Low Stock Products'

            // subtitle='Last Week'
            stats={dashboardData?.total_low_stock_products_count || 'n/a'}
            avatarColor='primary'
            avatarIcon='tabler-medical-cross-off'
            avatarSkin='light'
            avatarSize={44}

            // chipText='from establishment'
            chipColor='primary'
            chipVariant='tonal'
          />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CardStatVertical
          title='Districts'

          // subtitle='Last Week'
          stats={dashboardData?.total_states_count || 'n/a'}
          avatarColor='primary'
          avatarIcon='tabler-location'
          avatarSkin='light'
          avatarSize={44}

          // chipText='from establishment'
          chipColor='primary'
          chipVariant='tonal'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CardStatVertical
          title='Cities'

          // subtitle='Last Week'
          stats={dashboardData?.total_cities_count || 'n/a'}
          avatarColor='success'
          avatarIcon='tabler-location'
          avatarSkin='light'
          avatarSize={44}

          // chipText='from establishment'
          chipColor='success'
          chipVariant='tonal'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CardStatVertical
          title='Branches'

          // subtitle='Last Week'
          stats={dashboardData?.total_branches_count || 'n/a'}
          avatarColor='primary'
          avatarIcon='tabler-building-store'
          avatarSkin='light'
          avatarSize={44}

          // chipText='from establishment'
          chipColor='primary'
          chipVariant='tonal'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CardStatVertical
          title='Employees'

          // subtitle='Last Week'
          stats={dashboardData?.total_employees_count || 'n/a'}
          avatarColor='success'
          avatarIcon='tabler-users'
          avatarSkin='light'
          avatarSize={44}

          // chipText='from establishment'
          chipColor='success'
          chipVariant='tonal'
        />
      </Grid>
      <Grid item xs={12}>
        <MedicineTypeListTable productTypes={productTypes} />
      </Grid>
    </Grid>
  )
}

export default AdminDashboard
