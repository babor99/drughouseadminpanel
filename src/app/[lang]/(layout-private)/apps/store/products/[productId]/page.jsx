'use client'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { getLocalizedUrl } from '@/utils/i18n'

import ProductForm from '@/views/apps/store/products/form'

const ProductFormPage = () => {
    const isAdmin = useSelector(state => state.user.is_admin)

    const router = useRouter()
    const { lang: locale } = useParams()

    // if (!isAdmin) {
    //     router.replace(getLocalizedUrl('/', locale))
    // }

    return (
        <>
            {
                <ProductForm />
            }
        </>
    )
}

export default ProductFormPage
