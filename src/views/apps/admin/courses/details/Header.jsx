// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const Header = ({ mode, course }) => {

  // Vars
  const lightIllustration = '/images/apps/academy/hand-with-bulb-light.png'
  const darkIllustration = '/images/apps/academy/hand-with-bulb-dark.png'

  // Hooks
  const theme = useTheme()
  const leftIllustration = useImageVariant(mode, lightIllustration, darkIllustration)

  return (
    <Card className='relative flex justify-center'>
      <img src={leftIllustration} className='max-md:hidden absolute max-is-[100px] top-12 start-12' />
      <div className='flex flex-col items-center gap-4 max-md:pli-5 plb-12 md:is-1/2'>
        <Typography variant='h4' className='text-center md:is-3/4'>
          {course?.name}
        </Typography>
        <Typography className='text-center'>
          By, Prof. {course?.instructor?.name} {course?.instructor?.last_name}
        </Typography>
      </div>
      <img
        src='/images/apps/academy/9.png'
        className={classnames('max-md:hidden absolute max-bs-[180px] bottom-0 end-0', {
          'scale-x-[-1]': theme.direction === 'rtl'
        })}
      />
    </Card>
  )
}

export default Header
