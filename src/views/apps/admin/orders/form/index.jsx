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
import OrderInformation from './OrderInformation'
import { GET_ORDER_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const OrderForm = () => {
    const { orderId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [order, setOrder] = useState({})
    const [sections, setSections] = useState([])

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
        year_started: yup.number().required('Last name is required'),
        state: yup.number().required('State is required'),
        region: yup.number().required('District is required'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(order).length) {
            reset({ ...order })
        }
    }, [order])

    useEffect(() => {
        if (orderId !== 'new' && !isNumber(orderId)) {
            router.replace(getLocalizedUrl('/apps/order', locale))
        }

        if (isNumber(orderId)) {
            getAOrder()
        }

    }, [orderId])

    function getAOrder() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_ORDER_BY_ID}${orderId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Order get failed with status code ${res.status}`)
                })
                .then(data => {

                    setOrder(data?.order)
                    setSections(data?.sections)
                })
                .catch(error => {

                })
        } catch (err) {

        }
    }



    return (
        <FormProvider {...methods}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={orderId === 'new' ? 12 : 7}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className="mb-2 xl:mb-3">
                                <FormHeader />
                            </div>
                            <OrderInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default OrderForm
