'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Typography } from '@mui/material'

// Component Imports
import DialogCloseButton from './utils/DialogCloseButton'

const RegisterEventSuccessDialog = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='sm'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={handleClose} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16 text-error'>
                Welcome!
            </DialogTitle>
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                <div className="flex items-center justify-center">
                    <Typography variant='h6' className="text-success text-center">Thank You For Registering, We can’t wait to see you at the conference!</Typography>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <Button variant='contained' size='small' color='primary' onClick={handleClose} >Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterEventSuccessDialog
