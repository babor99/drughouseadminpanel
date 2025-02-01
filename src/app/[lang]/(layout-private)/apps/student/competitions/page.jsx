'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import CompetitionList from '@/views/apps/student/competitions/list'

const CompetitionListPage = () => {
    const isStudent = useSelector(state => state.user.is_student)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isStudent) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isStudent ? <CompetitionList /> : ''
            }
        </>
    )
}

export default CompetitionListPage
