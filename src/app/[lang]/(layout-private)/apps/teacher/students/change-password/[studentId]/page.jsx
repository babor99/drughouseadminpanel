'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import StudentChangePasswordForm from '@/views/apps/teacher/students/change-password'

const StudentChangePasswordFormPage = () => {
    const isTeacher = useSelector(state => state.user.is_teacher)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isTeacher) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isTeacher ? <StudentChangePasswordForm />
            }
        </>
    )
}

export default StudentChangePasswordFormPage
