'use client'

// React Imports
import { useEffect, useState } from 'react'

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

const EditSection = ({ open, setOpen, sectionName, sectionId, updateSection }) => {
    // States
    const [name, setName] = useState('')

    useEffect(() => {
        sectionName && setName(sectionName)
    }, [sectionName])

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
                Update Section
            </DialogTitle>
            <Divider />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                <div className="my-4 lg:my-8">
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label='Section title'
                                placeholder=''
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions className='justify-center'>
                <Button
                    variant='contained'
                    type='submit'
                    disabled={name.length < 3}
                    onClick={() => updateSection(name, sectionId, setOpen)}
                >
                    Update
                </Button>
                <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditSection
