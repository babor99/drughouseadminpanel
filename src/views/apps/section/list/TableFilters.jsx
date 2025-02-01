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
    getAllSection,
  } = props

  const schoolOptions = useSelector(state => state.data.schools)

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            options={schoolOptions}
            value={params?.school ? schoolOptions.find(school => params?.school === school.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {


              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, school: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, school: '' }
                })
                getAllSection({ ...params, school: '' })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select school"
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
            disabled={!params?.school}
            onClick={() => getAllSection(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
