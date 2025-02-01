'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TeacherStudentListTable from './TeacherStudentListTable'

import { GET_TEACHER_STUDENTS, DELETE_TEACHER_STUDENT } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const TeacherStudentList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [studentData, setStudentData] = useState([])
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
            setSelected(studentData.map(n => n.id));

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
        getAllTeacherStudent(params)
    }, [params.page, params.size])

    function getAllTeacherStudent(seachParams) {
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
            fetch(`${GET_TEACHER_STUDENTS}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`TeacherStudent get failed with status code ${res.status}`)
                })
                .then(data => {

                    setStudentData(data?.students)
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

    const deleteTeacherStudent = (studentId) => {
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
            fetch(`${DELETE_TEACHER_STUDENT}${studentId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`TeacherStudent delete failed with status code ${res.status}`)
                })
                .then(data => {

                    getAllTeacherStudent({ ...params })
                    toast.success("Success! Student deleted successfully!")
                })
                .catch(error => {
                    toast.error("Failed! Student delete failed!")

                })
        } catch (err) {
            toast.error("Failed! Student delete failed!")

        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TeacherStudentListTable
                    studentData={studentData}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllTeacherStudent={getAllTeacherStudent}
                    deleteTeacherStudent={deleteTeacherStudent}
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

export default TeacherStudentList
