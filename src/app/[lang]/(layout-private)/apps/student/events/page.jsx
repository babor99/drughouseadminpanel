'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import EventList from '@/views/apps/student/events/list'

const EventListPage = () => {
    const isStudent = useSelector(state => state.user.is_student)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isStudent) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isStudent ? <EventList /> : ''
            }
        </>
    )
}

export default EventListPage
