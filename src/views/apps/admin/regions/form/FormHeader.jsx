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
import { CREATE_REGION, UPDATE_REGION } from '@/constants/constants'

const FormHeader = () => {
  const { regionId, lang: locale } = useParams()
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

  function handleSaveRegion() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_REGION, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Region create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! Region created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/regions', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Region create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Region create failed!")
    }
  }

  function handleUpdateRegion() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_REGION}${regionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Region update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! Region updated successfully!")
          router.replace(getLocalizedUrl('/apps/admin/regions', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Region update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Region update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {regionId === 'new' ? 'New Course-Category' : isNumber(regionId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/regions">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          regionId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveRegion}
            >
              Save
            </Button>
            :
            isNumber(regionId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateRegion}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
