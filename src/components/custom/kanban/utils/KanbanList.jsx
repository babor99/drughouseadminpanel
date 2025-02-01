// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import classnames from 'classnames'

// Styles Imports
import styles from './styles.module.css'

const KanbanList = ({ dispatch, tasks, updateStoreIds }) => {

  // Hooks
  const [tasksListRef, tasksList] = useDragAndDrop(tasks, {
    group: 'tasksList',
    plugins: [animations()],
    draggable: el => el.classList.contains('item-draggable')
  })

  // Update column taskIds on drag and drop
  useEffect(() => {
    if (tasksList !== tasks) {
      dispatch(updateStoreIds({ tasksList }))
    }
  }, [tasksList])

  return (
    <div ref={tasksListRef} className=''>
      {tasksList?.map((task, index) => (
        <Card
          className={classnames(
            'item-draggable cursor-grab active:cursor-grabbing mb-4 border', styles.card)}
          key={index}
        >
          <CardContent className='gap-y-2'>
            <Typography className='break-words text-primary dark:text-white'>
              {task.name || task.title}
            </Typography>
          </CardContent>
        </Card>
      )
      )}
    </div>
  )
}

export default KanbanList
