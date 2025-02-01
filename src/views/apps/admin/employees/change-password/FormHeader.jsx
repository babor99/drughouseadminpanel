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
import { SET_EMPLOYEE_PASSWORD } from '@/constants/constants';

const FormHeader = () => {
  const { employeeId, lang: locale } = useParams()
  const router = useRouter()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  const [loading, setLoading] = useState(false)

  function setEmployeePassword() {
    setLoading(true)

    const authHeaders = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(getValues())
    }

    try {
      fetch(`${SET_EMPLOYEE_PASSWORD}${employeeId}`, authHeaders)
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Employee set-password failed with status code ${res.status}`)
        })
        .then(data => {

          setLoading(false)
          toast.success("Success! Password changed successfully!")
          router.replace(getLocalizedUrl('/apps/admin/employees', locale))
        })
        .catch(error => {
          setLoading(false)
          toast.error("Failed! Password change failed!")

        })
    } catch (err) {
      setLoading(false)
      toast.error("Failed! Password change failed!")

    }
  }




  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Change Password
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href="/en/apps/employee">
          <Button variant='tonal' color='secondary'>Discard</Button>
        </Link>
        {
          isNumber(employeeId) &&
          <Button
            variant='contained'
            disabled={!isValid || isEmpty(dirtyFields) || loading}
            onClick={setEmployeePassword}
          >
            Set Password
          </Button>
        }
      </div>
    </div>
  )
}

export default FormHeader
