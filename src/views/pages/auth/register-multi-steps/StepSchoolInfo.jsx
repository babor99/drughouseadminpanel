import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Autocomplete } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

import {
  yesNoOptions,
  yesNoUnsureOptions,
  ethnicityOptions,
  extracurricularOptions,
  liaPeriodOptions,
  leadershipOptions,
} from '@/commons/dropdownOptions'

const StepSchoolInfo = ({ formData, handleNext, handlePrev, handleInputChange, states, regions, schools, teachers }) => {
  // const { settings } = useSettingsContext()

  // States for input fields
  const [isStateValid, setIsStateValid] = useState(false)
  const [isRegionValid, setIsRegionValid] = useState(false)
  const [isSchoolValid, setIsSchoolValid] = useState(false)
  const [isGpaValid, setIsGpaValid] = useState(false)
  const [errors, setErrors] = useState({})

  const allSections = useSelector(state => state.data.sections2)
  const [filteredSections, setFilteredSections] = useState([])

  const [selectedTeacher, setSelectedTeacher] = useState({})

  const [gradeState, setGradeState] = useState(formData?.grade)

  const handleNextStep = () => {
    if (isStateValid && isRegionValid && isSchoolValid && isGpaValid) {
      handleNext()
    }
  }

  useEffect(() => {
    const assignedSections = selectedTeacher?.assigned_sections

    if (assignedSections && assignedSections.length > 1) {
      const newSections = allSections.filter(section => assignedSections.includes(section.id))

      setFilteredSections(newSections)
    } else if (assignedSections && assignedSections?.length) {
      handleInputChange('section', assignedSections[0])
    }

  }, [selectedTeacher])

  useEffect(() => {
    validateState(formData.state)
    validateRegion(formData.region)
    validateSchool(formData.school)
    validateGpa(formData.gpa)
  }, [])

  // State Validation
  const validateState = value => {
    const stateValue = parseInt(value)

    if (isNaN(stateValue) || stateValue < 1) {
      setIsStateValid(false)
      setErrors(prevErrors => ({
        ...prevErrors,
        state: 'State is required'
      }))

      return
    }

    setIsStateValid(true)
    setErrors(prevErrors => ({
      ...prevErrors,
      state: null
    }))
  }

  // Region Validation
  const validateRegion = value => {
    const regionValue = parseInt(value)

    if (isNaN(regionValue) || regionValue < 1) {
      setIsRegionValid(false)
      setErrors(prevErrors => ({
        ...prevErrors,
        region: 'Region is required'
      }))

      return
    }

    setIsRegionValid(true)
    setErrors(prevErrors => ({
      ...prevErrors,
      region: null
    }))
  }

  // School Validation
  const validateSchool = value => {
    const schoolValue = parseInt(value)

    if (isNaN(schoolValue) || schoolValue < 1) {
      setIsSchoolValid(false)
      setErrors(prevErrors => ({
        ...prevErrors,
        school: 'School is required'
      }))

      return
    }

    setIsSchoolValid(true)
    setErrors(prevErrors => ({
      ...prevErrors,
      school: null
    }))
  }

  // GPA Validation
  const validateGpa = value => {
    const gpaValue = parseFloat(value)



    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4.0) {
      setIsGpaValid(false)
      setErrors(prevErrors => ({
        ...prevErrors,
        gpa: 'GPA must be a number between 0.0 and 4.0'
      }))

      return
    }

    setIsGpaValid(true)
    setErrors(prevErrors => ({
      ...prevErrors,
      gpa: null
    }))
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>School Information</Typography>
        <Typography>Enter details about your school</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            value={formData?.state ? states.find(state => state.id === formData?.state) : null}
            options={states}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValue) => {
              validateState(newValue?.id)
              handleInputChange('state', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='State'
                placeholder='Select State'
                error={!!errors.state}
                helperText={errors.state || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            value={formData?.region ? regions.find(region => region.id === formData?.region) : null}
            options={regions}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValue) => {
              validateRegion(newValue?.id)
              handleInputChange('region', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                placeholder='Select School District'
                label='School District'
                id='region'
                variant='outlined'
                error={!!errors.region}
                helperText={errors.region || ''}
              />
            )}
            getOptionKey={option => option?.id}
            disabled={!isStateValid}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            filterSelectedOptions
            value={formData?.school ? schools.find(school => school.id === formData?.school) : null}
            options={schools}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValue) => {
              validateSchool(newValue?.id)
              handleInputChange('school', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='School'
                placeholder='Select School'
                error={!!errors.school}
                helperText={errors.school || ''}
              />
            )}
            getOptionKey={option => option.id}
            disabled={!isStateValid || !isRegionValid}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            filterSelectedOptions
            options={teachers}
            value={formData?.selected_teacher ? teachers.find(teacher => teacher.id === formData?.selected_teacher) : null}
            getOptionLabel={option => `${option?.name} ${option?.last_name}`}
            onChange={(event, newValue) => {
              setSelectedTeacher(newValue)
              handleInputChange('selected_teacher', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='Teacher'
                placeholder='Select Teacher'
                error={!!errors.teacher}
                helperText={errors.teacher || ''}
              />
            )}
            getOptionKey={option => option.id}
            disabled={!formData?.school}
          />
        </Grid>
        {
          selectedTeacher?.assigned_sections?.length > 1 && (
            <Grid item xs={12}>
              <Autocomplete
                filterSelectedOptions
                options={filteredSections}
                value={formData?.section ? filteredSections.find(section => section.id === formData?.section) : null}
                getOptionLabel={option => `${option?.name}`}
                onChange={(event, newValue) => {
                  handleInputChange('section', newValue?.id)
                }}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    label='Section'
                    placeholder='Select Section'
                    error={!!errors.section}
                    helperText={errors.section || ''}
                  />
                )}
                getOptionKey={option => option.id}
              />
            </Grid>
          )
        }
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Grade'
            type='number'
            value={formData.grade}
            onChange={e => {
              setGradeState(e.target.value)
              handleInputChange('grade', e.target.value)
            }}
            placeholder='9'
            error={!!errors.grade}
            helperText={errors.grade || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='GPA'
            type='number'
            value={formData.gpa}
            onChange={e => {
              validateGpa(e.target.value)
              handleInputChange('gpa', e.target.value)
            }}
            placeholder='3.5'
            error={!!errors.gpa}
            helperText={errors.gpa || ''}
          />
        </Grid>
        {
          gradeState == '12' && (
            <>
              <Grid item xs={12}>
                <Autocomplete
                  filterSelectedOptions
                  options={yesNoOptions}
                  value={formData?.earning_college_credit ? yesNoOptions.find(option => option.id === formData?.earning_college_credit) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {
                    handleInputChange('earning_college_credit', newValue?.id)
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      label='Are you earning college credit for any classes this year?'
                      placeholder='Select'
                      error={!!errors.earning_college_credit}
                      helperText={errors.earning_college_credit || ''}
                    />
                  )}
                  getOptionKey={option => option.id}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  filterSelectedOptions
                  options={yesNoOptions}
                  value={formData?.on_graduation_track ? yesNoOptions.find(option => option.id === formData?.on_graduation_track) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {
                    handleInputChange('on_graduation_track', newValue?.id)
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      label='Are you on track to graduate?'
                      placeholder='Select'
                      error={!!errors.on_graduation_track}
                      helperText={errors.on_graduation_track || ''}
                    />
                  )}
                  getOptionKey={option => option.id}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  filterSelectedOptions
                  options={yesNoUnsureOptions}
                  value={formData?.attending_college ? yesNoUnsureOptions.find(option => option.id === formData?.attending_college) : null}
                  getOptionLabel={option => `${option?.name}`}
                  onChange={(event, newValue) => {
                    handleInputChange('attending_college', newValue?.id)
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      label='Are you planning on attending college next fall?'
                      placeholder='Select'
                      error={!!errors.attending_college}
                      helperText={errors.attending_college || ''}
                    />
                  )}
                  getOptionKey={option => option.id}
                />
              </Grid>
            </>
          )
        }
        <Grid item xs={12}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={extracurricularOptions}
            value={formData?.extracurricular_activities ? extracurricularOptions.filter(option => formData?.extracurricular_activities.includes(option.id)) : []}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValues) => {
              const extracurricularIds = newValues.map(obj => obj.id)


              handleInputChange('extracurricular_activities', extracurricularIds)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='Please select which of the following (if any) extracurricular activities you participate in.'
                placeholder='Select'
                error={!!errors.extracurricular_activities}
                helperText={errors.extracurricular_activities || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            filterSelectedOptions
            options={liaPeriodOptions}
            value={formData?.lia_participation_period ? liaPeriodOptions.find(option => option.id === formData?.lia_participation_period) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              handleInputChange('lia_participation_period', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='How many years have you participated in LIA?'
                placeholder='Select'
                error={!!errors.lia_participation_period}
                helperText={errors.lia_participation_period || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            filterSelectedOptions
            options={leadershipOptions}
            value={formData?.leadership_position ? leadershipOptions.find(option => option.id === formData?.leadership_position) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              handleInputChange('leadership_position', newValue?.id)
            }}
            renderInput={params => (
              <CustomTextField
                {...params}
                fullWidth
                label='Select Your Leadership Position'
                placeholder='Select'
                error={!!errors.leadership_position}
                helperText={errors.leadership_position || ''}
              />
            )}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button variant='tonal' color='secondary' onClick={handlePrev}>
            Previous
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleNextStep}
            disabled={
              !isStateValid ||
              !isRegionValid ||
              !isSchoolValid ||
              !isGpaValid ||
              !formData?.grade ||
              !formData?.lia_participation_period ||
              !formData?.leadership_position ||
              !formData?.extracurricular_activities?.length
            }
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepSchoolInfo
