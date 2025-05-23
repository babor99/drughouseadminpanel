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
import { CREATE_ROLE_MENU, UPDATE_ROLE_MENU } from '@/constants/constants'

const FormHeader = () => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)
  const roleOptions = useSelector(state => state.data.roles)

  const { roleMenuId, lang: locale } = useParams()
  const router = useRouter()


  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const roleId = watch('role');

  console.log('roleId: ', roleId)

  const [loading, setLoading] = useState(false)

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    }
  }

  function handleSaveRoleMenu() {
    setLoading(true)
    const data = getValues()

    try {
      fetch(CREATE_ROLE_MENU, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({id: data?.id, role: data?.role, menu_items: data?.menu_items}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`RoleMenu create failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! RoleMenu created successfully!")
          router.replace(getLocalizedUrl('/apps/store/role-menus', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! RoleMenu create failed!")
        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! RoleMenu create failed!")
    }
  }

  function handleUpdateRoleMenu() {
    setLoading(true)
    const data = getValues()

    try {
      fetch(`${UPDATE_ROLE_MENU}${roleMenuId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({id: data?.id, role: data?.role, menu_items: data?.menu_items}),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`RoleMenu update failed with status code ${res.status}`)
        })
        .then(data => {
          setLoading(false)
          toast.success("Success! RoleMenu updated successfully!")
          router.replace(getLocalizedUrl('/apps/store/role-menus', locale))
        })
        .catch(error => {
          console.log('error: ', error)
          setLoading(false)
          toast.error("Failed! RoleMenu update failed!")
        })
    } catch (err) {
      console.log('err: ', err)
      setLoading(false)
      toast.error("Failed! RoleMenu update failed!")
    }
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {roleMenuId === 'new' ? 'New Product-Type' : isNumber(roleMenuId) && `${roleOptions.find(role => roleId === role.id)?.name}`}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/store/role-menus">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          roleMenuId === 'new' ?
            <Button
              variant='contained'
              disabled={loading}
              onClick={handleSaveRoleMenu}
            >
              Save
            </Button>
            :
            isNumber(roleMenuId) &&
            <Button
              variant='contained'
              disabled={loading}
              onClick={handleUpdateRoleMenu}
            >
              Update
            </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
