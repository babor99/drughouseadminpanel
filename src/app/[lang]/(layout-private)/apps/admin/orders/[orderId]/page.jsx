'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import OrderMasterDetail from '@/views/apps/admin/orders/details'

const OrderMasterDetailPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { orderId, lang: locale } = useParams()

    if (!isAdmin) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isAdmin ? <OrderMasterDetail /> : ''
            }
        </>
    )
}

export default OrderMasterDetailPage
