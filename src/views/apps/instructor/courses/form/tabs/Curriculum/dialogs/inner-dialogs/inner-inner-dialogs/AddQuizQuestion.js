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
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Component Imports
import DialogCloseButton from '@/components/custom/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

import { CREATE_INSTRUCTOR_QUIZ_QUESTION, UPDATE_INSTRUCTOR_QUIZ_QUESTION, DELETE_INSTRUCTOR_QUIZ_QUESTION } from '@/constants/constants'
import { isNumber } from '@/commons/utils'

const AddQuizQuestion = ({ open, setOpen, quizId, currentQuizName, quizQuestions }) => {
    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const [currentQuizQuestions, setCurrentQuizQuestions] = useState([])
    const [name, setName] = useState('')
    const [file, setFile] = useState('')

    const [loading, setLoading] = useState(false)
    const [showListPage, setShowListPage] = useState(true)
    const [showCreatePage, setShowCreatePage] = useState(false)
    const [showEditPage, setShowEditPage] = useState(false)
    const [showDeletePage, setShowDeletePage] = useState(false)

    const [currentQuizQuestionId, setCurrentQuizQuestionId] = useState('')
    const [currentQuizQuestionName, setCurrentQuizQuestionName] = useState('')

    const [numberOfOptions, setNumberOfOptions] = useState('')
    const [options, setOptions] = useState([])

    const [formData, setFormData] = useState({
        question: '',
        question_type: '',
        correct_answer: '',
    })

    useEffect(() => {
        quizQuestions && setCurrentQuizQuestions([...quizQuestions])
    }, [quizQuestions])

    useEffect(() => {
        const optionsArray = []

        if (numberOfOptions && isNumber(numberOfOptions)) {
            for (let i = 1; i <= numberOfOptions; i++) {
                optionsArray.push({ id: i, value: '' })

            }

            optionsArray.length && setOptions([...optionsArray])
        } else {
            setOptions([])
        }
    }, [numberOfOptions])

    const handleOptionChange = (index, value) => {
        setOptions(prevOptions =>
            prevOptions.map((option, i) =>
                i + 1 === index ? { ...option, value: value } : option
            )
        )
    }

    const handleClose = () => {
        setOpen(false)
        setShowCreatePage(false)
        setShowEditPage(false)
        setShowDeletePage(false)
        setShowListPage(true)
    }

    // handle input field change
    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            return { ...prevData, [field]: value }
        })

        if (field === 'question_type') {
            setNumberOfOptions(0)
            setOptions([])
        }
    }

    function createQuizQuestion() {
        setLoading(true)
        formData.quiz = quizId
        formData.options = options

        try {
            fetch(CREATE_INSTRUCTOR_QUIZ_QUESTION, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`QuizQuestion create failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    setCurrentQuizQuestions(data || [])
                    setFormData({ question: '', question_type: '', correct_answer: '' })
                    setOptions([])
                    setShowCreatePage(false)
                    setShowEditPage(false)
                    setShowDeletePage(false)
                    setShowListPage(true)
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    function updateQuizQuestion() {
        setLoading(true)
        formData.options = options

        try {
            fetch(`${UPDATE_INSTRUCTOR_QUIZ_QUESTION}${currentQuizQuestionId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`QuizQuestion create failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    setCurrentQuizQuestions(data || [])
                    setOptions([])
                    setShowCreatePage(false)
                    setShowEditPage(false)
                    setShowDeletePage(false)
                    setShowListPage(true)
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    function deleteQuizQuestion() {
        setLoading(true)

        try {
            fetch(`${DELETE_INSTRUCTOR_QUIZ_QUESTION}${currentQuizQuestionId}`, {
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

                    throw new Error(`QuizQuestion delete failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    setCurrentQuizQuestions(data || [])
                    setShowCreatePage(false)
                    setShowEditPage(false)
                    setShowDeletePage(false)
                    showListPage(true)
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
            maxWidth='md'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='tabler-x' />
            </DialogCloseButton>
            <DialogTitle variant='h5' className='text-center'>
                {showListPage && 'Quiz Questions List'}
                {showCreatePage && 'Add New Quiz Question'}
                {showEditPage && 'Edit Quiz Question'}
                {showDeletePage && 'Delete Quiz Question'}
            </DialogTitle>
            <Divider className="my-2 lg:my-4" />
            <DialogContent className='overflow-visible pbs-0 sm:pli-16'>

                {/* list page */}
                <div className={`${!showListPage && 'hidden'}`}>
                    <div>
                        <div className="flex items-center justify-between">
                            <Typography variant='h6' className="font-bold break-words">Questions of: {currentQuizName}</Typography>
                            <Button
                                variant='contained'
                                className="bg-primary p-1"
                                onClick={() => {
                                    setShowListPage(false)
                                    setShowEditPage(false)
                                    setShowDeletePage(false)
                                    setShowCreatePage(true)
                                }}
                            >
                                Add new question
                            </Button>
                        </div>
                        <Divider className="mt-3 lg:mt-5" />
                        <div>
                            {
                                currentQuizQuestions &&
                                currentQuizQuestions.map((question, index) => (
                                    <div key={index} className="flex items-center justify-between my-2 lg:my-3">
                                        <Typography className="break-words">{question.question}</Typography>
                                        <div>
                                            <IconButton>
                                                <i
                                                    className="tabler-edit text-secondary"
                                                    title="Edit"
                                                    onClick={() => {
                                                        setCurrentQuizQuestionId(question.id)
                                                        setFormData({ ...question })
                                                        setOptions([...question.options])
                                                        setShowListPage(false)
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
                                                        setCurrentQuizQuestionId(question.id)
                                                        setCurrentQuizQuestionName(question.question)
                                                        setShowListPage(false)
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

                {/* create page */}
                <div className={`${!showCreatePage && 'hidden'}`}>
                    <div className="my-4 lg:my-8">
                        <div>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    {/* This field will be replaced with an rich Editor soon */}
                                    <CustomTextField
                                        fullWidth
                                        label='Write your question'
                                        onChange={e => handleInputChange('question', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Question type*'
                                        value={formData?.question_type}
                                        onChange={(e) => handleInputChange('question_type', e.target.value)}
                                    >
                                        <MenuItem value="MCQ">
                                            Multiple choice
                                        </MenuItem>
                                        <MenuItem value="TF">
                                            True/ False
                                        </MenuItem>
                                        <MenuItem value="FITB">
                                            Fill in the blanks
                                        </MenuItem>
                                    </CustomTextField>
                                </Grid>
                                {
                                    ['MCQ', 'TF'].includes(formData?.question_type) &&
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label='Number of options'
                                            type='number'
                                            onChange={e => setNumberOfOptions(e.target.value)}
                                        />
                                    </Grid>
                                }
                                {
                                    formData?.question_type === 'FITB' &&
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label="Enter which word of your question you want to show blank(_______)?"
                                            value={formData.correct_answer}
                                            onChange={e => handleInputChange('correct_answer', e.target.value)}
                                        />
                                    </Grid>
                                }
                                {
                                    options && options.map((option, index) => (
                                        <Grid key={index} item xs={12}>
                                            <Grid container gap={0}>
                                                <Grid item xs={12}>
                                                    <div className="flex items-center justify-center w-full">
                                                        <CustomTextField
                                                            fullWidth
                                                            label={`Option ${index + 1}`}
                                                            value={option.value}
                                                            onChange={e => handleOptionChange(index + 1, e.target.value)}
                                                        />
                                                        <FormControlLabel
                                                            className="border-2 rounded-md mt-5 ms-0 mr-0"
                                                            control={
                                                                <Radio
                                                                    checked={formData.correct_answer === option.id}
                                                                    onChange={() => setFormData((prev) => { return { ...prev, correct_answer: option.id } })}
                                                                    value={option.id}
                                                                    name="option-radio"
                                                                    color="primary"
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </div>
                                                </Grid>
                                                {/* <Grid item xs={1}>
                                                </Grid> */}
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                        <div className="flex items-center justify-between mt-4 lg:mt-8">
                            <Button
                                variant='contained'
                                className="bg-primary"
                                disabled={formData.question.length < 5 || !formData.question_type || !formData.correct_answer || loading}
                                onClick={createQuizQuestion}
                            >
                                Add
                            </Button>
                            <Button
                                variant='contained'
                                className="bg-secondary"
                                onClick={() => {
                                    setFormData({
                                        quiz: quizId,
                                        question: '',
                                        question_type: '',
                                        correct_answer: '',
                                    })
                                    setOptions([])
                                    setShowCreatePage(false)
                                    setShowEditPage(false)
                                    setShowDeletePage(false)
                                    setShowListPage(true)
                                }}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>

                {/* edit page */}
                <div className={`${!showEditPage && 'hidden'}`}>
                    <div className="my-4 lg:my-8">
                        <div>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        label='Write your question'
                                        value={formData.question}
                                        onChange={e => handleInputChange('question', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Question type*'
                                        value={formData?.question_type}
                                        onChange={(e) => handleInputChange('question_type', e.target.value)}
                                    >
                                        <MenuItem value="MCQ">
                                            Multiple choice
                                        </MenuItem>
                                        <MenuItem value="TF">
                                            True/ False
                                        </MenuItem>
                                        <MenuItem value="FITB">
                                            Fill in the blanks
                                        </MenuItem>
                                    </CustomTextField>
                                </Grid>
                                {
                                    ['MCQ', 'TF'].includes(formData?.question_type) &&
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label='Number of options'
                                            type='number'
                                            value={options.length}
                                            onChange={e => setNumberOfOptions(e.target.value)}
                                        />
                                    </Grid>
                                }
                                {
                                    formData?.question_type === 'FITB' &&
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            label="Enter which word of your question you want to show blank(_______)?"
                                            value={formData.correct_answer}
                                            onChange={e => handleInputChange('correct_answer', e.target.value)}
                                        />
                                    </Grid>
                                }
                                {
                                    options && options.map((option, index) => (
                                        <Grid key={index} item xs={12}>
                                            <Grid container gap={0}>
                                                <Grid item xs={12}>
                                                    <div className="flex items-center justify-center w-full">
                                                        <CustomTextField
                                                            fullWidth
                                                            label={`Option ${index + 1}`}
                                                            value={option.value}
                                                            onChange={e => handleOptionChange(index + 1, e.target.value)}
                                                        />
                                                        <FormControlLabel
                                                            className="border-2 rounded-md mt-5 ms-0 mr-0"
                                                            control={
                                                                <Radio
                                                                    checked={formData.correct_answer == option.id}
                                                                    onChange={() => setFormData((prev) => { return { ...prev, correct_answer: option.id } })}
                                                                    value={option.id}
                                                                    name="option-radio"
                                                                    color="primary"
                                                                />
                                                            }
                                                            label=""
                                                        />

                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                        <div className="flex items-center justify-between mt-4 lg:mt-8">
                            <Button
                                variant='contained'
                                className="bg-primary"
                                disabled={formData.question.length < 5 || !formData.question_type || !formData.correct_answer || loading}
                                onClick={updateQuizQuestion}
                            >
                                Update
                            </Button>
                            <Button
                                variant='contained'
                                className="bg-secondary"
                                onClick={() => {
                                    setFormData({
                                        quiz: quizId,
                                        question: '',
                                        question_type: '',
                                        correct_answer: '',
                                    })
                                    setOptions([])
                                    setShowCreatePage(false)
                                    setShowEditPage(false)
                                    setShowDeletePage(false)
                                    setShowListPage(true)
                                }}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>

                {/* delete page */}
                <div className={`${!showDeletePage && 'hidden'}`}>
                    <div className="my-5 lg:my-10">
                        <Typography variant='h5' className="mb-6 text-center">Are you sure to delete this question?</Typography>
                        <Typography className="mb-6 text-center">{currentQuizQuestionName && currentQuizQuestionName}</Typography>
                    </div>
                    <div className="flex items-center justify-between mt-3 lg:mt-6">
                        <Button
                            variant='contained'
                            className=""
                            onClick={deleteQuizQuestion}
                        >
                            Delete
                        </Button>
                        <Button
                            variant='contained'
                            className="bg-secondary"
                            onClick={() => {
                                setShowCreatePage(false)
                                setShowEditPage(false)
                                setShowDeletePage(false)
                                setShowListPage(true)
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

export default AddQuizQuestion
