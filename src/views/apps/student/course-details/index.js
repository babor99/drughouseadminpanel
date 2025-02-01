'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

import { getLocalizedUrl } from '@/utils/i18n'

// Component Imports
import Header from './Header'
import Details from './Details'
import Sidebar from './Sidebar'

import { GET_COURSE_AND_SECTIONS_BY_COURSE_ID } from '@/constants/constants'

const CourseDetails = () => {
    const router = useRouter()
    const { courseId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [courseLoading, setCourseLoading] = useState(false)
    const [course, setCourse] = useState({})
    const [sections, setSections] = useState([])
    const [totalLecturesCount, setTotalLecturesCount] = useState('')
    const [totalStudentsCount, setTotalStudentsCount] = useState('')

    const authHeaders = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken
        }
    }

    useEffect(() => {
        getCourseAndSectionsByCourseId()
    }, [courseId])

    const getCourseAndSectionsByCourseId = () => {
        setCourseLoading(true)

        try {
            fetch(`${GET_COURSE_AND_SECTIONS_BY_COURSE_ID}${courseId}`, authHeaders)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json()
                    }

                    router.push(getLocalizedUrl('/apps/student/courses', locale))
                })
                .then(data => {
                    setCourse(data?.course || {})
                    setSections(data?.sections || [])
                    setTotalLecturesCount(data?.total_lectures || '')
                    setTotalStudentsCount(data?.total_enrolled_students || '')

                })
                .catch(error => {

                    router.push(getLocalizedUrl('/apps/student/courses', locale))
                })
        } catch (err) {

            router.push(getLocalizedUrl('/apps/student/courses', locale))
        }

        setTimeout(() => {
            setCourseLoading(false)
        }, 1000);
    }

    return (
        <div>
            {
                courseLoading ? ""
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Header course={course} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Details
                                course={course}
                                totalLecturesCount={totalLecturesCount}
                                totalStudentsCount={totalStudentsCount}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className='sticky top-[94px]'>
                                <Sidebar
                                    sections={sections}
                                />
                            </div>
                        </Grid>
                    </Grid>
            }
        </div>
    )
}

export default CourseDetails
