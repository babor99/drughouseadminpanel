'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Divider, Typography } from '@mui/material'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

import { CREATE_INSTRUCTOR_LECTURE_RESOURCE, UPDATE_INSTRUCTOR_LECTURE_RESOURCE, DELETE_INSTRUCTOR_LECTURE_RESOURCE } from '@/constants/constants'

const AddResource = ({ open, setOpen, lectureId, resources }) => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [currentResources, setCurrentResources] = useState([])
    const [name, setName] = useState('')
    const [file, setFile] = useState('')

    const [loading, setLoading] = useState(false)
    const [showCreatePage, setShowCreatePage] = useState(true)
    const [showEditPage, setShowEditPage] = useState(false)
    const [showDeletePage, setShowDeletePage] = useState(false)

    const [currentResourceId, setCurrentResourceId] = useState('')
    const [currentResourceName, setCurrentResourceName] = useState('')

    useEffect(() => {
        resources && setCurrentResources([...resources])
    }, [resources])

    const handleClose = () => {
        setOpen(false)
    }

    function createResource() {
        setLoading(true)
        const formdata = new FormData()

        formdata.append('lecture', lectureId)
        formdata.append('name', name)
        formdata.append('file', file)

        try {
            fetch(CREATE_INSTRUCTOR_LECTURE_RESOURCE, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                },
                body: formdata
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Resource create failed with status code ${res.status}`)
                })
                .then(data => {

                    setCurrentResources(data || [])
                    setLoading(false)
                    setName('')
                    setFile('')
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    function updateResource() {
        setLoading(true)
        const formdata = new FormData()

        formdata.append('name', name)
        formdata.append('file', file)

        try {
            fetch(`${UPDATE_INSTRUCTOR_LECTURE_RESOURCE}${currentResourceId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                },
                body: formdata
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Resource create failed with status code ${res.status}`)
                })
                .then(data => {

                    setCurrentResources(data || [])
                    setLoading(false)
                    setName('')
                    setFile('')
                    setShowEditPage(false)
                    setShowDeletePage(false)
                    setShowCreatePage(true)
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    function deleteResource() {
        setLoading(true)

        try {
            fetch(`${DELETE_INSTRUCTOR_LECTURE_RESOURCE}${currentResourceId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                },
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Resource delete failed with status code ${res.status}`)
                })
                .then(data => {

                    setCurrentResources(data || [])
                    setLoading(false)
                    setShowEditPage(false)
                    setShowDeletePage(false)
                    setShowCreatePage(true)
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='sm'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='text-center'>
                {showCreatePage && 'Add New Resource'}
                {showEditPage && 'Edit Resource'}
                {showDeletePage && 'Delete Resource'}
            </DialogTitle>
            <Divider className="my-2 lg:my-4" />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>

                {/* create-resource page */}
                <div className={`${!showCreatePage && 'hidden'}`}>
                    <div className="my-4 lg:my-8">
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Title'
                                    placeholder='Lesson 1 related pdf'
                                    value={name}
                                    onChange={e => { setName(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Resource file'
                                    type='file'
                                    onChange={e => { setFile(e.target.files[0]) }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant='contained'
                            className="mt-3 lg:mt-6"
                            disabled={name.length < 3 || !file || loading}
                            onClick={createResource}
                        >
                            Add
                        </Button>
                    </div>
                    <Divider className="my-2 lg:my-" />
                    <div>
                        <Typography variant='h6' className="font-bold">Resource Files</Typography>
                        <div>
                            {
                                currentResources &&
                                currentResources.map((resource, index) => (
                                    <div key={index} className="flex items-center justify-between my-2 lg:my-3">
                                        <Typography className="break-words">{resource.name}</Typography>
                                        <div>
                                            {
                                                resource.file &&
                                                <IconButton>
                                                    <i className="tabler-download text-secondary" title="Download" />
                                                </IconButton>
                                            }
                                            <IconButton>
                                                <i
                                                    className="tabler-edit text-secondary"
                                                    title="Edit"
                                                    onClick={() => {
                                                        setCurrentResourceId(resource.id)
                                                        setName(resource.name)
                                                        setShowCreatePage(false)
                                                        setShowDeletePage(false)
                                                        setShowEditPage(true)
                                                    }}
                                                />
                                            </IconButton>
                                            <IconButton>
                                                <i
                                                    className="tabler-trash text-secondary"
                                                    title="Delete"
                                                    onClick={() => {
                                                        setCurrentResourceId(resource.id)
                                                        setName(resource.name)
                                                        setShowCreatePage(false)
                                                        setShowEditPage(false)
                                                        setShowDeletePage(true)
                                                    }}
                                                />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* edit-resource page */}
                <div className={`${!showEditPage && 'hidden'}`}>
                    <div className="my-4 lg:my-8">
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Title'
                                    placeholder='Lesson 1 related pdf'
                                    value={name}
                                    onChange={e => { setName(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Resource file'
                                    type='file'
                                    onChange={e => { setFile(e.target.files[0]) }}
                                />
                            </Grid>
                        </Grid>
                        <div className="flex items-center justify-between mt-3 lg:mt-6">
                            <Button
                                variant='contained'
                                className=""
                                disabled={name.length < 3 || loading}
                                onClick={updateResource}
                            >
                                Update
                            </Button>
                            <Button
                                variant='contained'
                                className="bg-secondary"
                                onClick={() => {
                                    setShowEditPage(false)
                                    setShowDeletePage(false)
                                    setShowCreatePage(true)
                                }}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>

                {/* delete-resource page */}
                <div className={`${!showDeletePage && 'hidden'}`}>
                    <div className="my-5 lg:my-10">
                        <Typography variant='h5' className="mb-6 text-center">Are you sure to delete this resource?</Typography>
                        <Typography className="mb-6 text-center">{currentResourceName && currentResourceName}</Typography>
                    </div>
                    <div className="flex items-center justify-between mt-3 lg:mt-6">
                        <Button
                            variant='contained'
                            className=""
                            onClick={deleteResource}
                        >
                            Delete
                        </Button>
                        <Button
                            variant='contained'
                            className="bg-secondary"
                            onClick={() => {
                                setShowEditPage(false)
                                setShowDeletePage(false)
                                setShowCreatePage(true)
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <Divider className="my-2 lg:my-4" />
            <DialogActions className='flex justify-center'>
                <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddResource
