'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { Autocomplete, InputAdornment, IconButton, Icon } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import { colorCodeOptions } from '@/commons/dropdownOptions'

const CourseCategoryInformation = () => {
  const { courseCategoryId } = useParams()

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Category Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="name"
                    variant="outlined"
                    label="First Name"
                    placeholder="John"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="color_code"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={colorCodeOptions}
                  value={value ? colorCodeOptions.find(color => value === color?.id) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Color code"
                        placeholder="Select color code"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    );
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CourseCategoryInformation
