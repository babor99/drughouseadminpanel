'use client'

import { useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { BASE_URL } from '@/constants/constants'

const ProductCategoryInformation = () => {
  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const icon = watch('icon')
  const image = watch('image')

  const [previewIcon, setPreviewIcon] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

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
              Upload Icon (optional)
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-12">
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label
                    htmlFor="button-icon-file"
                    className="flex items-center justify-center relative w-128 h-128 mx-12 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-icon-file"
                      type="file"

                      //onChange={handlePreviewImage}
                      onChange={async e => {
                        const reader = new FileReader();

                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setPreviewIcon(reader.result);
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
              {icon && !previewIcon && (
                <img src={`${BASE_URL}/${icon}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
              )}

              {
                previewIcon && (
                  <img src={previewIcon} style={{ width: '100px', height: '100px' }} alt="Not found" />
                )
              }
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
                    htmlFor="button-image-file"
                    className="flex items-center justify-center relative w-128 h-128 mx-12 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-image-file"
                      type="file"
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
                <img src={`${BASE_URL}/${image}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
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

export default ProductCategoryInformation
