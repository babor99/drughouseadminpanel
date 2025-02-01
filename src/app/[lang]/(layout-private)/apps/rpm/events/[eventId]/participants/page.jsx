'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import EventParticipantList from '@/views/apps/rpm/events/participants'

const EventParticipantListPage = () => {
    const isRPM = useSelector(state => state.user.is_rpm)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isRPM) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isRPM ? <EventParticipantList /> : ''
            }
        </>
    )
}

export default EventParticipantListPage
