// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Component Import
import CustomAvatar from '@core/components/mui/Avatar'

const CardStatsVertical = ({ data }) => {

  return (
    <Card>
      <CardContent className='flex flex-col gap-y-3 items-start'>
        <CustomAvatar variant='rounded' skin='light' size={44} color='primary'>
          <i className='tabler-circle text-[28px]' />
        </CustomAvatar>
        <div className='flex flex-col gap-y-1'>
          <Typography variant='h6'>Tablets ({data?.product_counts?.total_tablet_types_count})</Typography>
          <Typography variant='h5' color='text.primary'>{data?.product_counts?.total_tablets_count} qty</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
