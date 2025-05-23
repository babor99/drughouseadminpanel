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

  const regionOptions = useSelector(state => state.data.regions)
  const schoolOptions = useSelector(state => state.data.schools)
  const [filteredSchoolOptions, setFilterSchoolOptions] = useState([])

  const methods = useFormContext();
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const assignedRegions = watch('assigned_regions')

  useEffect(() => {
    if (assignedRegions?.length) {

      const newSchoolOptions = schoolOptions.filter((school) => assignedRegions.includes(school.region))

      setFilterSchoolOptions([...newSchoolOptions])
    } else {
      setFilterSchoolOptions([])
    }
  }, [watch('assigned_regions')])





  return (
    <Card>
      <CardHeader title='Assigned Schools (optional)' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Controller
                  name="assigned_regions"
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
                            label="Assigned Regions"
                            placeholder="Select regions"
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
