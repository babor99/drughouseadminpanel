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
    getAllAdminStudent,
  } = props

  const userId = useSelector(state => state.user.id)
  const stateOptions = useSelector(state => state.data.states || [])
  const regionOptions = useSelector(state => state.data.regions || [])
  const schoolOptions = useSelector(state => state.data.schools || [])
  const sectionOptions = useSelector(state => state.data.sections2 || [])

  const [filteredSectionOptions, setFilteredSectionOptions] = useState([])

  useEffect(() => {
    const newSections = sectionOptions.filter(section => section?.school?.id === params?.school)

    setFilteredSectionOptions(newSections)
  }, [params?.school])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            filterSelectedOptions
            options={stateOptions}
            value={params?.state ? stateOptions.find(state => state.id === params?.state) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, state: newValue?.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, state: '' }
                })
                getAllAdminStudent({ ...params, state: '' })
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
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            filterSelectedOptions
            options={regionOptions}
            value={params?.region ? regionOptions.find(region => region.id === params?.region) : null}
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
                getAllAdminStudent({ ...params, region: '' })
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
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            filterSelectedOptions
            options={schoolOptions}
            value={params?.school ? schoolOptions.find(school => school.id === params?.school) : null}
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
                getAllAdminStudent({ ...params, school: '' })
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
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            filterSelectedOptions
            options={filteredSectionOptions}
            value={params?.school ? filteredSectionOptions.find(section => section.id === params?.section) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, section: newValue?.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, section: '' }
                })
                getAllAdminStudent({ ...params, section: '' })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select section"
                  variant="outlined"
                  size="small"
                  helperText={'Select school first'}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
            getOptionKey={option => option?.id}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant='contained'
            color='secondary'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-filter' />}
            disabled={
              !params?.state &&
              !params?.region &&
              !params?.school
            }
            onClick={() => getAllAdminStudent(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
