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

const DeleteAssignmentDialog = ({ open, setOpen, handleMenuClose, handleCloseDeleteDialog, deleteAssignment, assignment }) => {

    const handleClose = () => {
        setOpen(false)
        handleMenuClose(assignment.id)
        handleCloseDeleteDialog(assignment.id)
    }

    const deleteAssignmentCallback = ({ success, assignmentId }) => {
        if (success) {

            setOpen(false)
            handleMenuClose(assignmentId)
            handleCloseDeleteDialog(assignmentId)
        }
    }

    const callDeleteAssignmentFunc = () => {
        deleteAssignment(assignment.id, deleteAssignmentCallback)
    }



    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='xs'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={handleClose} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16 text-error'>
                Delete Assignment
            </DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <div className="flex items-center justify-center">
                        <Typography variant='h6' className="text-warning">Are you sure to delete this assignment?</Typography>
                    </div>
                </DialogContent>
                <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
                    <Button onClick={callDeleteAssignmentFunc} variant='outlined' className="bg-primary text-white">Delete</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DeleteAssignmentDialog
