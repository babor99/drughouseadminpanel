'use client'

import { useDispatch } from 'react-redux'

// Third-party import
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'

// Component Imports
import KanbanList from './utils/KanbanList'

const KanbanBoard = ({ tasks, updateStoreIds }) => {
    const dispatch = useDispatch()

    // the first argument is an array of columns. it is mandatory for useDragAndDrop hook
    const [boardRef] = useDragAndDrop([{ id: 1, title: 'Default' }], {
        plugins: [animations()],
        dragHandle: '.list-handle'
    })

    return (
        <div className='flex items-start justify-center'>
            <div ref={boardRef} className='border-2 w-3/4 p-4 lg:p-8'>
                <KanbanList
                    dispatch={dispatch}
                    tasks={tasks}
                    updateStoreIds={updateStoreIds}
                />
            </div>
        </div>
    )
}

export default KanbanBoard
