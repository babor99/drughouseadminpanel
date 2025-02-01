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
import { CREATE_EVENT, UPDATE_EVENT } from '@/constants/constants'

const FormHeader = ({ fields, eventPhoto, eventFile }) => {
  const { eventId, lang: locale } = useParams()
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

  function handleSaveEvent() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      if (!['photo', 'file'].includes(key))
        formData.append(key, formObject[key])
    }

    formData.append('fields', JSON.stringify(fields))
    eventPhoto && formData.append('photo', eventPhoto)
    eventFile && formData.append('file', eventFile)

    try {
      fetch(CREATE_EVENT, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Event create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Event created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/events', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Event create failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Event create failed!")

    }
  }

  function handleUpdateEvent() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    formData.append('fields', JSON.stringify(fields))
    eventPhoto && formData.append('photo', eventPhoto)
    eventFile && formData.append('file', eventFile)

    try {
      fetch(`${UPDATE_EVENT}${eventId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Event update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! Event updated successfully!")
          router.replace(getLocalizedUrl('/apps/admin/events', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Event update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Event update failed!")

    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {eventId === 'new' ? 'New Event' : isNumber(eventId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/events">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          eventId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveEvent}
            >
              Save
            </Button>
            :
            isNumber(eventId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateEvent}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
