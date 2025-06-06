// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Component Imports
import AddAddress from '@components/dialogs/add-edit-address'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

// Vars
const data = {
  firstName: 'Roker',
  lastName: 'Terrace',
  email: 'sbaser0@boston.com',
  country: 'UK',
  address1: 'Latheronwheel',
  address2: 'KW5 8NW, London',
  landmark: 'Near Water Plant',
  city: 'London',
  state: 'Capholim',
  zipCode: '403114',
  taxId: 'TAX-875623',
  vatNumber: 'SDF754K77',
  contact: '+1 (609) 972-22-22'
}

const ShippingAddress = ({orderData}) => {
  // Vars
  const typographyProps = (children, color, className) => ({
    children,
    color,
    className
  })

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Typography variant='h5'>Shipping Address</Typography>
          <OpenDialogOnElementClick
            element={Typography}
            elementProps={typographyProps('Edit', 'primary', 'cursor-pointer font-medium')}
            dialog={AddAddress}
            dialogProps={{ type: 'Add address for billing address', data }}
          />
        </div>
        <div className='flex flex-col'>
          <Typography>Name: { orderData?.shippingaddress?.name} </Typography>
          <Typography>Email: { orderData?.shippingaddress?.email}</Typography>
          <Typography>Phone: { orderData?.shippingaddress?.phone}</Typography>
        </div>
        <div className='flex flex-col'>
          <Typography className='font-bold'>Address:</Typography>
          <Typography>{ orderData?.shippingaddress?.address}, { orderData?.shippingaddress?.zipcode}</Typography>
          <Typography>{ orderData?.shippingaddress?.area?.name}</Typography>
          <Typography>{ orderData?.shippingaddress?.city?.name}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingAddress
