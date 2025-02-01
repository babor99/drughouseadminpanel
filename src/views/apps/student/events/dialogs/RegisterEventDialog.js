'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic';

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography'

// Component Imports
import DialogCloseButton from './utils/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const RegisterEventDialog = ({ loading, open, setOpen, fields, setFields, currentEventId, createEventEnrollment }) => {
    const handleClose = () => {
        setOpen(false)
    }

    const setFieldValue = (index, value) => {
        const updatedFields = fields.map((field, idx) => {
            if (idx === index) {
                if (['MCQ', 'TF', 'FITB'].includes(field.field_type)) {
                    return { ...field, selected_answer: value }
                } else if (field.field_type === 'FILE') {
                    return { ...field, file: value }
                } else {
                    return { ...field, text: value }
                }
            } else {
                return field
            }
        })

        setFields(updatedFields);
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
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center'>
                Registration
            </DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <div>
                        {
                            fields?.map((field, index) => (
                                ['MCQ', 'TF'].includes(field.field_type) ?
                                    field?.options && (
                                        <div key={index} className="flex items-center justify-start gap-10 lg:gap-16 mt-4">
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label" className="mb-3 font-bold">{field.field_title}</FormLabel>
                                                <RadioGroup
                                                    aria-required={field?.is_required}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    onChange={(e, value) => setFieldValue(index, value)}
                                                >
                                                    <div className="flex gap:6 lg:gap-10">
                                                        {
                                                            field.options?.map((option, idx) => (
                                                                <FormControlLabel key={idx} value={option.id} control={<Radio />} label={option.value} />
                                                            ))
                                                        }
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )
                                    :
                                    field.field_type === 'FITB' ?
                                        <CustomTextField
                                            key={index}
                                            fullWidth
                                            required={field?.is_required}
                                            id={`${index}`}
                                            label={field.field_title}
                                            variant="outlined"
                                            placeholder="Type your answer"
                                            type='text'
                                            className="my-2 lg:my-4"
                                            defaultValue={field?.correct_answer}
                                            onChange={(e) => setFieldValue(index, e.target.value)}
                                        />
                                        :
                                        field.field_type === 'TEXT' ?
                                            <CustomTextField
                                                key={index}
                                                fullWidth
                                                required={field?.is_required}
                                                id={`text${index}`}
                                                label={field.field_title}
                                                variant="outlined"
                                                placeholder="Type here"
                                                type='text'
                                                className="my-2 lg:my-4"
                                                defaultValue={field?.text}
                                                onChange={(e) => setFieldValue(index, e.target.value)}
                                            />
                                            :
                                            field.field_type === 'FILE' ?
                                                <CustomTextField
                                                    key={index}
                                                    fullWidth
                                                    required={field?.is_required}
                                                    id={`file${index}`}
                                                    label={field.field_title}
                                                    variant="outlined"
                                                    type='file'
                                                    className="my-2 lg:my-4"
                                                    onChange={(e) => setFieldValue(index, e.target.files[0])}
                                                />
                                                :
                                                ''
                            ))
                        }
                    </div>
                </DialogContent>
                <DialogActions className='justify-center pbs-0'>
                    <Button
                        variant='outlined'
                        className="bg-primary text-white"
                        disabled={loading}
                        onClick={() => createEventEnrollment(currentEventId, fields)}
                    >
                        Join
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default RegisterEventDialog
