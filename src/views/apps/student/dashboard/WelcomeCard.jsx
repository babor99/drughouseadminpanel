'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const WelcomeCard = ({ data }) => {
  // Hooks
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

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
    <div className='flex max-md:flex-col md:items-center gap-6 plb-6'>
      <div className='md:is-8/12'>
        <div className='flex flex-wrap max-md:flex-col justify-around gap-4'>
          <div>
            <div className='flex gap-4'>
              <CustomAvatar variant='rounded' skin='light' size={54} color="info">
                <i className="tabler-calendar-event" />
              </CustomAvatar>
              <div>
                <Typography variant='h6' className='font-medium'>
                  Events
                </Typography>
                <Typography variant='h4' color="info.main">
                  {data?.total_events_count}
                </Typography>
              </div>
            </div>
            <div>
              <Typography>Attended: {data?.attended_events_count}</Typography>
              <Typography>Upcoming: {data?.upcoming_events_count}</Typography>
            </div>
          </div>

          <div>
            <div className='flex gap-4'>
              <CustomAvatar variant='rounded' skin='light' size={54} color="warning">
                <i className="tabler-windmill" />
              </CustomAvatar>
              <div>
                <Typography variant='h6' className='font-medium'>
                  Competitions
                </Typography>
                <Typography variant='h4' color="warning.main">
                  {data?.total_competitions_count}
                </Typography>
              </div>
            </div>
            <div>
              <Typography>Participated: {data?.participated_competitions_count}</Typography>
              <Typography>Upcoming: {data?.upcoming_competitions_count}</Typography>
            </div>
          </div>

          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color="primary">
              <i className="tabler-notebook" />
            </CustomAvatar>
            <div>
              <Typography variant='h6' className='font-medium'>
                Courses
              </Typography>
              <Typography variant='h4' color="primary.main">
                {data?.enrolled_courses_count || 0}
              </Typography>
            </div>
          </div>

          {/* <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color="error">
              <i className="tabler-clock" />
            </CustomAvatar>
            <div>
              <Typography variant='h6' className='font-medium'>
                This Week&apos;s Service
              </Typography>
              <Typography variant='h4' color="error.main">
                {data?.this_week_service_hours !== 0 ? secondsToHumanReadable(data?.this_week_service_hours) : 0} hrs
              </Typography>
            </div>
          </div> */}

        </div>
      </div>

      {/* <Divider orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem /> */}
      {/* <div className='flex justify-between md:is-4/12'>
        <div className='flex flex-col justify-between gap-6'>
          <div>
            <Typography variant='h5' className='mbe-1'>
              Total Service Hours
            </Typography>
          </div>
          <div>
            <Typography variant='h4' className='mbe-2'>
              {data?.total_service_hours ? secondsToHumanReadable(data?.total_service_hours) : 0}
            </Typography>
            <Chip label='+18.4%' variant='tonal' size='small' color='success' />
          </div>
        </div>
        <AppReactApexCharts type='donut' height={250} width={190} options={options} series={[23, 35, 10, 20, 35, 23]} />
      </div> */}

    </div>
  )
}

export default WelcomeCard
