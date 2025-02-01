'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import Courses from '@/views/apps/admin/courses/list'

const CoursePage = () => {
  const isAdmin = useSelector(state => state.user.is_admin)

  const router = useRouter()
  const { lang: locale } = useParams()

  if (!isAdmin) {
    router.replace(getLocalizedUrl('/', locale))
  }

  return (
    <>
      {
        isAdmin ? <Courses mode={undefined} /> : ''
      }
    </>
  )
}

export default CoursePage
