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

import { GET_ENROLLMENT_LECTURES_BY_STUDENT_COURSE_ID, UPDATE_OR_CREATE_STUDENT_LECTURE_PROGRESS, INCREASE_LECTURES_COUNT_ON_ENROLLMENT } from '@/constants/constants'

import {
    getStudentEnrollmentsWP,
    getSubmittedAssignments,
    getStudentQuizSubmissionsCountByStudent,
    getStudentLectureProgressesWP
} from '@/redux-store/slices/student'

const MyCourseDetails = () => {
    const router = useRouter()
    const { courseId, lang: locale } = useParams()
    const dispatch = useDispatch()

    const searchParams = useSearchParams()
    const action = searchParams.get('action')

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [enrollmentloading, setEnrollmentLoading] = useState(false)
    const [awsUrlLoading, setAwsUrlLoading] = useState(false)
    const [enrollment, setEnrollment] = useState({})
    const [assignments, setAssignments] = useState([])
    const [sections, setSections] = useState([])
    const [totalLecturesCount, setTotalLecturesCount] = useState('')

    const [currentLecture, setCurrentLecture] = useState({})
    const [lectureItemClicked, setLectureItemClicked] = useState(false)
    const [accordionExpanded, setAccordionExpanded] = useState(0)

    const authHeaders = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken
        }
    }

    useEffect(() => {
        dispatch(getSubmittedAssignments(accessToken, csrfToken))
        dispatch(getStudentQuizSubmissionsCountByStudent(accessToken, csrfToken))
    }, [])

    useEffect(() => {
        getEnrollmentLecturesByStudenCourseId()
    }, [courseId])

    useEffect(() => {
        let log = localStorage.getItem('liacourselog')

        if (action === 'continue' && log) {
            try {
                let parsedLog = JSON.parse(log)
                const lectureId = parsedLog?.[courseId]
                let lecture = {}

                for (let i = 0; i < sections.length; i++) {
                    for (let j = 0; j < sections[i].section_lectures?.length; j++) {
                        if (sections[i]?.section_lectures?.[j]?.id == lectureId) {
                            lecture = sections[i]?.section_lectures?.[j]
                            setAccordionExpanded(sections[i]?.id)
                            break
                        }
                    }
                }

                setCurrentLecture(lecture || {})
            } catch (err) {
                setCurrentLecture({ ...sections?.[0]?.section_lectures?.[0] } || {})
                setAccordionExpanded(sections[0]?.id)
            }
        } else {
            setCurrentLecture({ ...sections?.[0]?.section_lectures?.[0] } || {})
            setAccordionExpanded(sections[0]?.id)
        }

        let lectureCounter = 0

        for (let section of sections) {
            const length = section?.section_lectures?.length

            if (length) {
                lectureCounter += length
            }
        }

        lectureCounter && setTotalLecturesCount(lectureCounter)
    }, [sections])

    const getEnrollmentLecturesByStudenCourseId = () => {
        setEnrollmentLoading(true)

        try {
            fetch(`${GET_ENROLLMENT_LECTURES_BY_STUDENT_COURSE_ID}${courseId}`, authHeaders)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json()
                    }

                    router.push(getLocalizedUrl('/apps/student/my-courses', locale))
                })
                .then(data => {
                    setEnrollment(data?.enrollment || {})
                    setAssignments(data?.assignments || [])
                    setSections(data?.sections || [])

                })
                .catch(error => {

                    router.push(getLocalizedUrl('/apps/student/my-courses', locale))
                })
        } catch (err) {

            router.push(getLocalizedUrl('/apps/student/my-courses', locale))
        }

        setTimeout(() => {
            setEnrollmentLoading(false)
        }, 1000);
    }

    // this function will be called form Sidebar component
    const createOrUpdateStudenLectureProgress = (lectureId, lectureName, isCompleted) => {
        setAwsUrlLoading(true)

        try {
            fetch(UPDATE_OR_CREATE_STUDENT_LECTURE_PROGRESS, {
                method: 'POST',
                credentials: 'include',
                headers: authHeaders?.headers,
                body: JSON.stringify({ lecture: lectureId, name: lectureName, is_completed: isCompleted })
            })
                .then(response => {
                    if (response.ok && (response.status === 200 || response.status === 201)) {
                        return response.json()
                    }

                    throw new Error("Student progress update or create failed")
                })
                .then(data => {
                    increaseCompletedLecturesCountOnEnrollment(courseId)
                    setTimeout(() => {
                        dispatch(getStudentLectureProgressesWP(accessToken, csrfToken))
                        dispatch(getStudentEnrollmentsWP(accessToken, csrfToken))
                    }, 2500);

                })
                .catch(error => { })
        } catch (err) { }

        setTimeout(() => {
            setAwsUrlLoading(false)
        }, 4000)
    }

    // this function is called inside createOrUpdateStudenLectureProgress function
    const increaseCompletedLecturesCountOnEnrollment = (courseId) => {
        setAwsUrlLoading(true)

        try {
            fetch(`${INCREASE_LECTURES_COUNT_ON_ENROLLMENT}${courseId}`, {
                method: 'GET',
                credentials: 'include',
                headers: authHeaders?.headers,
            })
                .then(response => {
                    if (response.ok && (response.status === 200 || response.status === 201)) {
                        return response.json()
                    }

                    throw new Error("Lectures count increase on enrollment failed")
                })
                .then(data => {

                })
                .catch(error => {

                })
        } catch (err) {

        }
    }

    return (
        <div>
            {
                enrollmentloading ? ""
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Header enrollment={enrollment} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Details
                                enrollment={enrollment}
                                assignments={assignments}
                                currentLecture={currentLecture}
                                setCurrentLecture={setCurrentLecture}
                                totalLecturesCount={totalLecturesCount}
                                setAwsUrlLoading={setAwsUrlLoading}
                                lectureItemClicked={lectureItemClicked}
                                createOrUpdateStudenLectureProgress={createOrUpdateStudenLectureProgress}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className='sticky top-[94px]'>
                                <Sidebar
                                    enrollment={enrollment}
                                    sections={sections}
                                    currentLecture={currentLecture}
                                    setCurrentLecture={setCurrentLecture}
                                    awsUrlLoading={awsUrlLoading}
                                    setAwsUrlLoading={setAwsUrlLoading}
                                    lectureItemClicked={lectureItemClicked}
                                    setLectureItemClicked={setLectureItemClicked}
                                    createOrUpdateStudenLectureProgress={createOrUpdateStudenLectureProgress}
                                    accordionExpanded={accordionExpanded}
                                    setAccordionExpanded={setAccordionExpanded}
                                />
                            </div>
                        </Grid>
                    </Grid>
            }
        </div>
    )
}

export default MyCourseDetails
