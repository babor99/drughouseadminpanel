'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import CourseDetails from '@/views/apps/student/course-details'

const CourseDetailsPage = () => {
  const isStudent = useSelector(state => state.user.is_student)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isStudent) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isStudent ? <CourseDetails />
      }
    </>
  )
}

export default CourseDetailsPage
