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
import { CREATE_AREA, UPDATE_AREA } from '@/constants/constants'

const FormHeader = () => {
  const { areaId, lang: locale } = useParams()
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

  function handleSaveArea() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_AREA, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Area create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! Area created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/areas', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Area create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Area create failed!")
    }
  }

  function handleUpdateArea() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_AREA}${areaId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Area update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! Area updated successfully!")
          router.replace(getLocalizedUrl('/apps/admin/areas', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Area update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Area update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {areaId === 'new' ? 'New Product-Type' : isNumber(areaId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/areas">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          areaId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveArea}
            >
              Save
            </Button>
            :
            isNumber(areaId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateArea}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
