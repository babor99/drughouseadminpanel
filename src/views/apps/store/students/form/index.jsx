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
import StudentRegistrations from './StudentRegistrations'
import AdminStudentInformation from './AdminStudentInformation'
import RelatedSchoolSection from './RelatedSchoolSection'

import { GET_ADMIN_STUDENT_BY_ID } from '@/constants/constants';
import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';

const AdminStudentForm = () => {
    const { studentId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [isSuspended, setIsSuspended] = useState(false)
    const [student, setStudent] = useState({})
    const [eventEnrollments, setEventEnrollments] = useState([])
    const [competitionEnrollments, setCompetitionEnrollments] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const yupObject = studentId === 'new' ? {
        name: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
        last_name: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
        email: yup.string().email('You must enter a valid email address').required('You must enter an email address'),
        phone_number: yup.string().required('Phone number is required'),
        school: yup.number().required('School is required'),

        // section: yup.number().required('Section is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    } :
        {
            name: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
            last_name: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
            email: yup.string().email('You must enter a valid email address').required('You must enter an email address'),
            phone_number: yup.string().required('Phone number is required'),
            school: yup.number().required('School is required'),

            // section: yup.number().required('Section is required'),
        }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(student).length) {
            reset({ ...student })
            setIsSuspended(student?.is_suspended || false)
        }
    }, [student])

    useEffect(() => {
        if (studentId !== 'new' && !isNumber(studentId)) {
            router.replace(getLocalizedUrl('/apps/student/students', locale))
        }

        if (isNumber(studentId)) {
            getAStudent()
        }
    }, [studentId])

    function getAStudent() {
        setLoading(true)

        try {
            fetch(`${GET_ADMIN_STUDENT_BY_ID}${studentId}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken
                }
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Student get failed with status code ${res.status}`)
                })
                .then(data => {
                    setLoading(false)
                    setStudent(data?.student || {})
                    setEventEnrollments(data?.event_enrollments || [])
                    setCompetitionEnrollments(data?.competition_enrollments || [])
                })
                .catch(error => {
                    setLoading(false)
                })
        } catch (err) {
            setLoading(false)
        }
    }

    console.log('student: ', student)

    return (
        <FormProvider {...methods}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <FormHeader />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <StudentRegistrations loading={loading} eventEnrollments={eventEnrollments} competitionEnrollments={competitionEnrollments} isSuspended={isSuspended} />
                        </Grid>
                        <Grid item xs={12}>
                            <AdminStudentInformation />
                        </Grid>
                        <Grid item xs={12}>
                            <RelatedSchoolSection />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default AdminStudentForm
