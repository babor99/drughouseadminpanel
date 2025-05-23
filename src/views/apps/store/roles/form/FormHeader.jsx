import { useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getLocalizedUrl } from '@/utils/i18n'
import { isEmpty, isNumber } from '@/commons/utils'
import { getRolesWP } from '@/redux-store/slices/data'
import { CREATE_ROLE, UPDATE_ROLE } from '@/constants/constants'

const FormHeader = () => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const { roleId, lang: locale } = useParams()
  const router = useRouter()
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
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    }
  }

  function handleSaveRole() {
    setLoading(true)
    const data = getValues()

    console.log('getValues(): ', data)

    try {
      fetch(CREATE_ROLE, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({id: data?.id, name: data?.name, permissions: data?.permissions}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Role create failed with status code ${res.status}`)
        })
        .then(data => {
          dispatch(getRolesWP(accessToken, csrfToken))
          setLoading(false)
          toast.success("Success! Role created successfully!")
          router.replace(getLocalizedUrl('/apps/store/roles', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Role create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Role create failed!")
    }
  }

  function handleUpdateRole() {
    setLoading(true)
    const data = getValues()
    console.log('getValues(): ', data)

    try {
      fetch(`${UPDATE_ROLE}${roleId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({id: data?.id, name: data?.name, permissions: data?.permissions}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Role update failed with status code ${res.status}`)
        })
        .then(data => {
          dispatch(getRolesWP(accessToken, csrfToken))
          setLoading(false)
          toast.success("Success! Role updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/roles', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Role update failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Role update failed!")
    }
  }

  console.log(isValid)

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {roleId === 'new' ? 'New Product-Type' : isNumber(roleId) && `${name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/roles">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          roleId === 'new' ?
            <Button
              variant='contained'
              disabled={loading}
              onClick={handleSaveRole}
            >
              Save
            </Button>
            :
            isNumber(roleId) &&
            <Button
              variant='contained'
              disabled={loading}
              onClick={handleUpdateRole}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
