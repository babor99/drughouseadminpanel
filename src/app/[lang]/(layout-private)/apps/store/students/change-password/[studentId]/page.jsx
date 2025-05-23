'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import StudentChangePasswordForm from '@/views/apps/store/students/change-password'

const StudentChangePasswordFormPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { lang: locale } = useParams()

    // if (!isAdmin) {
    //     router.replace(getLocalizedUrl('/', locale))
    // }

    return (
        <>
            {
                <StudentChangePasswordForm />
            }
        </>
    )
}

export default StudentChangePasswordFormPage
