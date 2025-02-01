'use client'

import { useSelector } from 'react-redux'

import AdminDashboard from '@/views/apps/admin/dashboard'
import RPMDashboard from '@/views/apps/rpm/dashboard'
import StudentDashboard from '@/views/apps/student/dashboard'
import TeacherDashboard from '@/views/apps/teacher/dashboard'
import InstructorDashboard from '@/views/apps/instructor/dashboard'

const AcademyDashboard = () => {
  const isAdmin = useSelector(state => state.user.is_admin)
  const isStudent = useSelector(state => state.user.is_student)
  const isTeacher = useSelector(state => state.user.is_teacher)
  const isInstructor = useSelector(state => state.user.is_instructor)
  const isParent = useSelector(state => state.user.is_parent)
  const isRPM = useSelector(state => state.user.is_rpm)

  // here all dashboards will be rendered conditionally.

  return <>{isAdmin ? <AdminDashboard /> : isRPM ? <RPMDashboard /> : isStudent ? <StudentDashboard /> : isTeacher ? <TeacherDashboard /> : isInstructor ? <InstructorDashboard /> : 'Permission Denied'}</>
}

export default AcademyDashboard
