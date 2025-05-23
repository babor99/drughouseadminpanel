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
import { CREATE_DISCOUNT_TYPE, UPDATE_DISCOUNT_TYPE } from '@/constants/constants'

const FormHeader = () => {
  const { discountTypeId, lang: locale } = useParams()
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

  function handleSaveDiscountType() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_DISCOUNT_TYPE, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`DiscountType create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! DiscountType created successfully!")
          router.replace(getLocalizedUrl('/apps/store/discount-types', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! DiscountType create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! DiscountType create failed!")
    }
  }

  function handleUpdateDiscountType() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_DISCOUNT_TYPE}${discountTypeId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`DiscountType update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! DiscountType updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/discount-types', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! DiscountType update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! DiscountType update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {discountTypeId === 'new' ? 'New Product-Type' : isNumber(discountTypeId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/discount-types">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          discountTypeId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveDiscountType}
            >
              Save
            </Button>
            :
            isNumber(discountTypeId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateDiscountType}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
