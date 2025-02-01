'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import StudentForm from '@/views/apps/teacher/students/form'

const StudentFormPage = () => {
    const isTeacher = useSelector(state => state.user.is_teacher)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isTeacher) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isTeacher ? <StudentForm /> : ''
            }
        </>
    )
}

export default StudentFormPage
