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
import { Divider } from '@mui/material'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const AddSection = ({ open, setOpen, createNewSection }) => {

    const [name, setName] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='md'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center'>
                Add New Section
            </DialogTitle>
            <Divider />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                <div className="my-4 lg:my-8">
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label='Title'
                                placeholder='History of Basic Graph'
                                onChange={e => { setName(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions className='justify-center'>
                <Button
                    variant='contained'
                    type='submit'
                    onClick={() => createNewSection(name, setOpen)}
                    disabled={name.length < 3}
                >
                    Create
                </Button>
                <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddSection
