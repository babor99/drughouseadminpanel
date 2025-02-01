'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import Grid from '@mui/material/Grid'


// Component Imports
import FormHeader from './FormHeader'
import CourseInformation from './CourseInformation'

import { GET_INSTRUCTOR_COURSE_BY_ID } from '@/constants/constants';
import { isNumber, timeStringToMinutes } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { getInstructorLectureSectionsByCourseIdWP } from '@/redux-store/slices/instructor'

const InstructorStudentForm = () => {
    const { courseId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [course, setCourse] = useState({})
    const [assignments, setAssignments] = useState([])
    const [enrollments, setEnrollments] = useState([])
    const [sections, setSections] = useState([])

    const router = useRouter()
    const dispatch = useDispatch()

    const yupObject = {
        name: yup.string().required('Name is required').min(5, 'Name must be at least 3 characters'),
        category: yup.number().required('Category is required'),
        language: yup.string().required('Language is required').min(3, 'Language must be at least 2 characters'),
        has_caption: yup.boolean().required(''),
        is_premium: yup.boolean().required(''),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(course).length) {
            reset({ ...course })
        }
    }, [course])

    useEffect(() => {
        if (courseId !== 'new' && !isNumber(courseId)) {
            router.replace(getLocalizedUrl('/apps/course/courses', locale))
        }

        if (isNumber(courseId)) {
            getAInstructorCourse()
            dispatch(getInstructorLectureSectionsByCourseIdWP(accessToken, csrfToken, courseId))
        }
    }, [courseId])

    function getAInstructorCourse() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_INSTRUCTOR_COURSE_BY_ID}${courseId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Course get failed with status code ${res.status}`)
                })
                .then(data => {

                    setCourse(data?.course || {})
                    setAssignments(data?.assignments || [])
                    setEnrollments(data?.enrollments || [])
                    setSections(data?.sections || [])
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
                            <CourseInformation
                                assignments={assignments}
                                enrollments={enrollments}
                                sections={sections}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default InstructorStudentForm
