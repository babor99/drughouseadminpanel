'use client'

import { useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { InputAdornment, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const InstructorPasswordForm = () => {
  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card>
      <CardHeader title='' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} md={8}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          <i className={showPassword ? 'tabler-eye' : 'tabler-eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={field.value && { shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type="password"
                  variant="outlined"
                  label="Confirm Password"
                  error={!!errors.confirm_password}
                  helperText={errors?.confirm_password?.message}
                  InputProps={{
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          <i className={showPassword ? 'tabler-eye' : 'tabler-eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={field.value && { shrink: true }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InstructorPasswordForm
