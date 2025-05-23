'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import OrderMasterDetail from '@/views/apps/store/orders/details'
import NewOrderForm from '@/views/apps/store/orders/form'
import NotFoundPage from '@/views/NotFound'

import { isNumber } from '@/commons/utils'

const OrderMasterDetailPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { orderId, lang: locale } = useParams()

    // if (!isAdmin) {
    //     router.replace(getLocalizedUrl('/', locale))
    // }

    return (
        <>
            {
                orderId === 'new' ? <NewOrderForm /> : isNumber(orderId) ? <OrderMasterDetail /> : <NotFoundPage />
            }
        </>
    )
}

export default OrderMasterDetailPage
