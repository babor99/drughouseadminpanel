'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import FormHeader from './FormHeader'
import ProductInformation from './ProductInformation'
import { GET_PRODUCT_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const ProductForm = () => {
    const { productId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [product, setProduct] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
        quantity: yup.number().required('Quantity is required'),
        unit_price: yup.number().required('Unit price is required'),
        old_price: yup.number().notRequired(),
        is_active: yup.bool().notRequired(),
        is_published: yup.bool().notRequired(),
        branch: yup.string().required('Branch is required'),
        category: yup.string().required('Category is required'),
        product_type: yup.string().required('Product-type is required'),
        manufacturer: yup.string().required('Manufacturer is required'),
        sku: yup.string().notRequired(),
        gtin: yup.string().notRequired(),
        short_description: yup.string().notRequired(),
        full_description: yup.string().notRequired(),
        specification: yup.string().notRequired(),
        description: yup.string().notRequired(),
        features: yup.string().notRequired(),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (product && Object.keys(product).length) {
            reset({ ...product })
        }
    }, [product])

    useEffect(() => {
        if (productId !== 'new' && !isNumber(productId)) {
            router.replace(getLocalizedUrl('/apps/store/products', locale))
        }

        if (isNumber(productId)) {
            getAProduct()
        }

    }, [productId])

    function getAProduct() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_PRODUCT_BY_ID}${productId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Product get failed with status code ${res.status}`)
                })
                .then(data => {
                    setProduct(data)
                })
                .catch(error => {
                })
        } catch (err) {
        }
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <div className="mb-2 xl:mb-3">
                        <FormHeader />
                    </div>
                    <ProductInformation />
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default ProductForm
