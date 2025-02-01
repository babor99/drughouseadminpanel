'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic';

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

// Component Imports
import DialogCloseButton from './utils/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

const EditAssignmentDialog = ({ open, setOpen, handleMenuClose, handleCloseUpdateDialog, updateAssignment, assignment }) => {
    const [questions, setQuestions] = useState('')
    const [questionFile, setQuestionFile] = useState('')

    const [formData, setFormData] = useState({
        id: '',
        course: '',
        name: '',
        total_marks: '',
        deadline_date: '',
        deadline_time: '',
        note: '',
    })

    useEffect(() => {
        if (assignment) {
            setFormData({
                id: assignment?.id,
                course: assignment?.course,
                name: assignment?.name,
                total_marks: assignment?.total_marks,
                deadline_date: assignment?.deadline_date,
                deadline_time: assignment?.deadline_time,
                note: assignment?.note,
            })
            setQuestions(assignment?.questions)
        }
    }, [assignment, open])

    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            return { ...prevData, [field]: value }
        })
    }

    const handleClose = () => {
        setOpen(false)
        handleMenuClose(formData.id)
        handleCloseUpdateDialog(formData.id)
    }

    const updateAssignmentCallback = ({ success, assignmentId }) => {
        if (success) {

            setQuestions('')
            setQuestionFile('')
            setFormData({
                name: '',
                total_marks: '',
                deadline_date: '',
                deadline_time: '',
                note: '',
                submission_status: ''
            })
            setOpen(false)
            handleMenuClose(assignmentId)
            handleCloseUpdateDialog(assignmentId)
        }
    }

    const callUpdateAssignmentFunc = () => {
        const formdata = new FormData()

        formdata.append('questions', questions)
        formdata.append('question_file', questionFile)

        for (let key of Object.keys(formData)) {

            formdata.append(key, formData[key])
        }

        updateAssignment({ formdata, assignmentId: formData.id }, updateAssignmentCallback)
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
            <DialogCloseButton onClick={handleClose} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
                Update Assignment
            </DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <div>
                        <CustomTextField
                            fullWidth
                            id="name"
                            variant="outlined"
                            label="Assignment title*"
                            placeholder="First Assignment"
                            className="my-2 lg:my-4"
                            value={formData?.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <div className="">
                            <Typography className="text-sm">Questions</Typography>
                            <CustomTinyMCEEditor
                                id={`tiny-update-assignment-questions${assignment?.id}`}
                                value={questions}
                                setValue={setQuestions}
                            />
                        </div>
                        <CustomTextField
                            fullWidth
                            id="question_file"
                            variant="outlined"
                            label="Question file"
                            placeholder=""
                            className="my-2 lg:my-4"
                            type="file"
                            onChange={(e) => {

                                setQuestionFile(e.target.files[0])
                            }}
                        />
                        <CustomTextField
                            fullWidth
                            id="total_marks"
                            variant="outlined"
                            label="Total marks*"
                            placeholder=""
                            className="my-2 lg:my-4"
                            type="number"
                            value={formData?.total_marks}
                            onChange={(e) => handleInputChange('total_marks', e.target.value)}
                        />
                        <CustomTextField
                            fullWidth
                            id="deadline_date"
                            variant="outlined"
                            label="Deadline (date)*"
                            placeholder=""
                            className="my-2 lg:my-4"
                            type="date"
                            value={formData?.deadline_date}
                            onChange={(e) => handleInputChange('deadline_date', e.target.value)}
                        />
                        <CustomTextField
                            fullWidth
                            id="deadline_time"
                            variant="outlined"
                            label="Deadline (time)*"
                            placeholder=""
                            className="my-2 lg:my-4"
                            type="time"
                            value={formData?.deadline_time}
                            onChange={(e) => handleInputChange('deadline_time', e.target.value)}
                        />
                        <CustomTextField
                            fullWidth
                            id="note"
                            variant="outlined"
                            label="Note"
                            placeholder=""
                            className="my-2 lg:my-4"
                            value={formData?.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
                    <Button onClick={callUpdateAssignmentFunc} variant='outlined' className="bg-primary text-white">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditAssignmentDialog
