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
import InstructorLectureInformation from './InstructorLectureInformation'

import { GET_INSTRUCTOR_LECTURE_BY_ID } from '@/constants/constants';
import { isNumber, timeStringToMinutes } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const InstructorLectureForm = () => {
    const { lectureId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const [lecture, setLecture] = useState({})

    const router = useRouter()

    const yupObject = {
        name: yup.string().required('Name is required').min(5, 'Name must be at least 3 characters'),
        course: yup.number().required('Course is required'),
        duration: yup.number().required('Duration is required'),
        parts: yup.number().required('Segment is required'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(lecture).length) {
            reset({ ...lecture })
        }
    }, [lecture])

    useEffect(() => {
        if (lectureId !== 'new' && !isNumber(lectureId)) {
            router.replace(getLocalizedUrl('/apps/lecture/lectures', locale))
        }

        if (isNumber(lectureId)) {
            getAInstructorLecture()
        }
    }, [lectureId])

    function getAInstructorLecture() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_INSTRUCTOR_LECTURE_BY_ID}${lectureId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Lecture get failed with status code ${res.status}`)
                })
                .then(data => {

                    setLecture(data || {})
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
                            <InstructorLectureInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default InstructorLectureForm
