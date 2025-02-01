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
import EventInformation from './FormInformation'
import AllowedStatesRegionsSchools from './AllowedStatesRegionsSchools'
import CustomFields from './CustomFields'

import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { GET_EVENT_BY_ID } from '@/constants/constants';

const EventForm = () => {
    const { eventId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const router = useRouter()
    const [event, setEvent] = useState({})
    const [eventPhoto, setEventPhoto] = useState(null)
    const [eventFile, setEventFile] = useState(null)
    const [fields, setFields] = useState([])

    const yupObject = {
        name: yup.string().required('Event name is required').min(3, 'Must be at least 3 characters'),
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
        state: yup.number().required('State is required'),
        address: yup.string().required('Address is required'),
        description: yup.string().required('Description is required'),
    }

    const schema = yup.object().shape(yupObject);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch } = methods;

    useEffect(() => {
        if (Object.keys(event).length) {
            reset({ ...event })
        }
    }, [event])

    useEffect(() => {
        if (eventId !== 'new' && !isNumber(eventId)) {
            router.replace(getLocalizedUrl('/apps/rpm/events', locale))
        }

        if (isNumber(eventId)) {
            getAEvent()
        }

    }, [eventId])

    function getAEvent() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_EVENT_BY_ID}${eventId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Event get failed with status code ${res.status}`)
                })
                .then(data => {
                    setEvent(data?.event || {})
                    setFields(data?.fields || [])
                })
                .catch(error => {

                })
        } catch (err) { }
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <FormHeader fields={fields} eventPhoto={eventPhoto} eventFile={eventFile} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <EventInformation setEventPhoto={setEventPhoto} setEventFile={setEventFile} />
                            <AllowedStatesRegionsSchools />
                            <CustomFields fields={fields} setFields={setFields} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default EventForm
