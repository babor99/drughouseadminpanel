'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  { name: 'Concentration', data: [32, 27, 27, 30, 25, 25] },
  { name: 'Results', data: [25, 35, 20, 20, 20, 20] }
]

const RadarSalesChart = () => {
  // Hooks
  const theme = useTheme()

  // Vars
  const textDisabled = 'var(--mui-palette-text-disabled)'
  const divider = 'var(--mui-palette-divider)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-info-main)'],
    plotOptions: {
      radar: {
        polygons: {
          connectorColors: divider,
          strokeColors: divider
        }
      }
    },
    stroke: { width: 0 },
    fill: {
      opacity: [1, 0.85]
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    markers: { size: 0 },
    legend: {
      fontSize: '13px',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      markers: { offsetY: -1, offsetX: theme.direction === 'rtl' ? 7 : -4 },
      itemMargin: { horizontal: 9 }
    },
    grid: { show: false },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '13px',
          colors: [textDisabled, textDisabled, textDisabled, textDisabled, textDisabled, textDisabled]
        }
      }
    },
    yaxis: { show: false },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 332
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Growth'
        subheader='Last 6 Months'
        action={<OptionMenu options={['Last Month', 'Last 6 months', 'Last Year']} />}
      />
      <CardContent>
        <AppReactApexCharts type='radar' height={373} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default RadarSalesChart
