import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import { useFormContext } from 'react-hook-form'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getLocalizedUrl } from '@/utils/i18n'
import { isEmpty, isNumber } from '@/commons/utils'
import { CREATE_INSTRUCTOR_COURSE, UPDATE_INSTRUCTOR_COURSE } from '@/constants/constants'
import { getInstructorCoursesWP } from '@/redux-store/slices/instructor'

const FormHeader = () => {
  const { courseId, lang: locale } = useParams()
  const router = useRouter()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const dispatch = useDispatch()

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

  function handleSaveInstructorCourse() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    const duration = formObject['duration']
    const secondsDuration = duration * 60

    formData.append('duration', secondsDuration)

    try {
      fetch(CREATE_INSTRUCTOR_COURSE, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Course create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          dispatch(getInstructorCoursesWP(accessToken, csrfToken))
          router.replace(getLocalizedUrl('/apps/instructor/courses', locale))
        })
        .catch(error => {
          setLoading(false)

        })
    } catch (err) {
      setLoading(false)

    }
  }

  function handleUpdateInstructorCourse() {
    setLoading(true)

    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    const duration = formObject['duration']
    const secondsDuration = duration * 60

    formData.append('duration', secondsDuration)

    try {
      fetch(`${UPDATE_INSTRUCTOR_COURSE}${courseId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Course update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          dispatch(getInstructorCoursesWP(accessToken, csrfToken))
          router.replace(getLocalizedUrl('/apps/instructor/courses', locale))
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
          {courseId === 'new' ? 'New Course' : isNumber(courseId) && `${name && name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href={getLocalizedUrl(`/en/apps/instructor/courses`, locale)}>
          <Button variant='tonal' color='secondary'>Back to Courses</Button>
        </Link>
        {/* {
          courseId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveInstructorCourse}
            >
              Save
            </Button>
            :
            isNumber(courseId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateInstructorCourse}
            >
              Update
            </Button>
        } */}
      </div>
    </div>
  )
}

export default FormHeader
