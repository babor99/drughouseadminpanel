'use client'

// React Imports
import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const AllowedStatesRegionsSchools = () => {

  const stateOptions = useSelector(state => state.data.states)
  const regionOptions = useSelector(state => state.data.regions)
  const schoolOptions = useSelector(state => state.data.schools)

  // const [filteredRegionOptions, setFilteredRegionOptions] = useState([])
  // const [filteredSchoolOptions, setFilteredSchoolOptions] = useState([])

  const methods = useFormContext();
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  // const assignedStates = watch('allowed_states')
  // const assignedRegions = watch('allowed_regions')

  // useEffect(() => {
  //   if (assignedStates?.length) {
  //     const newRegionOptions = regionOptions.filter((region) => assignedStates.includes(region.state))

  //     setFilteredRegionOptions([...newRegionOptions])
  //   } else {
  //     setFilteredRegionOptions([])
  //   }
  // }, [watch('allowed_states')])

  // useEffect(() => {
  //   if (assignedRegions?.length) {
  //     const newSchoolOptions = schoolOptions.filter((school) => assignedRegions.includes(school.region))

  //     setFilteredSchoolOptions([...newSchoolOptions])
  //   } else {
  //     setFilteredSchoolOptions([])
  //   }
  // }, [watch('allowed_regions')])

  return (
    <Card className='mt-5'>
      <CardHeader title='Accessibility' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <div className='flex items-center justify-start'>
                  <Typography>Is Public?</Typography>
                  <Controller
                    name="is_public"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Switch
                          {...field}
                          id="is_public"
                          checked={field.value}
                        />
                      );
                    }}
                  />
                </div>
              </Grid>
              {
                !watch('is_public') &&
                <>
                  <Grid item xs={12}>
                    <Controller
                      name="allowed_states"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          multiple
                          filterSelectedOptions
                          options={stateOptions}
                          value={value ? stateOptions.filter(state => value?.includes(state?.id)) : []}
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
                                label="Allowed States"
                                placeholder="Select states"
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
                      name="allowed_regions"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          multiple
                          filterSelectedOptions
                          options={regionOptions}
                          value={value ? regionOptions.filter(region => value?.includes(region?.id)) : []}
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
                                label="Allowed Districts"
                                placeholder="Select districts"
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
                      name="allowed_schools"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          multiple
                          filterSelectedOptions
                          options={schoolOptions}
                          value={value ? schoolOptions.filter(school => value?.includes(school?.id)) : []}
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
                                label="Allowed Schools"
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
                </>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AllowedStatesRegionsSchools
