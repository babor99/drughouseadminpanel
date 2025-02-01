'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import InstructorLectureForm from '@/views/apps/instructor/lectures-deprecated-will-delete-soon/form'

const InstructorLectureFormPage = () => {
    const isInstructor = useSelector(state => state.user.is_instructor)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isInstructor) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isInstructor ? <InstructorLectureForm /> : ''
            }
        </>
    )
}

export default InstructorLectureFormPage
