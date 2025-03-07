'use client'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const RegionInformation = () => {
  const { stateId } = useParams()
  const stateOptions = useSelector(state => state.data.states)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Region Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name="state"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    filterSelectedOptions
                    options={stateOptions}
                    value={value ? stateOptions.find(state => value === state.id) : null}
                    getOptionLabel={option => `${option?.name}`}
                    onChange={(e, newValue) => {
                      onChange(newValue?.id)
                    }}
                    renderInput={params => {
                      return (
                        <CustomTextField
                          {...params}
                          placeholder="Select state"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      );
                    }}
                    getOptionKey={option => option?.id}
                  />
                );
              }}
            />
          </Grid>
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
                    placeholder="Region name"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RegionInformation
