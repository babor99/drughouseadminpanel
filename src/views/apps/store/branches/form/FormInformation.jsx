'use client'

import { useSelector } from 'react-redux'
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Autocomplete from '@mui/material/Autocomplete'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const BranchInformation = () => {
  const cityOptions = useSelector(state => state.data.citys)
  const areaOptions = useSelector(state => state.data.areas)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Branch Information' />
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
                    label="Branch Name"
                    placeholder="Shonir Akhra"
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
              name="city"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    filterSelectedOptions
                    options={cityOptions}
                    value={value ? cityOptions.find(city => value === city.id) : null}
                    getOptionLabel={option => `${option?.name}`}
                    onChange={(e, newValue) => {
                      onChange(newValue?.id)
                    }}
                    renderInput={params => {
                      return (
                        <CustomTextField
                          {...params}
                          placeholder="Select city"
                          variant="outlined"
                          size="small"
                          label="City"
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
              name="area"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    filterSelectedOptions
                    options={areaOptions}
                    value={value ? areaOptions.find(area => value === area.id) : null}
                    getOptionLabel={option => `${option?.name}`}
                    onChange={(e, newValue) => {
                      onChange(newValue?.id)
                    }}
                    renderInput={params => {
                      return (
                        <CustomTextField
                          {...params}
                          placeholder="Select area"
                          variant="outlined"
                          size="small"
                          label="Area"
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
            <div className='flex items-center justify-start'>
              <Typography>Is Active?</Typography>
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => {
                  return (
                    <Switch
                      {...field}
                      id="is_active"
                      checked={field.value}
                    />
                  );
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="postal_code"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="postal_code"
                    variant="outlined"
                    label="Postal Code"
                    placeholder="1234"
                    error={!!errors.postal_code || !field.value}
                    helperText={errors?.postal_code?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="address"
                    variant="outlined"
                    label="Address"
                    placeholder="Shonir Akhra"
                    error={!!errors.address || !field.value}
                    helperText={errors?.address?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="description"
                    variant="outlined"
                    label="Description"
                    placeholder="Shonir Akhra"
                    error={!!errors.description || !field.value}
                    helperText={errors?.description?.message}
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

export default BranchInformation
