// MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Component Import
import CustomAvatar from '@core/components/mui/Avatar'

const CardStatsVertical = ({ data }) => {

  return (
    <Card>
      <CardContent className='flex flex-col gap-y-3 items-start'>
        <CustomAvatar variant='rounded' skin='light' size={44} color='primary'>
          <i className='tabler-medical-cross text-[28px]' />
        </CustomAvatar>
        <div className='flex flex-col gap-y-1'>
          <Typography variant='h6'>Medicine Types ({data?.product_counts?.total_product_types_count})</Typography>
          <Typography variant='h5' color='text.primary'>{data?.product_counts?.total_products_count} qty</Typography>
        </div>
        {/* <Chip label={chipText} color={chipColor} variant={chipVariant} size='small' /> */}
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
