'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic';

import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

const AddLesson = ({ open, setOpen, lecture, lectureId, updateLecture }) => {
    const lectureSectionOptions = useSelector(state => state.instructor.instructorLectureSectionsByCourseId)

    const [textDescription, setTextDescription] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState('')

    const [instruction, setInstruction] = useState('')
    const [dripValue, setDripValue] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        section: '',
        url: '',
        duration: '',
        total_marks: '',
        pass_marks: '',
        start_next_lesson_submitting_quiz: true,
        pass_mark_mandatory_starting_next_lesson: false,
        retakes: ''
    })

    useEffect(() => {
        lecture && setFormData({ ...lecture })
        setTextDescription(lecture?.text_description)
        setSummary(lecture?.summary)
        setInstruction(lecture?.instruction)
    }, [lecture])

    const handleClose = () => {
        setOpen(false)
    }

    // handle input field change
    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            return { ...prevData, [field]: value }
        })
    }

    useEffect(() => {
        if (dripValue === 'START_NEXT_LESSON_BY_QUIZ_SUBMIT') {
            setFormData(prevState => {
                return {
                    ...prevState,
                    start_next_lesson_submitting_quiz: true,
                    pass_mark_mandatory_starting_next_lesson: false,
                }
            })
        }
        else if (dripValue === 'START_NEXT_LESSON_BY_PASSING_QUIZ') {
            setFormData(prevState => {
                return {
                    ...prevState,
                    start_next_lesson_submitting_quiz: false,
                    pass_mark_mandatory_starting_next_lesson: true,
                }
            })
        }
    }, [dripValue])

    const updateLectureCallback = ({ success }) => {
        if (success) {

            setTextDescription('')
            setSummary('')
            setFile('')
            setInstruction('')
            setFormData({
                name: '',
                section: '',
                url: '',
                duration: '',
                total_marks: '',
                pass_marks: '',
                start_next_lesson_submitting_quiz: true,
                pass_mark_mandatory_starting_next_lesson: false,
                retakes: ''
            })
            setOpen(false)
        }
    }

    const callUpdateLectureFunc = () => {
        const formdata = new FormData()





        formdata.append('text_description', textDescription)
        formdata.append('summary', JSON.stringify(summary))
        formdata.append('instruction', instruction)
        file && formdata.append('file', file)

        for (let key of Object.keys(formData)) {

            formdata.append(key, formData[key])
        }

        updateLecture(formdata, lectureId, updateLectureCallback)
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
                Update {lecture.is_quiz ? 'Quiz Information' : 'Lesson'}
            </DialogTitle>
            <Divider className="mb-3" />
            <div className="">
                {/* form */}
                <div className="">
                    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                        {
                            !lecture?.is_quiz ?

                                // lecture-form fields
                                <div>
                                    <div className="h-12 flex justify-start items-center gap-3 mb-5 p-2 border">
                                        <Typography>
                                            Lesson type: <span className="text-warning">{lecture?.lecture_type === 'YOUTUBE' ? 'Youtube Video' : lecture?.lecture_type === 'VIDEO_FILE' ? 'Video file' : lecture?.lecture_type === 'TEXT' ? 'Text' : ''}</span>
                                        </Typography>
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
                                            lecture?.lecture_type === 'YOUTUBE' &&
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
                                            lecture?.lecture_type === 'VIDEO_FILE' &&
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
                                            ['YOUTUBE', 'VIDEO_FILE'].includes(lecture?.lecture_type) &&
                                            <Grid item xs={12}>
                                                <CustomTextField
                                                    fullWidth
                                                    label='Duration (minutes)'
                                                    placeholder='12'
                                                    value={formData?.duration}
                                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                                />
                                            </Grid>
                                        }
                                        {
                                            lecture?.lecture_type === 'TEXT' &&
                                            <Grid item xs={12}>
                                                <div className="">
                                                    <Typography className="text-sm">Enter your text</Typography>
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
                                </div>
                                :

                                // quiz-form fields
                                <div>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                fullWidth
                                                label='Quiz title*'
                                                placeholder='Quiz on lesson 1-5'
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
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                fullWidth
                                                label='Duration (minutes)*'
                                                placeholder='60'
                                                value={formData?.duration}
                                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                fullWidth
                                                label='Total marks*'
                                                placeholder='40'
                                                value={formData?.total_marks}
                                                onChange={(e) => handleInputChange('total_marks', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                fullWidth
                                                label='Pass marks*'
                                                placeholder='25'
                                                value={formData?.pass_marks}
                                                onChange={(e) => handleInputChange('pass_marks', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <FormControl>
                                                    <Typography className="text-sm">Drip content rule for quiz (This will only work if drip content is enabled)</Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="START_NEXT_LESSON_BY_QUIZ_SUBMIT"
                                                        name="radio-buttons-group"
                                                        onChange={(e, value) => setDripValue(value)}
                                                    >
                                                        <FormControlLabel value="START_NEXT_LESSON_BY_QUIZ_SUBMIT" control={<Radio />} label="Students can start the next lesson by submitting the quiz" />
                                                        <FormControlLabel value="START_NEXT_LESSON_BY_PASSING_QUIZ" control={<Radio />} label="Students must achieve pass mark to start the next lesson" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomTextField
                                                fullWidth
                                                label='Number of quiz retakes'
                                                placeholder='12'
                                                value={formData?.retakes}
                                                onChange={(e) => handleInputChange('retakes', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="">
                                                <Typography className="text-sm">Instruction*</Typography>
                                                <CustomTinyMCEEditor
                                                    id='tiny-instruction'
                                                    value={instruction}
                                                    setValue={setInstruction}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                        }
                    </DialogContent>
                    <DialogActions className='justify-center mt-5'>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={callUpdateLectureFunc}
                            {
                            ...lecture?.is_quiz ?
                                {
                                    disabled: (
                                        !formData.name ||
                                        !formData.section ||
                                        !formData.duration ||
                                        !formData.total_marks ||
                                        !formData.pass_marks
                                    )
                                }
                                :
                                {
                                    disabled: (
                                        !formData.name ||
                                        !formData.section
                                    )
                                }
                            }
                        >
                            Update {lecture?.is_quiz ? 'quiz information' : 'lesson'}
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
