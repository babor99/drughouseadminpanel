'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import CourseDetails from '@/views/apps/admin/courses/details'

const CourseDetailsPage = () => {
  const isAdmin = useSelector(state => state.user.is_admin)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isAdmin) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isAdmin ? <CourseDetails /> : ''
      }
    </>
  )
}

export default CourseDetailsPage
