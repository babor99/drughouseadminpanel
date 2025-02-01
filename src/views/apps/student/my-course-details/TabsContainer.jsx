'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import LectureSummaryTab from './tabs/LectureSummaryTab';
import CourseSummaryTab from './tabs/CourseSummaryTab';
import AssignmentTab from './tabs/AssignmentTab';
import CertificateTab from './tabs/CertificateTab';

import { CREATE_OR_UPDATE_ASSIGNMENT_SUBMISSION } from '@/constants/constants'

import { getSubmittedAssignments } from '@/redux-store/slices/student'

const TabsContainer = ({ enrollment, assignments, currentLecture, totalLecturesCount }) => {
    const { courseId } = useParams()
    const dispatch = useDispatch()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [loading, setLoading] = useState(false)
    const [tabValue, setTabValue] = useState(0);

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    function submitAssignment(formdata, callback) {
        setLoading(true)

        try {
            fetch(CREATE_OR_UPDATE_ASSIGNMENT_SUBMISSION, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                },
                body: formdata,
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`AssignmentSubmission create failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    callback({ success: true })
                    dispatch(getSubmittedAssignments(accessToken, csrfToken))
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    return (
        <div className={`mb-10 px-3`}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="secondary"

                // variant="scrollable"
                // scrollButtons="auto"
                classes={{ root: 'h-16 border-b-2' }}
            >
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Summary" />
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Course Details" />
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Assignment" />
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Certificate" />
            </Tabs>

            <div className="flex items-center justify-center">
                <div className="py-5 w-full">
                    <div className={tabValue !== 0 ? 'hidden' : ''}>
                        <LectureSummaryTab
                            enrollment={enrollment}
                            currentLecture={currentLecture}
                            totalLecturesCount={totalLecturesCount}
                        />
                    </div>
                    <div className={tabValue !== 1 ? 'hidden' : ''}>
                        <CourseSummaryTab
                            enrollment={enrollment}
                            currentLecture={currentLecture}
                            totalLecturesCount={totalLecturesCount}
                        />
                    </div>
                    <div className={tabValue !== 2 ? 'hidden' : ''}>
                        <AssignmentTab
                            assignments={assignments}
                            submitAssignment={submitAssignment}
                        />
                    </div>
                    <div className={tabValue !== 3 ? 'hidden' : ''}>
                        <CertificateTab
                            enrollment={enrollment}
                            totalLecturesCount={totalLecturesCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabsContainer
