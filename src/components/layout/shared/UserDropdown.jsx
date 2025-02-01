'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { LOGOUT_URL } from '@/constants/constants'
import { setLogoutSuccess, setLogoutFailed } from '@/redux-store/slices/authentication'
import { unsetUser } from '@/redux-store/slices/user'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user)
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const dispatch = useDispatch()

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const { lang: locale } = useParams()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(getLocalizedUrl(url, locale))
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {
    const authHeaders = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      }
    }

    try {
      fetch(LOGOUT_URL, authHeaders)
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Logout failed with status code ${res.status}`)
        })
        .then(data => {
          // no need to manually redirect after logout. because, AuthGuard component will automatically to this when logout is successful.
          dispatch(setLogoutSuccess())
          dispatch(unsetUser())
          toast.success("Logout successful!")

        })
        .catch(error => {
          dispatch(setLogoutFailed())
          toast.error("Logout failed!")
        })
    } catch (err) {
      dispatch(setLogoutFailed())
      toast.error("Logout failed!")
    }
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={user?.name || ''}

          // src={user?.image || ''}
          src="#"
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar
                      alt={user?.name || ''}

                      // src={user?.image || ''}
                      src="#"
                    />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {`${user?.name}` || ''}
                      </Typography>
                      <Typography variant='caption'>{user?.email || ''}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  {/* <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/user-profile')}>
                    <i className='tabler-user' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem> */}
                  {/* <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/account-settings')}>
                    <i className='tabler-settings' />
                    <Typography color='text.primary'>Settings</Typography>
                  </MenuItem> */}
                  {/* <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/pricing')}>
                    <i className='tabler-currency-dollar' />
                    <Typography color='text.primary'>Pricing</Typography>
                  </MenuItem>
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/faq')}>
                    <i className='tabler-help-circle' />
                    <Typography color='text.primary'>FAQ</Typography>
                  </MenuItem> */}
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
