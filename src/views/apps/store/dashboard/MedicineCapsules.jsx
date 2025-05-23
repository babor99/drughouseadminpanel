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
          <i className='tabler-capsule text-[28px]' />
        </CustomAvatar>
        <div className='flex flex-col gap-y-1'>
        <Typography variant='h6'>Capsules ({data?.product_counts?.total_capsule_types_count})</Typography>
          <Typography variant='h5' color='text.primary'>{data?.product_counts?.total_capsules_count} qty</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
