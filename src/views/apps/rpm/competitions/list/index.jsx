'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CompetitionListTable from './CompetitionListTable'

import { GET_COMPETITIONS, DELETE_COMPETITION } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const CompetitionList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [competitionData, setCompetitionData] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
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

    function handleRequestSort(patientCompetition, property) {
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

    function handleSelectAllClick(competition) {
        if (competition.target.checked) {
            setSelected(competitionData.map(n => n.id));

            return;
        }

        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleCheck(competition, id) {
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
        getAllCompetition(params)
    }, [params.page, params.size])

    function getAllCompetition(seachParams) {
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
            fetch(`${GET_COMPETITIONS}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Competition get failed with status code ${res.status}`)
                })
                .then(data => {

                    setCompetitionData(data?.competitions)
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

    const deleteCompetition = (competitionId) => {
        const authHeaders = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${DELETE_COMPETITION}${competitionId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Competition delete failed with status code ${res.status}`)
                })
                .then(data => {

                    getAllCompetition({ ...params })
                    toast.success("Success! Competition deleted successfully!")
                })
                .catch(error => {
                    toast.error("Failed! Competition delete failed!")

                })
        } catch (err) {
            toast.error("Failed! Competition delete failed!")
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CompetitionListTable
                    competitionData={competitionData}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllCompetition={getAllCompetition}
                    deleteCompetition={deleteCompetition}
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

export default CompetitionList
