'use client'

// React Imports
import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const AssignedRegionsSchools = () => {

  const stateOptions = useSelector(state => state.data.states)
  const regionOptions = useSelector(state => state.data.regions)
  const schoolOptions = useSelector(state => state.data.schools)
  const sectionOptions = useSelector(state => state.data.sections2)
  const [filteredRegionOptions, setFilteredRegionOptions] = useState([])
  const [filteredSchoolOptions, setFilteredSchoolOptions] = useState([])
  const [filteredSectionOptions, setFilteredSectionOptions] = useState([])

  const methods = useFormContext();
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const state = watch('state')
  const region = watch('region')
  const assignedSchools = watch('assigned_schools')

  useEffect(() => {
    if (watch('state')) {
      const newRegionOptions = regionOptions.filter((region) => state === region.state)

      setFilteredRegionOptions([...newRegionOptions])
    } else {
      setFilteredRegionOptions([])
    }

    setFilteredSchoolOptions([])
    setFilteredSectionOptions([])
  }, [watch('state')])

  useEffect(() => {
    if (watch('region')) {
      const newSchoolOptions = schoolOptions.filter((school) => region === school.region)

      setFilteredSchoolOptions([...newSchoolOptions])
    } else {
      setFilteredSchoolOptions([])
      setFilteredSectionOptions([])
    }
  }, [watch('region')])

  useEffect(() => {
    if (assignedSchools?.length) {
      const newSectionOptions = sectionOptions.filter((section) => assignedSchools.includes(section?.school?.id))

      setFilteredSectionOptions([...newSectionOptions])
    } else {
      setFilteredSectionOptions([])
    }
  }, [assignedSchools])








  return (
    <Card>
      <CardHeader title='Assigned Schools (optional)' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
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
              <Grid item xs={12} alignSelf='end'>
                <Controller
                  name="assigned_schools"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      filterSelectedOptions
                      options={filteredSchoolOptions}
                      value={value ? filteredSchoolOptions.filter(school => value?.includes(school?.id)) : []}
                      getOptionKey={option => option?.id}
                      getOptionLabel={option => `${option.name}`}
                      onChange={(event, newValues) => {
                        const selectedValues = newValues.map(option => option.id);

                        onChange(selectedValues);
                      }}
                      renderInput={params => {
                        return (
                          <CustomTextField
                            {...params}
                            label="Assigned Schools"
                            placeholder="Select schools"
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
              <Grid item xs={12} alignSelf='end'>
                <Controller
                  name="assigned_sections"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      filterSelectedOptions
                      options={filteredSectionOptions}
                      value={value ? filteredSectionOptions.filter(section => value?.includes(section?.id)) : []}
                      getOptionKey={option => option?.id}
                      getOptionLabel={option => `${option.name} (${option?.school?.name})`}
                      onChange={(event, newValues) => {
                        const selectedValues = newValues.map(option => option.id);

                        onChange(selectedValues);
                      }}
                      renderInput={params => {
                        return (
                          <CustomTextField
                            {...params}
                            label="Assigned Sections"
                            placeholder="Select sections"
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
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssignedRegionsSchools
