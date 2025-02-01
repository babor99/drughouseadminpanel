import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { useFormContext } from 'react-hook-form'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getLocalizedUrl } from '@/utils/i18n'
import { isEmpty, isNumber } from '@/commons/utils'
import { CREATE_LECTURE, UPDATE_INSTRUCTOR_LECTURE } from '@/constants/constants'

const FormHeader = () => {
  const { lectureId, lang: locale } = useParams()
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

  function handleSaveInstructorLecture() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_LECTURE, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Lecture create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          router.replace(getLocalizedUrl('/apps/instructor/lectures', locale))
        })
        .catch(error => {
          setLoading(false)

        })
    } catch (err) {
      setLoading(false)

    }
  }

  function handleUpdateInstructorLecture() {
    setLoading(true)

    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_INSTRUCTOR_LECTURE}${lectureId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Lecture update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          router.replace(getLocalizedUrl('/apps/instructor/lectures', locale))
        })
        .catch(error => {
          setLoading(false)

        })
    } catch (err) {
      setLoading(false)

    }
  }




  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {lectureId === 'new' ? 'New Lecture' : isNumber(lectureId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href={getLocalizedUrl(`/en/apps/instructor/lectures`, locale)}>
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          lectureId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveInstructorLecture}
            >
              Save
            </Button>
            :
            isNumber(lectureId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateInstructorLecture}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
