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
import RoleInformation from './FormInformation'

import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { GET_ROLE_BY_ID } from '@/constants/constants';

const RoleForm = () => {
    const { roleId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [role, setRole] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string()
		.matches(/^[a-zA-Z0-9\s]*$/, 'Name should only contain alphabets, numeric keys, and spaces')
		.matches(/^[^\s]*(\s[^\s]+)*$/, 'Consecutive double spaces between characters are not allowed')
		.required('Name is required'),
        permissions: yup.array().notRequired(),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (role && Object.keys(role).length) {
            reset({ ...role })
        }
    }, [role])

    useEffect(() => {
        if (roleId !== 'new' && !isNumber(roleId)) {
            router.replace(getLocalizedUrl('/apps/store/roles', locale))
        }

        if (isNumber(roleId)) {
            getARole()
        }

    }, [roleId])

    function getARole() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_ROLE_BY_ID}${roleId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Role get failed with status code ${res.status}`)
                })
                .then(data => {
                    setRole(data)
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
                            <RoleInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default RoleForm
