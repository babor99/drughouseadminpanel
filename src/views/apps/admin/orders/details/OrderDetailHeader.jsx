// MUI Imports
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Component Imports
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

export const paymentStatus = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}
export const statusChipColor = {
  'PENDING': { color: 'info' },
  'SHIPPED': { color: 'primary' },
  'DELIVERED': { color: 'success' },
  'CANCELLED': { color: 'warning' }
}

const OrderDetailHeader = ({ orderData, order }) => {
  // Vars
  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <div className='flex flex-wrap justify-between sm:items-center max-sm:flex-col gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <div className='flex items-center gap-2'>
          <Typography variant='h5'>{`Order #${order}`}</Typography>
          <Chip
            variant='tonal'
            label={orderData?.status?.name}
            color={statusChipColor[orderData?.status?.name || '']?.color}
            size='small'
          />
          <Chip
            variant='tonal'
            label={orderData?.is_paid ? 'PAID' : 'PENDING' }
            color={orderData?.is_paid ? 'success' : 'warning'}
            size='small'
          />
        </div>
        <Typography>{`${new Date(orderData?.date ?? '').toDateString()}, ${orderData?.time} (ET)`}</Typography>
      </div>
      <OpenDialogOnElementClick
        element={Button}
        elementProps={buttonProps('Delete Order', 'error', 'tonal')}
        dialog={ConfirmationDialog}
        dialogProps={{ type: 'delete-order' }}
      />
    </div>
  )
}

export default OrderDetailHeader
