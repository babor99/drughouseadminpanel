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
import { Divider, Typography } from '@mui/material'

// Component Imports
import DialogCloseButton from './utils/DialogCloseButton'

const QuizResults = ({ open, setOpen, quizzes }) => {

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
                Quiz Results
            </DialogTitle>
            <Divider className="mb-3 lg:mb-6" />
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    {
                        quizzes && quizzes.map((quiz, index) => (
                            <div key={index}>
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <div>
                                            <Typography className="font-bold">Q{index + 1}</Typography>
                                            <Typography>{quiz.name}</Typography>
                                        </div>
                                        <div className="mt-2 lg:mt-4">
                                            <Typography className="">Total attempts: {quiz.total_attempts}</Typography>
                                            <Typography>Obtained marks of all attempts: {
                                                quiz.obtained_marks_of_attempts && quiz.obtained_marks_of_attempts.map((mark, index) => {
                                                    if (index + 1 == quiz.obtained_marks_of_attempts.length) {
                                                        return <span key={index}>{mark}</span>
                                                    } else {
                                                        return <span key={index}>{mark}, </span>
                                                    }
                                                }
                                                )
                                            }
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography className="">Total marks: {quiz.total_marks}</Typography>
                                    </div>
                                </div>
                                {/* <Button variant='outlined' className="p-1 my-1 lg:my-2 bg-primary text-white">Go to answer sheet</Button> */}
                                <Divider className="my-2 lg:my-4" />
                            </div>
                        ))
                    }
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className='justify-center'>
                    <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default QuizResults
