'use client'

// React Imports
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import KanbanBoard from '@/components/custom/kanban/KanbanBoard'
import { updateLectureIds } from '@/redux-store/slices/myKanban'

const SortLessons = ({ open, setOpen, lectures, updateLessonSorting }) => {
    // Hooks
    const myKanbanStore = useSelector(state => state.myKanban)
    const sortedIds = useSelector(state => state.myKanban.lectureIds || [])

    // the first argument is an array of columns. it is mandatory for useDragAndDrop hook
    const [boardRef] = useDragAndDrop([{ id: 1, title: 'Default' }], {
        plugins: [animations()],
        dragHandle: '.list-handle'
    })

    // close modal func
    const handleClose = () => {
        setOpen(false)
    }

    const callUpdateLessonSortingFunc = () => {
        updateLessonSorting(sortedIds, setOpen)
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
            <DialogTitle variant='h5' className='flex flex-col text-center'>
                Sort Lessons
            </DialogTitle>
            <Divider />
            <div className="flex justify-between m-2 lg:m-3 ">
                <Typography variant='h6'>List of Lessons</Typography>
                <Button onClick={callUpdateLessonSortingFunc} variant='outlined' className="bg-primary text-white">Update sorting</Button>
            </div>
            <div className="mb-5 mt-3 lg:mb-10 lg:mt-6">
                <DialogContent className='overflow-visible'>
                    <KanbanBoard
                        tasks={lectures}
                        updateStoreIds={updateLectureIds}
                    />
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default SortLessons
