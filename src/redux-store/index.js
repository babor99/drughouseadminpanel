// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import authenticationReducer from './slices/authentication'
import userReducer from './slices/user'
import dataReducer from './slices/data'
import dashboardReducer from './slices/dashboard'
import studentReducer from './slices/student'
import instructorReducer from './slices/instructor'
import teacherReducer from './slices/teacher'
import rpmReducer from './slices/rpm'
import myKanbanReducer from './slices/myKanban'

import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import emailReducer from '@/redux-store/slices/email'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    data: dataReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    instructor: instructorReducer,
    teacher: teacherReducer,
    rpm: rpmReducer,
    myKanban: myKanbanReducer,

    chatReducer,
    calendarReducer,
    kanbanReducer,
    emailReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})
