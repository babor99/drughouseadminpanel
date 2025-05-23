'use client'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const EventInformation = ({ setEventPhoto, setEventFile }) => {
  const { eventId } = useParams()
  const stateOptions = useSelector(state => state.data.states)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  return (
    <Card>
      <CardHeader title='Event Information' />
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
                    label="Event Name"
                    placeholder="Seminar on Linear Algebra"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='flex items-center justify-start'>
              <Typography>Date to be announced?</Typography>
              <Controller
                name="is_tba"
                control={control}
                render={({ field }) => {
                  return (
                    <Switch
                      {...field}
                      id="is_tba"
                      checked={field.value}
                    />
                  );
                }}
              />
            </div>
          </Grid>
          <>
            <Grid item xs={12}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      id="date"
                      type='date'
                      variant="outlined"
                      label="Event date"
                      InputLabelProps={field.value && { shrink: true }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      id="time"
                      type='time'
                      variant="outlined"
                      label="Event time"
                      InputLabelProps={field.value && { shrink: true }}
                    />
                  );
                }}
              />
            </Grid>
          </>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="address"
                    variant="outlined"
                    label="Address"
                    placeholder="23/A, Middlesburg Street"
                    error={!!errors.location || !field.value}
                    helperText={errors?.location?.message}
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
                    placeholder="Describe the event briefly"
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
              label="Event photo"
              type='file'
              onChange={(e) => setEventPhoto(e.target?.files?.[0])}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              id="file"
              variant="outlined"
              label="File (optional)"
              type='file'
              onChange={(e) => setEventFile(e.target?.files?.[0])}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EventInformation
