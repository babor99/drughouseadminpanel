'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import CompetitionParticipantList from '@/views/apps/teacher/competitions/participants'

const CompetitionParticipantListPage = () => {
    const isTeacher = useSelector(state => state.user.is_teacher)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isTeacher) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isTeacher ? <CompetitionParticipantList />
            }
        </>
    )
}

export default CompetitionParticipantListPage
