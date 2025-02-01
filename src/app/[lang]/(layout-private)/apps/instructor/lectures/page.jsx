'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import InstructorLectures from '@/views/apps/instructor/lectures-deprecated-will-delete-soon/list'

const InstructorLecturePage = () => {
  const isInstructor = useSelector(state => state.user.is_instructor)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isInstructor) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isInstructor ? <InstructorLectures mode={undefined} /> : ''
      }
    </>
  )
}

export default InstructorLecturePage
