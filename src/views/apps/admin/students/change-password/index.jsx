'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormHeader from './FormHeader'
import AdminStudentPasswordForm from './AdminStudentPasswordForm'
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const AdminStudentChangePasswordForm = () => {
    const { studentId, lang: locale } = useParams()
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
        if (!isNumber(studentId)) {
            router.replace(getLocalizedUrl('/apps/admin/students', locale))
        }
    }, [studentId])

    return (
        <div>
            {
                !isNumber(studentId) ?
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
                                        <AdminStudentPasswordForm />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormProvider>
            }
        </div>
    )
}

export default AdminStudentChangePasswordForm
