'use client'

import { useState, useRef } from 'react'

import dynamic from 'next/dynamic';

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

const AddLesson = ({ open, setOpen, createNewLecture, courseId }) => {
    const lectureSectionOptions = useSelector(state => state.instructor.instructorLectureSectionsByCourseId)

    const [lessonType, setLessonType] = useState('YOUTUBE')
    const [showLessonTypes, setShowLessonTypes] = useState(true)
    const [showForm, setShowForm] = useState(false)

    const [textDescription, setTextDescription] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        section: '',
        url: '',
        duration: '',
    })

    const editorRef = useRef(null);

    const handleClose = () => {
        setOpen(false)
    }

    // handle input field change
    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            return { ...prevData, [field]: value }
        })
    }

    const createLectureCallback = ({ success }) => {
        if (success) {

            setTextDescription('')
            setSummary('')
            setFile('')
            setFormData({
                name: '',
                section: '',
                url: '',
                duration: '',
            })
            setOpen(false)
        }
    }

    const callCreateLectureFunc = () => {
        const formdata = new FormData()

        formdata.append('course', courseId)
        formdata.append('lecture_type', lessonType)
        formdata.append('text_description', textDescription)
        formdata.append('summary', summary)
        file && formdata.append('file', file)

        for (let key of Object.keys(formData)) {

            formdata.append(key, formData[key])
        }

        createNewLecture(formdata, createLectureCallback)
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='md'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='flex gap-2 flex-col text-center'>
                Add New Lesson
            </DialogTitle>
            <Divider className="mb-3" />
            <div className="">

                {/* radio-group section */}
                <div className={`${!showLessonTypes && 'hidden'}`}>
                    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <div>
                                    <Typography variant='h6' className="font-bold mb-5">Select lesson type</Typography>
                                </div>
                                <div>
                                    <FormControl>
                                        {/* <FormLabel id="demo-radio-buttons-group-label" className="mb-3 font-bold">Gender</FormLabel> */}
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="YOUTUBE"
                                            name="radio-buttons-group"
                                            onChange={(e, value) => setLessonType(value)}
                                        >
                                            <FormControlLabel value="YOUTUBE" control={<Radio />} label="Youtube" />
                                            <FormControlLabel value="VIDEO_FILE" control={<Radio />} label="Video file" />
                                            <FormControlLabel value="TEXT" control={<Radio />} label="Text" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="mt-10">
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setShowLessonTypes(false)
                                    setShowForm(true)
                                }}>
                                Next
                            </Button>
                        </div>
                    </DialogContent>
                    <Divider />
                </div>

                {/* form */}
                <div className={`${!showForm && 'hidden'}`}>
                    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                        <div className="h-12 flex justify-start items-center gap-3 mb-5 p-2 border">
                            <Typography>
                                Lesson type: <span className="text-warning">{lessonType === 'YOUTUBE' ? 'Youtube Video' : lessonType === 'VIDEO_FILE' ? 'Video file' : lessonType === 'TEXT' ? 'Text' : ''}</span>
                            </Typography>
                            <Button
                                className="font-bold"
                                onClick={() => {
                                    setShowLessonTypes(true)
                                    setShowForm(false)
                                }}
                            >
                                Change
                            </Button>
                        </div>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Title*'
                                    placeholder='Deep overview on socialization'
                                    value={formData?.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Section*'
                                    value={formData?.section}
                                    onChange={(e) => handleInputChange('section', e.target.value)}
                                >
                                    {
                                        lectureSectionOptions?.map((section, index) => (
                                            <MenuItem key={index} value={section.id}>
                                                {section.name}
                                            </MenuItem>
                                        ))
                                    }
                                </CustomTextField>
                            </Grid>
                            {
                                lessonType === 'YOUTUBE' &&
                                <Grid item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        label='Video url'
                                        placeholder='https://www.youtube.com/watch?key=giisrels443sf'
                                        value={formData?.url}
                                        onChange={(e) => handleInputChange('url', e.target.value)}
                                    />
                                </Grid>
                            }
                            {
                                lessonType === 'VIDEO_FILE' &&
                                <Grid item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        label='Video file'
                                        placeholder='Upload video file'
                                        type='file'
                                        accept='video/*'
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Grid>
                            }
                            {
                                ['YOUTUBE', 'VIDEO_FILE'].includes(lessonType) &&
                                <Grid item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        label='Duration (minutes)'
                                        placeholder='12'
                                        type='number'
                                        value={formData?.duration}
                                        onChange={(e) => handleInputChange('duration', e.target.value)}
                                    />
                                </Grid>
                            }
                            {
                                lessonType === 'TEXT' &&
                                <Grid item xs={12}>
                                    <div className="">
                                        <Typography className="text-sm">Enter your text*</Typography>
                                        <CustomTinyMCEEditor
                                            id='tiny-text-description'
                                            value={textDescription}
                                            setValue={setTextDescription}
                                        />
                                    </div>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <div className="">
                                    <Typography className="text-sm">Summary*</Typography>
                                    <CustomTinyMCEEditor
                                        id='tiny-summary'
                                        value={summary}
                                        setValue={setSummary}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className='justify-center mt-5'>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={callCreateLectureFunc}
                            {
                            ...lessonType === 'TEXT' ?
                                { disabled: !formData.name || !formData.section || !textDescription || !summary }
                                :
                                { disabled: !formData.name || !formData.section || !summary }
                            }
                        >
                            Add lesson
                        </Button>
                    </DialogActions>
                </div>
            </div>
            <Divider className="" />
            <DialogActions className='justify-center'>
                <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default AddLesson
