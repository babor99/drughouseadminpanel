'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const WelcomeCard = ({ data }) => {
  // Hooks
  const theme = useTheme()

  function secondsToHumanReadable(seconds) {
    // const days = Math.floor(seconds / (24 * 60 * 60))
    // seconds %= 24 * 60 * 60
    const hours = Math.floor(seconds / (60 * 60))

    seconds %= 60 * 60
    const minutes = Math.floor(seconds / 60)

    // seconds %= 60

    const duration = []

    // if (days > 0) duration.push(`${days} day${days > 1 ? 's' : ''}`)
    if (hours > 0) duration.push(`${hours}h`)
    if (minutes > 0) duration.push(`${minutes}m`)

    // if (seconds > 0) duration.push(`${seconds} second${seconds > 1 ? 's' : ''}`)

    return duration.join(' ')
  }

  // Vars
  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        left: 20,
        right: 20
      }
    },
    colors: [
      darken(theme.palette.success.main, 0.15),
      darken(theme.palette.success.main, 0.1),
      'var(--mui-palette-success-main)',
      lighten(theme.palette.success.main, 0.2),
      lighten(theme.palette.success.main, 0.4),
      lighten(theme.palette.success.main, 0.6)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['36h', '56h', '16h', '32h', '56h', '16h'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 20,
              fontSize: '0.875rem'
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.125rem',
              formatter: value => `${value}%`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              fontSize: '0.8125rem',
              label: 'Total',
              color: 'var(--mui-palette-text-disabled)',
              formatter: () => data?.total_service_hours ? secondsToHumanReadable(data?.total_service_hours) : 0
            }
          }
        }
      }
    }
  }

  return (
    <div className='flex flex-wrap max-md:flex-col items-center justify-around gap-6 plb-6'>

      <div>
        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color="primary">
            <i className="tabler-location" />
          </CustomAvatar>
          <div>
            <Typography variant='h6' className='font-medium'>
              State
            </Typography>
            <Typography variant='h6' color="primary.main">
              {data?.state_name || 'n/a'}
            </Typography>
          </div>
        </div>
      </div>

      <div>
        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color="primary">
            <i className="tabler-location" />
          </CustomAvatar>
          <div>
            <Typography variant='h6' className='font-medium'>
              District
            </Typography>
            <Typography variant='h6' color="primary.main">
              {data?.region_name || 'n/a'}
            </Typography>
          </div>
        </div>
      </div>

      <div>
        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color="info">
            <i className="tabler-school" />
          </CustomAvatar>
          <div>
            <Typography variant='h6' className='font-medium'>
              Schools
            </Typography>
            <Typography variant='h4' color="info.main">
              {data?.total_schools_count || 'n/a'}
            </Typography>
          </div>
        </div>
      </div>

      <div>
        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color="warning">
            <i className="tabler-section" />
          </CustomAvatar>
          <div>
            <Typography variant='h6' className='font-medium'>
              Sections
            </Typography>
            <Typography variant='h4' color="warning">
              {data?.total_sections_count || 'n/a'}
            </Typography>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WelcomeCard
