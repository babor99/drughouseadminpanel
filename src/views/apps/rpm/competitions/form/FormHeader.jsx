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
import { CREATE_COMPETITION, UPDATE_COMPETITION } from '@/constants/constants'

const FormHeader = ({ fields, competitionPhoto, competitionFile }) => {
  const { competitionId, lang: locale } = useParams()
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

  function handleSaveCompetition() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      if (!['photo', 'file'].includes(key))
        formData.append(key, formObject[key])
    }

    formData.append('fields', JSON.stringify(fields))
    competitionPhoto && formData.append('photo', competitionPhoto)
    competitionFile && formData.append('file', competitionFile)

    try {
      fetch(CREATE_COMPETITION, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Competition create failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Competition created successfully!")
          router.replace(getLocalizedUrl('/apps/rpm/competitions', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Competition create failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Competition create failed!")

    }
  }

  function handleUpdateCompetition() {
    setLoading(true)
    const formData = new FormData()
    const formObject = getValues()

    for (let key in formObject) {
      formData.append(key, formObject[key])
    }

    formData.append('fields', JSON.stringify(fields))
    competitionPhoto && formData.append('photo', competitionPhoto)
    competitionFile && formData.append('file', competitionFile)

    try {
      fetch(`${UPDATE_COMPETITION}${competitionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: formData,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Competition update failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Competition updated successfully!")
          router.replace(getLocalizedUrl('/apps/rpm/competitions', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Competition update failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Competition update failed!")

    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {competitionId === 'new' ? 'New Competition' : isNumber(competitionId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/rpm/competitions">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          competitionId === 'new' ?
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleSaveCompetition}
            >
              Save
            </Button>
            :
            isNumber(competitionId) &&
            <Button
              variant='contained'
              disabled={!isValid || isEmpty(dirtyFields) || loading}
              onClick={handleUpdateCompetition}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
