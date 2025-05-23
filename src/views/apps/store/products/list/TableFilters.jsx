// React Imports
import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = (props) => {
  const categoryOptions = useSelector(state => state.data.productCategorys || [])
  const productTypeOptions = useSelector(state => state.data.productTypes || [])
  const manufacturerOptions = useSelector(state => state.data.manufacturers || [])

  const {
    params,
    setParams,
    getAllProduct,
  } = props

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={categoryOptions}
            value={params?.category ? categoryOptions.find(category => params?.category === category.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, category: newValue.id })
              } else {
                getAllProduct({ ...params, category: ''})
                setParams({ ...params, category: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select category"
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={productTypeOptions}
            value={params?.product_type ? productTypeOptions.find(pt => params?.product_type === pt.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, product_type: newValue.id })
              } else {
                getAllProduct({ ...params, product_type: ''})
                setParams({ ...params, product_type: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select product-type"
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={manufacturerOptions}
            value={params?.manufacturer ? manufacturerOptions.find(mn => params?.manufacturer === mn.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, manufacturer: newValue.id })
              } else {
                getAllProduct({ ...params, manufacturer: ''})
                setParams({ ...params, manufacturer: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select manufacturer"
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant='contained'
            color='secondary'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-filter' />}
            disabled={!params?.category && !params?.product_type && !params?.manufacturer}
            onClick={() => getAllProduct(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
