import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getLocalizedUrl } from '@/utils/i18n'
import { isEmpty, isNumber } from '@/commons/utils'
import { CREATE_LOCAL_ORDER, UPDATE_LOCAL_ORDER } from '@/constants/constants'
import { getProductsWP } from '@/redux-store/slices/data'

const FormHeader = ({ orderItems }) => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const router = useRouter()
  const dispatch = useDispatch()
  const { orderId, lang: locale } = useParams()

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const status = watch('status');
  const payment_method = watch('payment_method');
  const customer_name = watch('customer_name');
  const customer_phone = watch('customer_phone');
  const customer_email = watch('customer_email');

  const [loading, setLoading] = useState(false)

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    }
  }

  function handleSaveOrder() {
    setLoading(true)

    try {
      fetch(CREATE_LOCAL_ORDER, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({order_items: orderItems, customer_name, customer_phone, customer_email, status, payment_method}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Order create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          dispatch(getProductsWP(accessToken, csrfToken))
          toast.success("Success! Order created successfully!")
          router.replace(getLocalizedUrl('/apps/store/orders', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Order create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Order create failed!")

    }
  }

  function handleUpdateOrder() {
    setLoading(true)

    try {
      fetch(`${UPDATE_LOCAL_ORDER}${orderId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({order_items: orderItems, customer_name, customer_phone, customer_email, status, payment_method}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Order update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Order updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/orders', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Order update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Order update failed!")

    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {orderId === 'new' && 'New Order'}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/orders">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          orderId === 'new' ?
            <Button
              variant='contained'
              disabled={!orderItems.length || !customer_name?.length || !customer_phone?.length || !status || !payment_method || loading}
              onClick={handleSaveOrder}
            >
              Save
            </Button>
            :
            isNumber(orderId) &&
            <Button
              variant='contained'
              disabled={!orderItems.length || !customer_name?.length || !customer_phone?.length || !status || !payment_method || loading}
              onClick={handleUpdateOrder}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
