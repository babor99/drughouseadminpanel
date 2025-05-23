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
import { CREATE_CITY, UPDATE_CITY } from '@/constants/constants'

const FormHeader = () => {
  const { cityId, lang: locale } = useParams()
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

  function handleSaveCity() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_CITY, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`City create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! City created successfully!")
          router.replace(getLocalizedUrl('/apps/store/cities', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! City create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! City create failed!")
    }
  }

  function handleUpdateCity() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_CITY}${cityId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`City update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! City updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/cities', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! City update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! City update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {cityId === 'new' ? 'New Product-Type' : isNumber(cityId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/cities">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          cityId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveCity}
            >
              Save
            </Button>
            :
            isNumber(cityId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateCity}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
