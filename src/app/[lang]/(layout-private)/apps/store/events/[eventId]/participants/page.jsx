'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import EventParticipantList from '@/views/apps/store/events/participants'

const EventParticipantListPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { lang: locale } = useParams()

    // if (!isAdmin) {
    //     router.replace(getLocalizedUrl('/', locale))
    // }

    return (
        <>
            {
                <EventParticipantList />
            }
        </>
    )
}

export default EventParticipantListPage
