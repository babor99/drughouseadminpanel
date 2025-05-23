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

import { BASE_URL } from '@/constants/constants'

const ProductInformation = () => {
  const branchOptions = useSelector(state => state.data.branchs || [])
  const categoryOptions = useSelector(state => state.data.productCategorys || [])
  const productTypeOptions = useSelector(state => state.data.productTypes || [])
  const manufacturerOptions = useSelector(state => state.data.manufacturers || [])
  
  const { productId } = useParams()
  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const image = watch('thumbnail')
  const [previewImage, setPreviewImage] = useState(null)

  return (
    <Card>
      <CardHeader title='Product Information' />
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
                    placeholder="Product name"
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
              name="quantity"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="quantity"
                    variant="outlined"
                    label="Quantity"
                    placeholder="12"
                    error={!!errors.quantity || !field.value}
                    helperText={errors?.quantity?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="unit_price"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="unit_price"
                    variant="outlined"
                    label="Unit Price"
                    placeholder="6.34"
                    error={!!errors.unit_price || !field.value}
                    helperText={errors?.unit_price?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="old_price"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="old_price"
                    variant="outlined"
                    label="Old Price"
                    placeholder="6.12"
                    error={!!errors.old_price || !field.value}
                    helperText={errors?.old_price?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="branch"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={branchOptions}
                  value={value ? branchOptions.find(branch => branch?.id === value) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id)
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Branch"
                        placeholder="Select branch"
                        variant="outlined"
                        size="small"
                        error={!!errors.branch || !value}
                        helperText={errors?.branch?.message}
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
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={categoryOptions}
                  value={value ? categoryOptions.find(category => value === category?.id) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Category"
                        placeholder="Select category"
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
              name="product_type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={productTypeOptions}
                  value={value ? productTypeOptions.find(product_type => value === product_type?.id) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Product Type"
                        placeholder="Select product-type"
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
              name="manufacturer"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={manufacturerOptions}
                  value={value ? manufacturerOptions.find(manufacturer => value === manufacturer?.id) : null}
                  getOptionKey={option => option?.id}
                  getOptionLabel={option => `${option.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id);
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        label="Manufacturer"
                        placeholder="Select manufacturer"
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
            <div className='flex items-center justify-start'>
              <Typography>Is Published?</Typography>
              <Controller
                name="is_published"
                control={control}
                render={({ field }) => {
                  return (
                    <Switch
                      {...field}
                      id="is_published"
                      checked={field.value}
                    />
                  );
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sku"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="sku"
                    variant="outlined"
                    label="SKU"
                    placeholder="sku34gs343"

                    // error={!!errors.sku || !field.value}
                    helperText={errors?.sku?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="gtin"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="gtin"
                    variant="outlined"
                    label="GTIN"
                    placeholder="gtin3few3"

                    // error={!!errors.gtin || !field.value}
                    helperText={errors?.gtin?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="short_description"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="short_description"
                    variant="outlined"
                    label="Short Description"
                    placeholder=""

                    // error={!!errors.short_description || !field.value}
                    helperText={errors?.short_description?.message}
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
                    placeholder=""

                    // error={!!errors.description || !field.value}
                    helperText={errors?.description?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="specification"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="specification"
                    variant="outlined"
                    label="Specification"
                    placeholder=""

                    // error={!!errors.specification || !field.value}
                    helperText={errors?.specification?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="features"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="features"
                    variant="outlined"
                    label="Features"
                    placeholder=""

                    // error={!!errors.features || !field.value}
                    helperText={errors?.features?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="mt-3 mb-8" variant='h5'>
              Product thumbnail (optional)
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
    </Card >
  )
}

export default ProductInformation
