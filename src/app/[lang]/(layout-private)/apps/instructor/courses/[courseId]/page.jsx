'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import InstructorCourseForm from '@/views/apps/instructor/courses/form'

const InstructorCourseFormPage = () => {
    const isInstructor = useSelector(state => state.user.is_instructor)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isInstructor) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isInstructor ? <InstructorCourseForm />
            }
        </>
    )
}

export default InstructorCourseFormPage
