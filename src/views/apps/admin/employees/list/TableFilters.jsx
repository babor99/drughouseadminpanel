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
    getAllEmployee,
  } = props

  const stateOptions = useSelector(state => state.data.states)
  const regionOptions = useSelector(state => state.data.regions)
  const schoolOptions = useSelector(state => state.data.schools)
  const [filteredRegionOptions, setFilterRegionOptions] = useState([])
  const [filteredSchoolOptions, setFilterSchoolOptions] = useState([])

  useEffect(() => {
    const newRegionOptions = regionOptions.filter((region) => params?.state === region?.state)

    setFilterRegionOptions([...newRegionOptions])
  }, [params?.state])

  useEffect(() => {
    const newSchoolOptions = schoolOptions.filter((school) => params?.region === school?.region)

    setFilterSchoolOptions([...newSchoolOptions])
  }, [params?.region])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            options={stateOptions}
            value={params?.state ? stateOptions.find(state => params?.state === state.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {


              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, state: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, state: '', region: '', assigned_schools: [] }
                })
                getAllEmployee({ ...params, state: '', region: '', assigned_schools: [] })
              }
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            options={filteredRegionOptions}
            value={params?.region ? filteredRegionOptions.find(region => params?.region === region.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {

                setParams(prevParams => {
                  return { ...prevParams, region: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, region: '', assigned_schools: [] }
                })
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
        <Grid item xs={12} sm={12}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={filteredSchoolOptions}
            value={params.assigned_schools ? filteredSchoolOptions.filter(school => params.assigned_schools?.includes(school?.id)) : []}
            getOptionKey={option => option?.id}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValues) => {
              const selectedValues = newValues.map(option => option.id);

              setParams(prevParams => {
                return { ...prevParams, assigned_schools: selectedValues }
              });
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select assigned schools"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant='contained'
            color='secondary'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-filter' />}
            disabled={!params?.state}
            onClick={() => getAllEmployee(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
