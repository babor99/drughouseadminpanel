'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const AssignedSchools = () => {
  const schoolOptions = useSelector(state => state.data.schools)
  const sectionOptions = useSelector(state => state.data.sections2)

  const [filteredSections, setFilteredSections] = useState([])

  const methods = useFormContext();
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const school = watch('school')

  useEffect(() => {
    const newSections = sectionOptions.filter(section => section?.school?.id === school)

    setFilteredSections(newSections)
  }, [school, sectionOptions])

  return (
    <Card>
      <CardHeader title='Academic Information' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Controller
              name="grade"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="grade"
                    variant="outlined"
                    label="Grade"
                    placeholder="4.0"

                    // error={!!errors.grade || !field.value}
                    helperText={errors?.grade?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="graduation_year"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="graduation_year"
                    variant="outlined"
                    label="Graduation Year"
                    placeholder="2024"

                    // error={!!errors.graduation_year || !field.value}
                    helperText={errors?.graduation_year?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="school"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={schoolOptions}
                  value={value ? schoolOptions.find(school => school.id === value) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {

                    onChange(newValue?.id)
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        placeholder="Select School"
                        label="School"
                        variant="outlined"
                        size="small"
                        error={!!errors.school || !value}
                        helperText={errors?.school?.message}
                        InputLabelProps={value && { shrink: true }}
                      />
                    );
                  }}
                  getOptionKey={option => option?.id}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="section"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  filterSelectedOptions
                  options={filteredSections}
                  value={value ? filteredSections.find(section => section.id === value) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {
                    onChange(newValue?.id)
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        placeholder="Select Section"
                        label="Section"
                        variant="outlined"
                        size="small"
                        error={!!errors.section || !value}
                        helperText={errors?.section?.message}
                        InputLabelProps={value && { shrink: true }}
                      />
                    );
                  }}
                  getOptionKey={option => option?.id}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssignedSchools
