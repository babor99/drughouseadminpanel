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
import { updateLectureSectionIds } from '@/redux-store/slices/myKanban'

const SortSections = ({ open, setOpen, updateSectionSorting }) => {
    const onlySections = useSelector(state => state.instructor.instructorLectureSectionsByCourseId || [])

    // Hooks
    const myKanbanStore = useSelector(state => state.myKanban)
    const sortedIds = useSelector(state => state.myKanban.lectureSectionIds || [])

    // the first argument is an array of columns. it is mandatory for useDragAndDrop hook
    const [boardRef] = useDragAndDrop([{ id: 1, title: 'Default' }], {
        plugins: [animations()],
        dragHandle: '.list-handle'
    })

    // close modal func
    const handleClose = () => {
        setOpen(false)
    }

    const callUpdateSectionSortingFunc = () => {
        updateSectionSorting(sortedIds, setOpen)
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
                Sort Sections
            </DialogTitle>
            <Divider />
            <div className="flex justify-between m-2 lg:m-3 ">
                <Typography variant='h6'>List of Sections</Typography>
                <Button onClick={callUpdateSectionSortingFunc} variant='outlined' className="bg-primary text-white">Update sorting</Button>
            </div>
            <div className="mb-5 mt-3 lg:mb-10 lg:mt-6">
                <DialogContent className='overflow-visible'>
                    <KanbanBoard
                        tasks={onlySections}
                        updateStoreIds={updateLectureSectionIds}
                    />
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default SortSections
