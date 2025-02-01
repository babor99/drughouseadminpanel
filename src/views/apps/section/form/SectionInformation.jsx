'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

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

import { genderOptions } from '@/commons/dropdownOptions'

import { BASE_URL } from '@/constants/constants'

const SectionInformation = () => {
  const { sectionId } = useParams()

  const schoolOptions = useSelector(state => state.data.schools)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Section Information' />
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
                    label="Name"
                    placeholder="Section 1"
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
              name="school"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={schoolOptions}
                  value={value ? schoolOptions.find(school => school?.id === value) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="school"
                        placeholder="Select school"
                        variant="outlined"
                        size="small"
                        error={!!errors.state || !value}
                        helperText={errors?.state?.message}
                        InputLabelProps={value && { shrink: true }}
                      />
                    );
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}

export default SectionInformation
