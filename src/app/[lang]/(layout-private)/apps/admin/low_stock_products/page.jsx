'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import LowStockProductList from '@/views/apps/admin/low-stock-products'

const LowStockProductListPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { lang: locale } = useParams()

    if (!isAdmin) {
        router.replace(getLocalizedUrl('/', locale))
    }

    return (
        <>
            {
                isAdmin ? <LowStockProductList /> : ''
            }
        </>
    )
}

export default LowStockProductListPage
