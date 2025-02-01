'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CourseCategoryListTable from './CourseCategoryListTable'

import { GET_COURSE_CATEGORYS, DELETE_COURSE_CATEGORY } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const CourseCategoryList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [coursecategoryData, setCourseCategoryData] = useState([])
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

    function handleRequestSort(patientEvent, property) {
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
            setSelected(coursecategoryData.map(n => n.id));

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
        getAllCourseCategory(params)
    }, [params.page, params.size])

    function getAllCourseCategory(seachParams) {
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
            fetch(`${GET_COURSE_CATEGORYS}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`CourseCategory get failed with status code ${res.status}`)
                })
                .then(data => {
                    setCourseCategoryData(data?.categories)
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

    const deleteCourseCategory = (coursecategoryId) => {
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
            fetch(`${DELETE_COURSE_CATEGORY}${coursecategoryId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`CourseCategory delete failed with status code ${res.status}`)
                })
                .then(data => {
                    getAllCourseCategory({ ...params })
                    toast.success("Success! CourseCategory deleted successfully!")
                })
                .catch(error => {
                    toast.error("Failed! CourseCategory delete failed!")
                })
        } catch (err) {
            toast.error("Failed! CourseCategory delete failed!")
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CourseCategoryListTable
                    coursecategoryData={coursecategoryData}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllCourseCategory={getAllCourseCategory}
                    deleteCourseCategory={deleteCourseCategory}
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

export default CourseCategoryList
