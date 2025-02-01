'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import PremiumCourses from '@/views/apps/student/premium-courses'

const CoursePage = () => {
  const isAdmin = useSelector(state => state.user.is_admin)
  const isStudent = useSelector(state => state.user.is_student)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isAdmin && !isStudent) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        (isAdmin || isStudent) ? <PremiumCourses mode={undefined} /> : ''
      }
    </>
  )
}

export default CoursePage
