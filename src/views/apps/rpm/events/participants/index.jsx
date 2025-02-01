'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import Grid from '@mui/material/Grid'

// Component Imports
import ParticipantListTable from './ParticipantListTable'

import { objectToQueryString } from '@/commons/utils'
import {
    GET_ALL_EVENT_PARTICIPANT_BY_EVENT_ID,
    DOWNLOAD_EVENT_PARTICIPANT_BY_EVENT_ID
} from '@/constants/constants'

const ParticipantList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const { eventId } = useParams()

    const [participantData, setParticipantData] = useState([])
    const [currentEvent, setCurrentEvent] = useState({})
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [downloadCsvloading, setDownloadCsvloading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    const [params, setParams] = useState({
        page: 1,
        size: 100,
        keyword: '',
    })

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    function handleRequestSort(articipant, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(participant) {
        if (participant.target.checked) {
            setSelected(participantData.map(n => n.id));

            return;
        }

        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleCheck(participant, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }

    useEffect(() => {
        getAllParticipant()
    }, [params.page, params.size])

    function getAllParticipant() {
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
            fetch(`${GET_ALL_EVENT_PARTICIPANT_BY_EVENT_ID}${eventId}?${objectToQueryString(params)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Participant get failed with status code ${res.status}`)
                })
                .then(data => {

                    setParticipantData(data?.participants)
                    setTotalPages(data?.total_pages)
                    setCurrentEvent(data?.event)
                    setLoading(false)
                })
                .catch(error => {

                    setLoading(false)
                })
        } catch (err) {

            setLoading(false)
        }
    }

    const downloadAllParticipant = async () => {
        setDownloadCsvloading(true)

        try {
            const response = await fetch(`${DOWNLOAD_EVENT_PARTICIPANT_BY_EVENT_ID}${eventId}`, {
                responseType: 'blob', // Important for handling binary data
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`)
            }

            const contentDisposition = response.headers.get('Content-Disposition')
            const fileName = contentDisposition ? contentDisposition.split('filename=')?.[1]?.replace(/"/g, '') : 'registrations.csv';

            // Create a link element to trigger download
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url;
            link.setAttribute('download', fileName);

            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)

            toast.success('File download success!')
            setDownloadCsvloading(false)
        } catch (error) {
            toast.error('Oops! File download failed!')
            setDownloadCsvloading(false)
            console.error('Error downloading the CSV:', error);
        }

        setDownloadCsvloading(false)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ParticipantListTable
                    participantData={participantData}
                    currentEvent={currentEvent}
                    loading={loading}
                    downloadCsvloading={downloadCsvloading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllParticipant={getAllParticipant}
                    downloadAllParticipant={downloadAllParticipant}
                    selected={selected}
                    order={order}
                    handleRequestSort={handleRequestSort}
                    handleSelectAllClick={handleSelectAllClick}
                    handleDeselect={handleDeselect}
                    handleCheck={handleCheck}
                />
            </Grid>
        </Grid>
    )
}

export default ParticipantList
