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
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/constants/constants'

const FormHeader = () => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { productId, lang: locale } = useParams()

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const name = watch('name');

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  function handleSaveProduct() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_PRODUCT, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Product create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Product created successfully!")
          router.replace(getLocalizedUrl('/apps/store/products', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Product create failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Product create failed!")

    }
  }

  function handleUpdateProduct() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_PRODUCT}${productId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Product update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Product updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/products', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Product update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Product update failed!")

    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {productId === 'new' ? 'New Product' : isNumber(productId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/products">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          productId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveProduct}
            >
              Save
            </Button>
            :
            isNumber(productId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateProduct}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
