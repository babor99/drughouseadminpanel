'use client'

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

const CityInformation = () => {
  const districtOptions = useSelector(state=> state.data.districts)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='City Information' />
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
                    label="City Name"
                    placeholder="Keraniganj"
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
              name="district"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    filterSelectedOptions
                    options={districtOptions}
                    value={value ? districtOptions.find(district => value === district.id) : null}
                    getOptionLabel={option => `${option?.name}`}
                    onChange={(e, newValue) => {
                      onChange(newValue?.id)
                    }}
                    renderInput={params => {
                      return (
                        <CustomTextField
                          {...params}
                          placeholder="Select district"
                          variant="outlined"
                          size="small"
                          label="District"
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
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CityInformation
