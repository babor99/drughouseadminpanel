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


const DeleteSection = ({ open, setOpen, lecture, lectureId, deleteLecture }) => {

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
                Delete {lecture?.is_quiz ? 'Quiz' : 'Lesson'}!
            </DialogTitle>
            <Divider />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                <div className="my-5 lg:my-10 text-center">
                    <Typography variant='h5' className="mb-2 lg:mb-4">Are you sure to delete this {lecture?.is_quiz ? 'quiz' : 'lesson'}?</Typography>
                </div>
            </DialogContent>
            <DialogActions className='justify-center'>
                <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteLecture(lectureId, setOpen)}
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
