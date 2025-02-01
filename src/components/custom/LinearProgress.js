import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

const LinearProgress = styled(MuiLinearProgress)(() => ({
    '&.MuiLinearProgress-colorInfo': { backgroundColor: 'var(--mui-palette-primary-main)' },
    '& .MuiLinearProgress-bar': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
}))

export default LinearProgress
