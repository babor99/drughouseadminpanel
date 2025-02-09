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
import ProductCategoryInformation from './FormInformation'

import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { GET_PRODUCT_CATEGORY_BY_ID } from '@/constants/constants';

const ProductCategoryForm = () => {
    const { productCategoryId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [productCategory, setProductCategory] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Category name is required').min(3, 'Must be at least 3 characters'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (productCategory && Object.keys(productCategory).length) {
            reset({ ...productCategory })
        }
    }, [productCategory])

    useEffect(() => {
        if (productCategoryId !== 'new' && !isNumber(productCategoryId)) {
            router.replace(getLocalizedUrl('/apps/admin/product-categories', locale))
        }

        if (isNumber(productCategoryId)) {
            getAProductCategory()
        }

    }, [productCategoryId])

    function getAProductCategory() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_PRODUCT_CATEGORY_BY_ID}${productCategoryId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`ProductCategory get failed with status code ${res.status}`)
                })
                .then(data => {
                    setProductCategory(data)
                })
                .catch(error => { })
        } catch (err) { }
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <FormHeader />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <ProductCategoryInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default ProductCategoryForm
