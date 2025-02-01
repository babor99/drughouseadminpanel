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
import CompetitionInformation from './FormInformation'
import AllowedStatesRegionsSchools from './AllowedStatesRegionsSchools'
import CustomFields from './CustomFields'

import { isNumber } from '@/commons/utils';
import { getLocalizedUrl } from '@/utils/i18n';
import { GET_COMPETITION_BY_ID } from '@/constants/constants';

const CompetitionForm = () => {
    const { competitionId, lang: locale } = useParams()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const router = useRouter()
    const [competition, setCompetition] = useState({})
    const [competitionPhoto, setCompetitionPhoto] = useState(null)
    const [competitionFile, setCompetitionFile] = useState(null)
    const [fields, setFields] = useState([])

    const yupObject = {
        name: yup.string().required('Competition name is required').min(3, 'Must be at least 3 characters'),
        start_date: yup.string().required('Start sate is required'),
        end_date: yup.string().required('End date is required'),
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
        if (Object.keys(competition).length) {
            reset({ ...competition })
        }
    }, [competition])

    useEffect(() => {
        if (competitionId !== 'new' && !isNumber(competitionId)) {
            router.replace(getLocalizedUrl('/apps/admin/competitions', locale))
        }

        if (isNumber(competitionId)) {
            getACompetition()
        }

    }, [competitionId])

    function getACompetition() {
        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_COMPETITION_BY_ID}${competitionId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Competition get failed with status code ${res.status}`)
                })
                .then(data => {
                    setCompetition(data?.competition || {})
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
                    <FormHeader fields={fields} competitionPhoto={competitionPhoto} competitionFile={competitionFile} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CompetitionInformation setCompetitionPhoto={setCompetitionPhoto} setCompetitionFile={setCompetitionFile} />
                            <AllowedStatesRegionsSchools />
                            <CustomFields fields={fields} setFields={setFields} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default CompetitionForm
