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
import CourseCategoryInformation from './FormInformation'

import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { GET_COURSE_CATEGORY_BY_ID } from '@/constants/constants';

const CourseCategoryForm = () => {
    const { courseCategoryId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [courseCategory, setCourseCategory] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Category name is required').min(3, 'Must be at least 3 characters'),
        color_code: yup.string().required('ColorCode is required'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(courseCategory).length) {
            reset({ ...courseCategory })
        }
    }, [courseCategory])

    useEffect(() => {
        if (courseCategoryId !== 'new' && !isNumber(courseCategoryId)) {
            router.replace(getLocalizedUrl('/apps/admin/course-categories', locale))
        }

        if (isNumber(courseCategoryId)) {
            getACourseCategory()
        }

    }, [courseCategoryId])

    function getACourseCategory() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_COURSE_CATEGORY_BY_ID}${courseCategoryId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`CourseCategory get failed with status code ${res.status}`)
                })
                .then(data => {
                    setCourseCategory(data)
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
                            <CourseCategoryInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default CourseCategoryForm
