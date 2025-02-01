// src/views/pages/auth/register-multi-steps/StepParentInfo.jsx

import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

const StepParentInfo = ({
  parents,
  handlePrev,
  handleParentInputChange,
  addParent,
  removeParent,
  handleFinalSubmit
}) => {
  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Parent Information (optional)</Typography>
        <Typography>Enter details about your parents</Typography>
      </div>
      {parents.map((parent, index) => (
        <div key={index} className={`${parents.length > 1 && 'border rounded-md border-blue-900'} p-5 mb-5`}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name'
                value={parent.name}
                onChange={e => handleParentInputChange(index, 'name', e.target.value)}
                placeholder='John'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name'
                value={parent.last_name}
                onChange={e => handleParentInputChange(index, 'last_name', e.target.value)}
                placeholder='Doe'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Email'
                type='email'
                value={parent.email}
                onChange={e => handleParentInputChange(index, 'email', e.target.value)}
                placeholder='john.doe@example.com'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Phone Number'
                value={parent.phone_number}
                onChange={e => handleParentInputChange(index, 'phone_number', e.target.value)}
                placeholder='(123) 456-7890'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Job'
                value={parent.job}
                onChange={e => handleParentInputChange(index, 'job', e.target.value)}
                placeholder='Software Engineer'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Date of Birth'
                type='date'
                value={parent.birth_date}
                onChange={e => handleParentInputChange(index, 'birth_date', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          {parents.length > 1 && (
            <Button className='mt-2' color='warning' onClick={() => removeParent(index)}>
              Remove parent
            </Button>
          )}
        </div>
      ))}
      <Button variant='contained' color='secondary' onClick={addParent} className='mbe-4'>
        Add Another Parent
      </Button>
      <Grid item xs={12} className='flex justify-between'>
        <Button variant='tonal' color='secondary' onClick={handlePrev}>
          Previous
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleFinalSubmit()}
        >
          Submit
        </Button>
      </Grid>
    </>
  )
}

export default StepParentInfo
