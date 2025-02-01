import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getLocalizedUrl } from '@/utils/i18n'
import { isEmpty, isNumber } from '@/commons/utils'
import { CREATE_ORDER, UPDATE_ORDER } from '@/constants/constants'

const FormHeader = () => {
  const { orderId, lang: locale } = useParams()
  const router = useRouter()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const name = watch('name');

  const [loading, setLoading] = useState(false)

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  function handleSaveOrder() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_ORDER, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Order create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Order created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/orders', locale))
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
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_ORDER}${orderId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
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
          router.replace(getLocalizedUrl('/apps/admin/orders', locale))
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
          {orderId === 'new' ? 'New Order' : isNumber(orderId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/orders">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          orderId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveOrder}
            >
              Save
            </Button>
            :
            isNumber(orderId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
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
