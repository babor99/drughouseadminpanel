'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import MyCourses from '@/views/apps/student/my-courses'

const MyCoursePage = () => {
  const isStudent = useSelector(state => state.user.is_student)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isStudent) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isStudent ? <MyCourses mode={undefined} /> : ''
      }
    </>
  )
}

export default MyCoursePage
