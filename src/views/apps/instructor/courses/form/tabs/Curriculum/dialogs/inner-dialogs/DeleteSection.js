'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'

const DeleteSection = ({ open, setOpen, sectionId, deleteSection }) => {

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
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center'>
                Delete Section!
            </DialogTitle>
            <Divider />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                <div className="my-4 lg:my-8 text-center">
                    <Typography variant='h5' className="mb-2 lg:mb-4">Are you sure to delete this section? {sectionId}</Typography>
                    <Typography variant='h6' className="text-warning" >Remember, all the related lessons will be deleted also!</Typography>
                </div>
            </DialogContent>
            <DialogActions className='justify-center'>
                <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteSection(sectionId, setOpen)}
                >
                    Delete
                </Button>
                <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteSection
