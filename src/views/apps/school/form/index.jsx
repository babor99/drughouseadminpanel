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
import SchoolInformation from './SchoolInformation'
import SectionsInformation from './SectionsInformation'
import { GET_SCHOOL_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const SchoolForm = () => {
    const { schoolId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [school, setSchool] = useState({})
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
        if (Object.keys(school).length) {
            reset({ ...school })
        }
    }, [school])

    useEffect(() => {
        if (schoolId !== 'new' && !isNumber(schoolId)) {
            router.replace(getLocalizedUrl('/apps/school', locale))
        }

        if (isNumber(schoolId)) {
            getASchool()
        }

    }, [schoolId])

    function getASchool() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_SCHOOL_BY_ID}${schoolId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`School get failed with status code ${res.status}`)
                })
                .then(data => {

                    setSchool(data?.school)
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
                <Grid item xs={12} md={schoolId === 'new' ? 12 : 7}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className="mb-2 xl:mb-3">
                                <FormHeader />
                            </div>
                            <SchoolInformation />
                        </Grid>
                    </Grid>
                </Grid>
                {
                    schoolId !== 'new' &&
                    <Grid item xs={12} md={5}>
                        <SectionsInformation sections={sections} />
                    </Grid>
                }
            </Grid>
        </FormProvider>
    )
}

export default SchoolForm
