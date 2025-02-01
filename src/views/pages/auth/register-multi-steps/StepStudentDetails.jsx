// React Imports
import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Autocomplete } from '@mui/material'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'

import { getLocalizedUrl } from '@/utils/i18n'

import { genderOptions, ethnicityOptions } from '@/commons/dropdownOptions'

const StepStudentDetails = ({ formData, handleNext, handleInputChange }) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [errors, setErrors] = useState({})

  const handleClickShowPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  const isPasswordValid = password => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailRegex.test(email)) {
      setIsEmailValid(true)
      setErrors(prevErrors => ({
        ...prevErrors,
        email: null
      }))

      return
    }

    setIsEmailValid(false)
    setErrors(prevErrors => ({
      ...prevErrors,
      email: 'Valid email is required'
    }))
  }

  useEffect(() => {
    validateEmail(formData?.email)
  }, [])

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Student Details</Typography>
        <Typography>Enter Your Personal Information</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='First Name'
            placeholder='John'
            autoComplete='false'
            value={formData.name}
            onChange={e => {
              handleInputChange('name', e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Last Name'
            placeholder='Doe'
            autoComplete='false'
            value={formData.last_name}
            onChange={e => {
              handleInputChange('last_name', e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Email'
            type='email'
            placeholder='john.doe@gmail.com'
            autoComplete='false'
            value={formData.email}
            onChange={e => {
              validateEmail(e.target.value)
              handleInputChange('email', e.target.value)
            }}
            error={!isEmailValid}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Phone Number'
            placeholder='+1 123 456 7890'
            value={formData.phone_number}
            onChange={e => {
              handleInputChange('phone_number', e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Password'
            placeholder='············'
            autoComplete='false'
            id='outlined-adornment-password'
            type={isPasswordShown ? 'text' : 'password'}
            value={formData?.password}
            onChange={e => {
              handleInputChange('password', e.target.value)
            }}
            error={!isPasswordValid(formData?.password)}
            helperText={
              !isPasswordValid(formData?.password) &&
              'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Confirm Password'
            placeholder='············'
            autoComplete='false'
            id='outlined-confirm-password'
            type={isPasswordShown ? 'text' : 'password'}
            value={formData?.confirm_password}
            onChange={e => {
              handleInputChange('confirm_password', e.target.value)
            }}
            error={formData?.confirm_password !== formData?.password}
            helperText={formData?.confirm_password !== formData?.password && 'Passwords do not match.'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle confirm password visibility'
                  >
                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            filterSelectedOptions
            value={formData?.ethnicities ? ethnicityOptions.filter(ethnicity => formData?.ethnicities.includes(ethnicity.id)) : []}
            options={ethnicityOptions}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValues) => {
              const ethnicityIds = newValues.map(obj => obj.id)


              handleInputChange('ethnicities', ethnicityIds)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='Race/Ethnicity(Check all that apply)'
                placeholder='Select Ethnicity'
                error={!!errors.ethnicities}
                helperText={errors.ethnicities || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            filterSelectedOptions
            value={formData?.gender ? genderOptions.find(gender => gender.id === formData?.gender) : null}
            options={genderOptions}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValue) => {
              handleInputChange('gender', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='Gender'
                placeholder='Select Gender'
                error={!!errors.gender}
                helperText={errors.gender || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            type='number'
            label='Approximately how many hours of community service have you completed in the past year including Tutoring?'
            placeholder='5'
            autoComplete='false'
            value={formData.community_service_hours}
            onChange={e => {
              handleInputChange('community_service_hours', e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button onClick={() => router.push(getLocalizedUrl('/login', locale))}>Back to login page</Button>
          <Button
            variant='contained'
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
            disabled={
              formData?.confirm_password !== formData?.password ||
              !isPasswordValid(formData?.password) ||
              !isEmailValid ||
              !formData?.name ||
              !formData.last_name ||
              !formData?.email ||
              !formData?.phone_number ||
              !formData?.ethnicities?.length ||
              !formData?.gender ||
              !formData?.community_service_hours
            }
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepStudentDetails
