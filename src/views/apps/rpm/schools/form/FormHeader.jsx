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
import { CREATE_RPM_SCHOOL, UPDATE_RPM_SCHOOL } from '@/constants/constants'

const FormHeader = () => {
  const { schoolId, lang: locale } = useParams()
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

  function handleSaveSchool() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(CREATE_RPM_SCHOOL, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`School create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! School created successfully!")
          router.replace(getLocalizedUrl('/apps/rpm/schools', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.success("Success! School created successfully!")
          toast.error("Failed! School create failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! School create failed!")

    }
  }

  function handleUpdateSchool() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    try {
      fetch(`${UPDATE_RPM_SCHOOL}${schoolId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`School update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! School update successfully!")
          router.replace(getLocalizedUrl('/apps/rpm/schools', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! School update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! School update failed!")

    }
  }




  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {schoolId === 'new' ? 'New School' : isNumber(schoolId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/rpm/schools">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          schoolId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveSchool}
            >
              Save
            </Button>
            :
            isNumber(schoolId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateSchool}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
