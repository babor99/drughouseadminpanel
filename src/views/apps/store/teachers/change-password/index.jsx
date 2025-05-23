'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormHeader from './FormHeader'
import TeacherPasswordForm from './TeacherPasswordForm'
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const TeacherChangePasswordForm = () => {
    const { teacherId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const router = useRouter()

    const yupObject = {
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (!isNumber(teacherId)) {
            router.replace(getLocalizedUrl('/apps/teacher', locale))
        }

    }, [teacherId])

    return (
        <div>
            {
                !isNumber(teacherId) ?
                    <div className="flex items-center justify-center">
                        <Typography>Not found!</Typography>
                    </div>
                    :
                    <FormProvider {...methods}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <FormHeader />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={6}>
                                    <Grid item xs={12}>
                                        <TeacherPasswordForm />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormProvider>
            }
        </div>
    )
}

export default TeacherChangePasswordForm
