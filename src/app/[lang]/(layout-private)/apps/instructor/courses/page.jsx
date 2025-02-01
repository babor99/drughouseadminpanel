'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import InstructorCourses from '@/views/apps/instructor/courses/list'

const InstructorCoursePage = () => {
  const isInstructor = useSelector(state => state.user.is_instructor)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isInstructor) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isInstructor ? <InstructorCourses mode={undefined} /> : ''
      }
    </>
  )
}

export default InstructorCoursePage
