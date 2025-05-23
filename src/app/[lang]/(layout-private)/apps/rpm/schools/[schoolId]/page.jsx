'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import RPMSchoolForm from '@/views/apps/rpm/schools/form'

const RPMSchoolFormPage = () => {
    const isRPM = useSelector(state => state.user.is_rpm)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isRPM) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isRPM ? <RPMSchoolForm />
            }
        </>
    )
}

export default RPMSchoolFormPage
