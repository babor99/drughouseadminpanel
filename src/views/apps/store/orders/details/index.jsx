import { useParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailsCard from './OrderDetailsCard'
import ShippingActivity from './ShippingActivityCard'
import CustomerDetails from './CustomerDetailsCard'
import ShippingAddress from './ShippingAddressCard'
import BillingAddress from './BillingAddressCard'

import { GET_ORDER_MASTER_DETAIL_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const OrderDetails = () => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const router = useRouter()
  const { orderId, lang: locale } = useParams()

  const [orderData, setOrderData] = useState({})
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    if (orderId !== 'new' && !isNumber(orderId)) {
        router.replace(getLocalizedUrl('/apps/store/orders', locale))
    }

    if (isNumber(orderId)) {
      getOrderMasterDetail()
    }
}, [orderId])

  function getOrderMasterDetail() {
    const authHeaders = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      }
    }

    try {
      fetch(`${GET_ORDER_MASTER_DETAIL_BY_ID}${orderId}`, authHeaders)
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Order get failed with status code ${res.status}`)
        })
        .then(data => {
          setOrderData(data?.order || {})
          setOrderItems(data?.order_items || [])
        })
        .catch(error => {
        })
    } catch (err) { }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderDetailHeader orderData={orderData} order={'453432'} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <OrderDetailsCard orderData={orderData} orderItems={orderItems} />
          </Grid>
          <Grid item xs={12}>
            <ShippingActivity order={'453432'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomerDetails orderData={orderData} />
          </Grid>
          <Grid item xs={12}>
            <ShippingAddress orderData={orderData} />
          </Grid>
          <Grid item xs={12}>
            <BillingAddress orderData={orderData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrderDetails
