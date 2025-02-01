'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TeacherSchoolListTable from './TeacherSchoolListTable'

import { GET_TEACHER_SCHOOLS_WP, DELETE_SCHOOL } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const TeacherSchoolList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [schoolData, setSchoolData] = useState([])
    const [assignedSections, setAssignedSections] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    const [params, setParams] = useState({
        page: 1,
        size: 100,
        keyword: '',
        state: '',
        region: '',
    })

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    function handleRequestSort(event, property) {
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

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(schoolData.map(n => n.id));

            return;
        }

        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleCheck(event, id) {
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
        getAllTeacherSchool(params)
    }, [params.page, params.size])

    function getAllTeacherSchool(seachParams) {
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
            fetch(`${GET_TEACHER_SCHOOLS_WP}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`TeacherSchool get failed with status code ${res.status}`)
                })
                .then(data => {

                    setSchoolData(data?.schools)
                    setAssignedSections(data?.assigned_sections)
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



    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TeacherSchoolListTable
                    schoolData={schoolData}
                    assignedSections={assignedSections}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllTeacherSchool={getAllTeacherSchool}
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

export default TeacherSchoolList
