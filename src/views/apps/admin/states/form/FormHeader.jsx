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
import { CREATE_STATE, UPDATE_STATE } from '@/constants/constants'

const FormHeader = () => {
  const { stateId, lang: locale } = useParams()
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

  function handleSaveState() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_STATE, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`State create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! State created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/states', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! State create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! State create failed!")
    }
  }

  function handleUpdateState() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_STATE}${stateId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`State update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! State updated successfully!")
          router.replace(getLocalizedUrl('/apps/admin/states', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! State update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! State update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {stateId === 'new' ? 'New Course-Category' : isNumber(stateId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/states">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          stateId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveState}
            >
              Save
            </Button>
            :
            isNumber(stateId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateState}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
