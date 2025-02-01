'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const InstructorInformation = () => {
  const { lectureId } = useParams()

  const courseOptions = useSelector(state => state.instructor.instructorCourses)

  const methods = useFormContext()
  const { control, formState, getValues, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  const image = watch('file')

  const [previewImage, setPreviewImage] = useState(null)

  return (
    <Card>
      <CardHeader title='Lecture Information' />
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
                    label="Name"
                    placeholder="Theory of Computation- Lecture 12: Introductoin"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="course"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={courseOptions}
                  value={value ? courseOptions.find(course => course.id === value) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {

                    onChange(newValue?.id)
                  }}
                  renderInput={params => {
                    return (
                      <CustomTextField
                        {...params}
                        placeholder="Select course"
                        label="Course"
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
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    id="duration"
                    variant="outlined"
                    label="Duration (minutes)"
                    placeholder="16"
                    error={!!errors.duration || !field.value}
                    helperText={errors?.duration?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="parts"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    id="parts"
                    variant="outlined"
                    label="Segments"
                    placeholder="16"
                    error={!!errors.parts || !field.value}
                    helperText={errors?.parts?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
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
                    type="textarea"
                    label='Description'
                    placeholder="Enter lecture description..."

                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="url"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='File URL'
                    placeholder="https://fileserver.com/files/yo895423-4232523.mp4"

                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="mt-3 mb-8" variant='h5'>
              Upload Lecture File (optional, if url is provided)
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-12">
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label
                    htmlFor="button-file"
                    className="flex items-center justify-center relative w-128 h-128 mx-12 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-file"
                      type="file"

                      //onChange={handlePreviewImage}
                      onChange={async e => {
                        const reader = new FileReader();

                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setPreviewImage(reader.result);
                          }
                        };

                        reader.readAsDataURL(e.target.files[0]);

                        const file = e.target.files[0];

                        //;
                        onChange(file);
                      }}
                    />
                    <i className="tabler-cloud-upload" style={{ width: '90px', height: '90px' }} />
                  </label>
                )}
              />
              {image && !previewImage && (
                <video src={`${image}`} style={{ width: '200px', height: '150px' }} alt="Not found" />
              )}

              {
                previewImage && (
                  <video src={previewImage} style={{ width: '200px', height: '150px' }} alt="Not found" />
                )
              }
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InstructorInformation
