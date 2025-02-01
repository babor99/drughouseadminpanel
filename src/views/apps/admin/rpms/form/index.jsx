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
import RPMInformation from './RPMInformation'
import AssignedRegionsSchools from './AssignedRegionsSchools'
import { GET_RPM_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const RPMForm = () => {
    const { rpmId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [isSuspended, setIsSuspended] = useState(null)
    const [rpm, setRPM] = useState({})

    const router = useRouter()

    const yupObject = rpmId === 'new' ? {
        name: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
        last_name: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
        email: yup.string().email('You must enter a valid email address').required('You must enter an email address'),
        phone_number: yup.string().required('Phone number is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    } :
        {
            name: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
            last_name: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
            email: yup.string().email('You must enter a valid email address').required('You must enter an email address'),
            phone_number: yup.string().required('Phone number is required'),
        }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(rpm).length) {
            reset({ ...rpm })
            setIsSuspended(rpm?.is_suspended)
        }
    }, [rpm])

    useEffect(() => {
        if (rpmId !== 'new' && !isNumber(rpmId)) {
            router.replace(getLocalizedUrl('/apps/rpm', locale))
        }

        if (isNumber(rpmId)) {
            getARPM()
        }

    }, [rpmId])

    function getARPM() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_RPM_BY_ID}${rpmId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`RPM get failed with status code ${res.status}`)
                })
                .then(data => {

                    setRPM(data)
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
                    <FormHeader />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <RPMInformation isSuspended={isSuspended} />
                        </Grid>
                        <Grid item xs={12}>
                            <AssignedRegionsSchools />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default RPMForm
