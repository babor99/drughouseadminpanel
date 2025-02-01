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
import SectionInformation from './SectionInformation'
import { GET_SECTION_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const SectionForm = () => {
    const { sectionId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [section, setSection] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
        school: yup.number().required('School is required'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(section).length) {
            reset({ ...section })
        }
    }, [section])

    useEffect(() => {
        if (sectionId !== 'new' && !isNumber(sectionId)) {
            router.replace(getLocalizedUrl('/apps/section', locale))
        }

        if (isNumber(sectionId)) {
            getASection()
        }

    }, [sectionId])

    function getASection() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_SECTION_BY_ID}${sectionId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Section get failed with status code ${res.status}`)
                })
                .then(data => {

                    setSection(data)
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
                            <SectionInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default SectionForm
