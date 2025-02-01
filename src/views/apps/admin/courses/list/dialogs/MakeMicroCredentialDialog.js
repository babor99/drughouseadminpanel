'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import Switch from '@mui/material/Switch'

// Component Imports
import DialogCloseButton from './utils/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const EditAssignmentDialog = ({ open, setOpen, setDialogMicroCredentialCourses, makeCourseMicroCredential, course }) => {
    const schoolOptions = useSelector(state => state.data.schools)

    // const [currentCourseId, setCurrentCourseId] = useState(course?.id)

    const [formData, setFormData] = useState({
        is_microcredential: false,
        schools: [],
    })

    useEffect(() => {
        if (course) {
            // setCurrentCourseId(course?.id)
            setFormData({
                id: course?.id,
                is_microcredential: course?.is_microcredential,
                allowed_schools: course?.allowed_schools,
            })
        }
    }, [open, course])

    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            return { ...prevData, [field]: value }
        })
    }

    const handleClose = () => {
        setOpen(false)
        setDialogMicroCredentialCourses((prevState) => ({ ...prevState, [course.id]: null }))
    }

    const makeCourseMicroCredentialCallback = ({ success }) => {
        if (success) {
            setFormData({
                is_microcredential: false,
                allowed_schools: []
            })
            handleClose()
        }
    }

    const callMakeCourseMicroCredential = () => {

        makeCourseMicroCredential(formData, course.id, makeCourseMicroCredentialCallback)
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='lg'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={handleClose} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
                Make Micro-credential
            </DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <div className='flex items-center justify-start my-4'>
                        <Typography className='mr-2'>Is Micro-credential?</Typography>
                        <Switch
                            id="is_microcredential"
                            checked={formData?.is_microcredential}
                            onChange={(e, checked) => handleInputChange('is_microcredential', checked)}
                        />
                    </div>
                    <div className='my-4'>
                        <Autocomplete
                            multiple
                            filterSelectedOptions
                            disabled={!formData.is_microcredential}
                            options={schoolOptions}
                            value={formData?.allowed_schools ? schoolOptions.filter(school => formData?.allowed_schools?.includes(school?.id)) : []}
                            getOptionKey={option => option?.id}
                            getOptionLabel={option => `${option.name}`}
                            onChange={(event, newValues) => {
                                const selectedValues = newValues.map(option => option.id);

                                handleInputChange('allowed_schools', selectedValues)
                            }}
                            renderInput={params => {
                                return (
                                    <CustomTextField
                                        {...params}
                                        label="Assigned Schools"
                                        placeholder="Select allowed schools"
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
                    <Button
                        ariant='outlined'
                        className="bg-primary text-white"
                        disabled={formData?.schools?.length < 1}
                        onClick={callMakeCourseMicroCredential}
                    >
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditAssignmentDialog
