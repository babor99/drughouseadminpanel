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
  const {
    params,
    setParams,
    getAllRPMSchool,
  } = props

  const regionOptions = useSelector(state => state.rpm.rpmRegions || [])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Autocomplete
            filterSelectedOptions
            options={regionOptions}
            value={params?.region ? regionOptions.find(region => params?.region === region.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, region: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, region: '' }
                })
                getAllRPMSchool({ ...params, region: '' })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select region"
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
            disabled={!params?.region}
            onClick={() => getAllRPMSchool(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
