// Third-party Imports
import { createSlice } from '@reduxjs/toolkit'

export const myKanbanSlice = createSlice({
  name: 'myKanban',
  initialState: {
    lectureIds: [],
    lectureSectionIds: [],
  },
  reducers: {
    updateLectureSectionIds: (state, action) => {
      const { tasksList } = action.payload

      state.lectureSectionIds = tasksList.map(task => task.id)
    },
    updateLectureIds: (state, action) => {
      const { tasksList } = action.payload

      state.lectureIds = tasksList.map(task => task.id)
    }
  }
})

export const {
  updateLectureSectionIds,
  updateLectureIds,
} = myKanbanSlice.actions

export default myKanbanSlice.reducer
