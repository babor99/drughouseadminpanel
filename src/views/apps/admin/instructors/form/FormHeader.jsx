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
import { CREATE_INSTRUCTOR, UPDATE_INSTRUCTOR } from '@/constants/constants'

const FormHeader = () => {
  const { instructorId, lang: locale } = useParams()
  const router = useRouter()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const name = watch('name');
  const last_name = watch('last_name');

  const [loading, setLoading] = useState(false)

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  function handleSaveInstructor() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_INSTRUCTOR, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Instructor create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Instructor created successfully!")
          router.replace(getLocalizedUrl('/apps/admin/instructors', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Instructor create failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Instructor create failed!")

    }
  }

  function handleUpdateInstructor() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_INSTRUCTOR}${instructorId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Instructor update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Instructor updated successfully!")
          router.replace(getLocalizedUrl('/apps/admin/instructors', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Instructor update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Instructor update failed!")

    }
  }




  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {instructorId === 'new' ? 'New Instructor' : isNumber(instructorId) && `${name} ${last_name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/admin/instructors">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          instructorId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveInstructor}
            >
              Save
            </Button>
            :
            isNumber(instructorId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateInstructor}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
