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
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

import { genderOptions } from '@/commons/dropdownOptions'

import { isNumber } from '@/commons/utils';

import { BASE_URL } from '@/constants/constants'

const RPMInformation = ({ isSuspended }) => {
  const { studentId } = useParams()

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const image = watch('image')

  const [showPassword, setShowPassword] = useState(false)

  const [previewImage, setPreviewImage] = useState(null)

  return (
    <Card>
      <CardHeader title='Basic Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="last_name"
                    variant="outlined"
                    label="Last Name"
                    placeholder="John"
                    error={!!errors.last_name || !field.value}
                    helperText={errors?.last_name?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="email"
                    variant="outlined"
                    label="Email"
                    placeholder="email@gmail.com"
                    error={!!errors.email || !field.value}
                    helperText={errors?.email?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="phone_number"
                    variant="outlined"
                    label="Phone Number"
                    placeholder="+123 456 7899"
                    error={!!errors.phone_number || !field.value}
                    helperText={errors?.phone_number?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          {studentId === 'new' && (
            <>
              <Grid item xs={12} md={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Password"
                      type="password"
                      error={!!errors.password || !field.value}
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
              <Grid item xs={12} md={6}>
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
                      error={!!errors.confirm_password || !field.value}
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
            </>
          )}
          <Grid item xs={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={genderOptions}
                  value={value ? genderOptions.find(gender => gender.id === value) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {

                    onChange(newValue?.id)
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        placeholder="Select gender"
                        label="Male/ Female (optional)"
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
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="birth_date"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="date"
                    id="birth_date"
                    variant="outlined"
                    label="Date of Birth (optional)"
                    placeholder="09/12/24"

                    // error={!!errors.birth_date || !field.value}
                    helperText={errors?.birth_date?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
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
                    label="Zipcode (optional)"
                    placeholder="31242"

                    // error={!!errors.postal_code || !field.value}
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
          {
            isSuspended && isNumber(studentId) && (
              <Grid item xs={12}>
                <div className='flex items-center justify-start'>
                  <Typography>Suspend?</Typography>
                  <Controller
                    name="is_suspended"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Switch
                          {...field}
                          id="is_suspended"
                          checked={field.value}
                        />
                      );
                    }}
                  />
                </div>
              </Grid>
            )
          }
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
            <Typography className="mt-3 mb-8" variant='h5'>
              Upload Image (optional)
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-12">
              <Controller
                name="image"
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
                <img src={`${BASE_URL}${image}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
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
    </Card>
  )
}

export default RPMInformation
