'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import MuiStep from '@mui/material/Step'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import DirectionalIcon from '@components/DirectionalIcon'
import StepStudentDetails from './StepStudentDetails'
import StepSchoolInfo from './StepSchoolInfo'
import StepParentInfo from './StepParentInfo'
import Logo from '@components/layout/shared/Logo'
import StepperWrapper from '@core/styles/stepper'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import useMediaQuery from '@/@menu/hooks/useMediaQuery'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { SIGNUP_STUDENT } from '@/constants/constants'

import {
  getSchoolsWP,
  getStatesWP,
  getRegionsWP,
  getSectionsWP2,
  getTeachersWP2
} from '@/redux-store/slices/data'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxBlockSize: 550,
  marginBlock: theme.spacing(12)
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 250,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

// Vars
const steps = [
  {
    title: 'Account',
    icon: 'tabler-file-analytics',
    subtitle: 'Enter your Account Details'
  },
  {
    title: 'School Details',
    icon: 'tabler-user',
    subtitle: 'Enter Your School Details'
  },
  {
    title: 'Parent Details',
    icon: 'tabler-credit-card',
    subtitle: 'Enter Parent Details'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingInline: theme.spacing(7),
  paddingBlock: theme.spacing(1),
  '& + i': {
    color: 'var(--mui-palette-text-secondary)'
  },
  '&:first-of-type': {
    paddingInlineStart: 0
  },
  '&:last-of-type': {
    paddingInlineEnd: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '&.Mui-completed .step-title, &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  },
  '&.Mui-completed + i': {
    color: 'var(--mui-palette-primary-main)'
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBlockEnd: theme.spacing(6)
    }
  }
}))

const getStepContent = (
  stepIndex,
  handleNext,
  handlePrev,
  formData,
  handleInputChange,
  parents,
  handleParentInputChange,
  addParent,
  removeParent,
  handleFinalSubmit,
  states,
  regions,
  schools,
  teachers
) => {
  switch (stepIndex) {
    case 0:
      return <StepStudentDetails formData={formData} handleNext={handleNext} handleInputChange={handleInputChange} />
    case 1:
      return (
        <StepSchoolInfo
          formData={formData}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleInputChange={handleInputChange}
          states={states}
          regions={regions}
          schools={schools}
          teachers={teachers}
        />
      )
    case 2:
      return (
        <StepParentInfo
          parents={parents}
          handlePrev={handlePrev}
          handleParentInputChange={handleParentInputChange}
          addParent={addParent}
          removeParent={removeParent}
          handleFinalSubmit={handleFinalSubmit}
        />
      )
    default:
      return 'Unknown stepIndex'
  }
}

const RegisterMultiSteps = ({ mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-reg-multi-mask-dark.png'
  const lightImg = '/images/pages/auth-reg-multi-mask-light.png'

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const dispatch = useDispatch()

  // Redux states
  const states = useSelector(state => state.data.states)
  const allRegions = useSelector(state => state.data.regions)
  const allSchools = useSelector(state => state.data.schools)
  const allTeachers = useSelector(state => state.data.teachers2)

  // States
  const [activeStep, setActiveStep] = useState(0)
  const [regions, setRegions] = useState([])
  const [schools, setSchools] = useState([])
  const [teachers, setTeachers] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    gender: '',
    state: '',
    region: '',
    school: '',
    section: '',
    selected_teacher: '',
    grade: '',
    gpa: '',
    community_service_hours: '',
    earning_college_credit: '',
    on_graduation_track: '',
    attending_college: '',
    lia_participation_period: '',
    leadership_position: '',
    ethnicities: [],
    extracurricular_activities: [],
  })

  const [parents, setParents] = useState([
    { name: '', last_name: '', email: '', phone_number: '', birth_date: '', job: '' }
  ])

  const addParent = () => {
    setParents([...parents, { name: '', last_name: '', email: '', phone_number: '', birth_date: '', job: '' }])
  }

  const removeParent = index => {
    const updatedParents = parents.filter((obj, indx) => indx != index)

    setParents([...updatedParents])
  }

  const handleParentInputChange = (index, field, value) => {
    const updatedParents = [...parents]

    updatedParents[index][field] = value
    setParents(updatedParents)
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })

    if (field === 'state' && value) {
      const regions = allRegions.filter(region => region.state === value)

      setRegions(regions)

    }

    if (field === 'region' && value) {
      const schools = allSchools.filter(school => school.region === value)

      setSchools(schools)

    }
  }

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleFinalSubmit = () => {
    const reqBody = {
      student: formData,
      parents: parents
    }

    try {
      fetch(SIGNUP_STUDENT, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Student registration failed with status code ${res.status}`)
        })
        .then(data => {
          toast.success('Registration is successful!')


          router.push(getLocalizedUrl('/login', locale))
        })
        .catch(error => {
          toast.error('Registration failed!')

        })
    } catch (err) {
      toast.error('Registration failed!')

    }
  }

  useEffect(() => {
    if (formData.school) {
      const filteredTeachers = allTeachers.filter(teacher => teacher?.assigned_schools?.includes(formData?.school))

      setTeachers(filteredTeachers)

    }
  }, [formData.school])

  useEffect(() => {
    dispatch(getStatesWP())
    dispatch(getRegionsWP())
    dispatch(getSchoolsWP())
    dispatch(getSectionsWP2())
    dispatch(getTeachersWP2())
  }, [dispatch])

  return (
    <div className='flex bs-full justify-between items-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center is-[23.75rem] lg:is-[28.125rem] relative p-6 max-lg:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration
          src='/images/lia/lia-register-wb.png'
          alt='character-illustration'
          className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
        />
        {!isSmallScreen && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex flex-1 justify-center items-center bs-full bg-backgroundPaper'>
        <Link
          href={getLocalizedUrl('/', 'en')}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <StepperWrapper className='p-6 sm:p-8 max-is-[46.25rem] mbs-11 sm:mbs-14 lg:mbs-0'>
          <Stepper
            activeStep={activeStep}
            connector={
              !isSmallScreen ? (
                <DirectionalIcon
                  ltrIconClass='tabler-chevron-right'
                  rtlIconClass='tabler-chevron-left'
                  className='text-xl'
                />
              ) : null
            }
            className='mbe-6 md:mbe-12'
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <div className='step-label'>
                    <CustomAvatar
                      variant='rounded'
                      skin={activeStep === index ? 'filled' : 'light'}
                      {...(activeStep >= index && { color: 'primary' })}
                      {...(activeStep === index && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <i className={classnames(step.icon, 'text-[22px]')} />
                    </CustomAvatar>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(
            activeStep,
            handleNext,
            handlePrev,
            formData,
            handleInputChange,
            parents,
            handleParentInputChange,
            addParent,
            removeParent,
            handleFinalSubmit,
            states,
            regions,
            schools,
            teachers
          )}
        </StepperWrapper>
      </div>
    </div>
  )
}

export default RegisterMultiSteps
