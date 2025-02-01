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
    getAllRPMStudent,
  } = props

  const userId = useSelector(state => state.user.id)
  const rpmRegionOptions = useSelector(state => state.rpm.rpmRegions || [])
  const rpmSchoolOptions = useSelector(state => state.rpm.rpmSchools || [])
  const [filteredSchoolOptions, setFilteredSchoolOptions] = useState([...rpmSchoolOptions])

  useEffect(() => {
    const newSchoolOptions = rpmSchoolOptions.filter(school => school?.region == params.region)

    if (newSchoolOptions.length) {
      setFilteredSchoolOptions(newSchoolOptions)
    }
  }, [params.region])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={rpmRegionOptions}
            value={params?.region ? rpmRegionOptions.find(region => region.id === params?.region) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, region: newValue?.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, region: '' }
                })
                getAllRPMStudent({ ...params, region: '' })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select district"
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
            options={filteredSchoolOptions}
            value={params?.school ? filteredSchoolOptions.find(school => school.id === params?.school) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, school: newValue?.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, school: '' }
                })
                getAllRPMStudent({ ...params, school: '' })
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
            disabled={
              !params?.region &&
              !params?.school
            }
            onClick={() => getAllRPMStudent(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
