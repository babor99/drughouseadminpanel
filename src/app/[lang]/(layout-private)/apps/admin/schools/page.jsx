'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import SchoolList from '@/views/apps/admin/schools/list'

const SchoolListPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isAdmin) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isAdmin ? <SchoolList /> : ''
            }
        </>
    )
}

export default SchoolListPage
