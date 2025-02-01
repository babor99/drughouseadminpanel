'use client'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import EventList from './EventList'
import RegisterEventDialog from '../dialogs/RegisterEventDialog'
import RegisterEventSuccessDialog from '../dialogs/RegisterEventSuccessDialog'

import { GET_STUDENT_EVENTS, CREATE_EVENT_ENROLLMENT } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'
import { getEventEnrollmentsByStudent } from '@/redux-store/slices/student'

const Events = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const dispatch = useDispatch()

    const [eventData, setEventData] = useState([])
    const [fields, setFields] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentEventId, setCurrentEventId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dialogLoading, setDialogLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [params, setParams] = useState({
        page: 1,
        size: 100,
        keyword: '',
    })

    useEffect(() => {
        getAllEvent(params)
    }, [params.page, params.size])

    function getAllEvent(seachParams) {
        setLoading(true)

        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_STUDENT_EVENTS}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Event get failed with status code ${res.status}`)
                })
                .then(data => {
                    console.log('events-data: ', data)
                    setEventData(data?.events)
                    setTotalPages(data?.total_pages)
                    setLoading(false)
                })
                .catch(error => {

                    setLoading(false)
                })
        } catch (err) {

            setLoading(false)
        }
    }

    function createEventEnrollment(eventId, customFields) {
        setLoading(true)
        const formData = new FormData()
        let errorCounter = 0
        let maxIter = 0

        formData.append('field-0-event', eventId)

        if (customFields && customFields?.length) {
            for (let i = 0; i < customFields.length; i++) {
                maxIter += 1

                if (customFields[i]?.is_required) {
                    if (['MCQ', 'TF', 'FITB'].includes(customFields[i]?.field_type) && !customFields[i]?.selected_answer) {
                        errorCounter += 1
                    } else if (customFields[i]?.field_type === 'TEXT' && !customFields[i]?.text) {
                        errorCounter += 1
                    } else if (customFields[i]?.field_type === 'FILE' && !customFields[i]?.file) {
                        errorCounter += 1
                    }
                }

                for (let key in customFields[i]) {
                    formData.append(`field-${i + 1}-${key}`, customFields[i][key])
                }
            }

            formData.append('field-0-max_iteration', maxIter)

            if (errorCounter > 0) {
                toast.warn('Please fill-up all fields and then try again.')
            } else {
                try {
                    fetch(CREATE_EVENT_ENROLLMENT, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'X-CSRFToken': csrfToken
                        },
                        body: formData,
                    })
                        .then(res => {
                            if (res.ok && [200, 201].includes(res.status)) {
                                return res.json()
                            }

                            throw new Error(`EventEnrollment failed with status code ${res.status}`)
                        })
                        .then(data => {
                            setLoading(false)
                            setShowModal(false)
                            setShowSuccessModal(true)
                            dispatch(getEventEnrollmentsByStudent(accessToken, csrfToken))
                        })
                        .catch(error => {
                            console.log('error: ', error)
                            setLoading(false)
                            toast.error("Failed! Event joining failed!")
                        })
                } catch (err) {
                    console.log('err: ', err)
                    setLoading(false)
                    toast.error("Failed! Event joining failed!")
                }
            }
        } else {
            try {
                fetch(CREATE_EVENT_ENROLLMENT, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'X-CSRFToken': csrfToken
                    },
                    body: formData,
                })
                    .then(res => {
                        if (res.ok && [200, 201].includes(res.status)) {
                            return res.json()
                        }

                        throw new Error(`EventEnrollment failed with status code ${res.status}`)
                    })
                    .then(data => {
                        setLoading(false)
                        setShowModal(false)
                        setShowSuccessModal(true)
                        dispatch(getEventEnrollmentsByStudent(accessToken, csrfToken))
                    })
                    .catch(error => {
                        console.log('error: ', error)
                        setLoading(false)
                        toast.error("Failed! Event joining failed!")
                    })
            } catch (err) {
                console.log('err: ', err)
                setLoading(false)
                toast.error("Failed! Event joining failed!")
            }
        }

        setLoading(false)
    }

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <EventList
                        eventData={eventData}
                        params={params}
                        setParams={setParams}
                        totalPages={totalPages}
                        getAllEvent={getAllEvent}
                        createEventEnrollment={createEventEnrollment}
                        setFields={setFields}
                        setCurrentEventId={setCurrentEventId}
                        loading={loading}
                        setLoading={setLoading}
                        dialogLoading={dialogLoading}
                        setDialogLoading={setDialogLoading}
                        setShowModal={setShowModal}
                    />
                    <div>
                        <RegisterEventDialog
                            loading={loading}
                            open={showModal}
                            setOpen={setShowModal}
                            fields={fields}
                            setFields={setFields}
                            currentEventId={currentEventId}
                            createEventEnrollment={createEventEnrollment}
                        />
                        <RegisterEventSuccessDialog
                            open={showSuccessModal}
                            setOpen={setShowSuccessModal} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Events
