'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { LOGIN_URL, CHECK_LOGIN_URL } from '@/constants/constants'
import {
  getRolesWP,
  getPermissionsWP,
  getUsersWP,
  getUserPermissionsWP,
  getNestedMenuItemsWp,
  getMenuItemsWp,
  getCountrysWP,
  getStatesWP,
  getDistrictsWP,
  getCitysWP,
  getAreasWP,
  getBranchsWP,
  getProductCategorysWP,
  getProductTypesWp,
  getDiscountsWp,
  getManufacturersWp,
  getOrderStatussWP,
  getPaymentMethodsWp,
} from '@/redux-store/slices/data'

import { setLoginSuccess, setLoginFailed } from '@/redux-store/slices/authentication'
import { setUser } from '@/redux-store/slices/user'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required'), email('Email is invalid')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

const Login = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
  const accessToken = useSelector(state => state.authentication.accessToken)

  const dispatch = useDispatch()

  // Vars
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkImg = '/images/pages/auth-mask-dark.png'

  const lightIllustration = '/images/lia/lia-login-wb.png'
  const darkIllustration = '/images/lia/lia-login-wb.png'
  const borderedDarkIllustration = '/images/lia/lia-login-wb.png'
  const borderedLightIllustration = '/images/lia/lia-login-wb.png'

  // const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  // const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  // const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  // const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (reqData) => {
    try {
      fetch(LOGIN_URL, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email: reqData.email, password: reqData.password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async response => {
          if (response.ok && [200, 201].includes(response.status)) {
            return response.json()
          }

          const resError = await response.json()

          if (resError && resError?.message) {
            toast.error(resError?.message || "Login failed!")
          }

          throw new Error(`Login failed with status code ${response.status}`)
        })
        .then(resData => {
          const data = resData?.data

          if (data && data?.is_authenticated) {
            const redirectURL = searchParams.get('redirectTo') ?? '/'

            dispatch(setUser(data))
            dispatch(setLoginSuccess({ isAuthenticated: data?.is_authenticated, accessToken: data?.access, csrfToken: data?.csrftoken }))

            // This is For Dynamic Sidebar
            dispatch(getRolesWP(data?.access, data?.csrftoken))
            dispatch(getPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getUserPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getNestedMenuItemsWp(data?.access, data?.csrftoken))
            dispatch(getCountrysWP(data?.access, data?.csrftoken))
            dispatch(getStatesWP(data?.access, data?.csrftoken))
            dispatch(getDistrictsWP(data?.access, data?.csrftoken))
            dispatch(getCitysWP(data?.access, data?.csrftoken))
            dispatch(getAreasWP(data?.access, data?.csrftoken))
            dispatch(getBranchsWP(data?.access, data?.csrftoken))

            dispatch(getProductCategorysWP(data?.access, data?.csrftoken))
            dispatch(getProductTypesWp(data?.access, data?.csrftoken))
            dispatch(getDiscountsWp(data?.access, data?.csrftoken))
            dispatch(getManufacturersWp(data?.access, data?.csrftoken))
            dispatch(getOrderStatussWP(data?.access, data?.csrftoken))
            dispatch(getPaymentMethodsWp(data?.access, data?.csrftoken))

            // dispatch(getUsersWP(data?.access, data?.csrftoken))
            // dispatch(getMenuItemsWp(data?.access, data?.csrftoken))

            toast.success("Login successful!")
            router.push(getLocalizedUrl('/apps/dashboard', locale))
          }
        })
        .catch(error => {
          dispatch(setLoginFailed())
          setErrorState(error)
          toast.error("Login failed!!")
        })
    } catch (err) {
      toast.error("Login failed!!")
    }
  }

  // Although it's the Login component, this useEffect hook is for checking when valid cookie is already available. After successful check-login it will automaically redirect to dashboard
  useEffect(() => {
    if (!isAuthenticated) {
      // 

      const authHeaders = {
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      fetch(`${CHECK_LOGIN_URL}`, authHeaders)
        .then(async response => {
          if (response.ok && response.status == 200) {
            return response.json()
          }

          const resError = await response.json()

          if (resError && resError?.message) {
            toast.error(resError?.message || "Login failed!")
          }
        })
        .then(resData => {
          const data = resData?.data

          if (data?.is_authenticated) {
            dispatch(setUser(data))
            dispatch(setLoginSuccess({ isAuthenticated: data?.is_authenticated, accessToken: data?.access, csrfToken: data?.csrftoken }))

            // This is For Dynamic Sidebar
            dispatch(getRolesWP(data?.access, data?.csrftoken))
            dispatch(getPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getUserPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getNestedMenuItemsWp(data?.access, data?.csrftoken))
            dispatch(getCountrysWP(data?.access, data?.csrftoken))
            dispatch(getStatesWP(data?.access, data?.csrftoken))
            dispatch(getDistrictsWP(data?.access, data?.csrftoken))
            dispatch(getCitysWP(data?.access, data?.csrftoken))
            dispatch(getAreasWP(data?.access, data?.csrftoken))
            dispatch(getBranchsWP(data?.access, data?.csrftoken))

            dispatch(getProductCategorysWP(data?.access, data?.csrftoken))
            dispatch(getProductTypesWp(data?.access, data?.csrftoken))
            dispatch(getDiscountsWp(data?.access, data?.csrftoken))
            dispatch(getManufacturersWp(data?.access, data?.csrftoken))
            dispatch(getOrderStatussWP(data?.access, data?.csrftoken))
            dispatch(getPaymentMethodsWp(data?.access, data?.csrftoken))

            // dispatch(getUsersWP(data?.access, data?.csrftoken))
            // dispatch(getMenuItemsWp(data?.access, data?.csrftoken))

            router.push(getLocalizedUrl('/apps/dashboard', locale))
          } else {
            dispatch(setLoginFailed())
          }
        })
        .catch(error => {
          dispatch(setLoginFailed())
        })
    }
  }, [])

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            action={() => { }}
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Enter your email'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText: errors?.email?.message || errorState?.message[0]
                  })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...(errors.password && { error: true, helperText: errors.password.message })}
                />
              )}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
              {/* <Typography
                className='text-end'
                color='primary'
                component={Link}
                href={getLocalizedUrl('/forgot-password', locale)}
              >
                Forgot password?
              </Typography> */}
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
            {/* <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} href={getLocalizedUrl('/register', locale)} color='primary'>
                Create an account
              </Typography>
            </div> */}
            {/* <Divider className='gap-2'>or</Divider> */}
            {/* <Button
              color='secondary'
              className='self-center text-textPrimary'
              startIcon={<img src='/images/logos/google.png' alt='Google' width={22} />}
              sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
              onClick={() => "signIn('google')"}
            >
              Sign in with Google
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
