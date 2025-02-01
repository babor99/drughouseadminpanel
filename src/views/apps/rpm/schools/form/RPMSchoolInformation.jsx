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

const RPMSchoolInformation = () => {
  const { schoolId } = useParams()

  const stateOptions = useSelector(state => state.data.states)
  const regionOptions = useSelector(state => state.data.regions)
  const [filteredRegionOptions, setFilteredRegionOptions] = useState([])

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const state = watch('state')
  const image = watch('logo')
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if (watch('state')) {
      const newRegionOptions = regionOptions.filter((region) => state === region.state)

      setFilteredRegionOptions([...newRegionOptions])


    }

  }, [watch('state')])

  return (
    <Card>
      <CardHeader title='RPMSchool Information' />
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
                    placeholder="Salt Lake City High School"
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
              name="year_started"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="year_started"
                    variant="outlined"
                    label="Year Started"
                    placeholder="2024"
                    error={!!errors.year_started || !field.value}
                    helperText={errors?.year_started?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="state"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  disabled
                  filterSelectedOptions
                  options={stateOptions}
                  value={value ? stateOptions.find(state => state?.id === value) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="State"
                        placeholder="Select state"
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
          <Grid item xs={12}>
            <Controller
              name="region"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={filteredRegionOptions}
                  value={value ? filteredRegionOptions.find(region => value === region?.id) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Region"
                        placeholder="Select region"
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
                    label="Address (optional)"
                    placeholder="23/5, Salt Lake City, Utah"

                    // error={!!errors.address || !field.value}
                    helperText={errors?.address?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="mt-3 mb-8" variant='h5'>
              School Logo (optional)
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-12">
              <Controller
                name="logo"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label
                    htmlFor="button-file"
                    className="flex items-center justify-center relative w-128 h-128 mx-12 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-file"
                      type="file"

                      //onChange={handlePreviewImage}
                      onChange={async e => {
                        const reader = new FileReader();

                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setPreviewImage(reader.result);
                          }
                        };

                        reader.readAsDataURL(e.target.files[0]);

                        const file = e.target.files[0];

                        //;
                        onChange(file);
                      }}
                    />
                    <i className="tabler-cloud-upload" style={{ width: '90px', height: '90px' }} />
                  </label>
                )}
              />
              {image && !previewImage && (
                <img src={`${image}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
              )}

              {
                previewImage && (
                  <img src={previewImage} style={{ width: '100px', height: '100px' }} alt="Not found" />
                )
              }
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}

export default RPMSchoolInformation
