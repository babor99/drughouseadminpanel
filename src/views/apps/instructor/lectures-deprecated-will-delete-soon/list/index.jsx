'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import InstructorLectureListTable from './InstructorLectureListTable'

import { GET_INSTRUCTOR_LECTURES, DELETE_INSTRUCTOR_LECTURE } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const InstructorLectureList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [lectureData, setLectureData] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    const [params, setParams] = useState({
        page: 1,
        size: 100,
        keyword: '',
        course: '',
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
            setSelected(lectureData.map(n => n.id));

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
        getAllInstructorLecture(params)
    }, [params.page, params.size])

    function getAllInstructorLecture(seachParams) {
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
            fetch(`${GET_INSTRUCTOR_LECTURES}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`InstructorLecture get failed with status code ${res.status}`)
                })
                .then(data => {

                    setLectureData(data?.lectures)
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

    const deleteInstructorLecture = (lectureId) => {
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
            fetch(`${DELETE_INSTRUCTOR_LECTURE}${lectureId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`InstructorLecture delete failed with status code ${res.status}`)
                })
                .then(data => {

                    getAllInstructorLecture({ ...params })
                })
                .catch(error => {

                })
        } catch (err) {

        }
    }



    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <InstructorLectureListTable
                    lectureData={lectureData}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllInstructorLecture={getAllInstructorLecture}
                    deleteInstructorLecture={deleteInstructorLecture}
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

export default InstructorLectureList
