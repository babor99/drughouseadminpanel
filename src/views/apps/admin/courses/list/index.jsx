'use client'

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CourseListTable from './CourseListTable'

import { GET_COURSES, PUBLISH_OR_UNPUBLISH_COURSE_BY_ADMIN_BY_ID, MAKE_COURSE_MICROCREDENTIAL_BY_ADMIN_BY_ID } from '@/constants/constants'
import { objectToQueryString } from '@/commons/utils'

const CourseList = () => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [courseData, setCourseData] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    const [params, setParams] = useState({
        page: 1,
        size: 100,
        keyword: '',
        category: '',
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
            setSelected(courseData.map(n => n.id));

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
        getAllCourse(params)
    }, [params.page, params.size])

    function getAllCourse(seachParams) {
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
            fetch(`${GET_COURSES}?${objectToQueryString(seachParams)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`InstructorCourse get failed with status code ${res.status}`)
                })
                .then(data => {

                    setCourseData(data?.courses)
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

    const publishCourse = (courseId) => {
        const authHeaders = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${PUBLISH_OR_UNPUBLISH_COURSE_BY_ADMIN_BY_ID}${courseId}?${objectToQueryString(params)}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Course publish failed with status code ${res.status}`)
                })
                .then(data => {

                    setCourseData(data?.courses)
                    setTotalPages(data?.total_pages)
                    toast.success("Request success!")
                })
                .catch(error => {
                    toast.error("Request failed!")

                })
        } catch (err) {
            toast.error("Request failed!")

        }
    }

    const makeCourseMicroCredential = (formdata, courseId, callback) => {
        try {
            fetch(`${MAKE_COURSE_MICROCREDENTIAL_BY_ADMIN_BY_ID}${courseId}?${objectToQueryString(params)}`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(formdata)
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Course make-microcredential failed with status code ${res.status}`)
                })
                .then(data => {

                    setCourseData(data?.courses)
                    setTotalPages(data?.total_pages)
                    callback({ success: true })
                    toast.success("Request success!")

                })
                .catch(error => {
                    toast.error("Request failed!")

                })
        } catch (err) {
            toast.error("Request failed!")

        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CourseListTable
                    courseData={courseData}
                    loading={loading}
                    totalPages={totalPages}
                    params={params}
                    setParams={setParams}
                    getAllCourse={getAllCourse}
                    publishCourse={publishCourse}
                    makeCourseMicroCredential={makeCourseMicroCredential}
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

export default CourseList
