'use client'

import { useSelector } from 'react-redux'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const CompetitionInformation = ({ setCompetitionPhoto, setCompetitionFile }) => {
  const stateOptions = useSelector(state => state.data.states)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Competition Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="name"
                    variant="outlined"
                    label="Competition Name"
                    placeholder="Annual Math Olympiad"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="start_date"
                    type='date'
                    variant="outlined"
                    label="Start date"
                    error={!!errors.date || !field.value}
                    helperText={errors?.date?.message}
                    InputLabelProps={field.value && { shrink: true }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="end_date"
                    type='date'
                    variant="outlined"
                    label="End date"
                    error={!!errors.date || !field.value}
                    helperText={errors?.date?.message}
                    InputLabelProps={field.value && { shrink: true }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="description"
                    variant="outlined"
                    label="Short description"
                    placeholder="Describe the competition briefly"
                    error={!!errors.description || !field.value}
                    helperText={errors?.description?.message}
                    InputLabelProps={field.value && { shrink: true }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              id="photo"
              variant="outlined"
              label="Competition photo"
              type='file'
              onChange={(e) => setCompetitionPhoto(e.target?.files?.[0])}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              id="file"
              variant="outlined"
              label="File (optional)"
              type='file'
              onChange={(e) => setCompetitionFile(e.target?.files?.[0])}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CompetitionInformation
