import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import ReactPlayer from '@/libs/ReactPlayer'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'
import QuizTimer from './utils/QuizTimer';

import {
    CREATE_STUDENT_QUIZ_SUBMISSION,
    UPDATE_STUDENT_QUIZ_SUBMISSION_AND_CREATE_ANSWERS
} from '@/constants/constants'

import { getStudentQuizSubmissionsCountByStudent } from '@/redux-store/slices/student'

const VideoPlayerAndQuizContainer = (props) => {
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const dispatch = useDispatch()

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)
    const studentQuizSubmissionsCountList = useSelector(state => state.student.studentQuizSubmissionsCountList || {})

    const [loading, setLoading] = useState(false)
    const [quizStarted, setQuizStarted] = useState(false)
    const [formData, setFormData] = useState({})

    const {
        currentLecture,
        quizQuestions,
        obtainedMarks,
        setObtainedMarks,
        videoUrl,
        createOrUpdateStudenLectureProgress
    } = props

    const handleInputChange = (id, value) => {
        setFormData(prevState => {
            return { ...prevState, [id]: value }
        })
    }

    // create initial quiz-submission when 'Start Quiz' button clicked.
    function createInitialQuizSubmisison() {
        setLoading(true)

        try {
            fetch(CREATE_STUDENT_QUIZ_SUBMISSION, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quiz: currentLecture?.id })
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`QuizSubmission create failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    dispatch(getStudentQuizSubmissionsCountByStudent(accessToken, csrfToken))
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }

    // update initially created quiz-sumbission and create the quiz-submission-answers.
    function submitQuiz() {
        setLoading(true)

        try {
            fetch(UPDATE_STUDENT_QUIZ_SUBMISSION_AND_CREATE_ANSWERS, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quiz: currentLecture?.id, answers: formData })
            })
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`QuizSubmission update failed with status code ${res.status}`)
                })
                .then(data => {

                    setLoading(false)
                    setQuizStarted(false)
                    setObtainedMarks(data?.obtained_marks || '')
                    createOrUpdateStudenLectureProgress(currentLecture?.id, currentLecture?.name, true)
                })
                .catch(error => {
                    setLoading(false)

                })
        } catch (err) {
            setLoading(false)

        }
    }



    return (
        <div>
            {
                currentLecture?.is_quiz ?

                    // quiz section
                    <div className="px-2 lg:px-4 pt-2 lg:pt-4">
                        {
                            quizStarted ?
                                <div className="px-2 lg:px-4 pt-2 lg:pt-4">
                                    {/* timer header */}
                                    <div>
                                        <Typography variant='h5' className="text-center">Quiz Timer</Typography>
                                        <div className="text-center mt-3 lg:mt-5">
                                            <QuizTimer duration={currentLecture?.duration || 0} onTimeUp={submitQuiz} />
                                        </div>
                                    </div>
                                    {/* quesionts container */}
                                    <div className="mt-3 lg:mt-6">
                                        <Divider className="my-2 lg:my-4" />
                                        {
                                            quizQuestions &&
                                            quizQuestions?.map((question, index) => (
                                                <div key={index}>
                                                    {
                                                        question.question_type === 'MCQ' ?
                                                            <div>
                                                                <div className="flex items-center justify-start gap-10 lg:gap-16 ps-4 mt-4">
                                                                    <FormControl>
                                                                        <FormLabel id="demo-radio-buttons-group-label" className="mb-3 font-bold">{index + 1}. {question.question}</FormLabel>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            name="radio-buttons-group"
                                                                            onChange={(e, value) => handleInputChange(question.id, value)}
                                                                        >
                                                                            <div className="flex gap:6 lg:gap-10">
                                                                                {
                                                                                    question.options &&
                                                                                    question.options?.map((option, idx) => (
                                                                                        <FormControlLabel key={idx} value={option.id} control={<Radio />} label={option.value} />
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                                <Divider className="my-2 lg:my-4" />
                                                            </div>
                                                            :
                                                            question.question_type === 'TF' ?
                                                                <div>
                                                                    <div className="flex items-center justify-start gap-10 lg:gap-16 ps-4 mt-4">
                                                                        <FormControl>
                                                                            <FormLabel id="demo-radio-buttons-group-label" className="mb-3 font-bold">{index + 1}. {question.question}</FormLabel>
                                                                            <RadioGroup
                                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                                name="radio-buttons-group"
                                                                                onChange={(e, value) => handleInputChange(question.id, value)}
                                                                            >
                                                                                <div className="flex gap:6 lg:gap-10">
                                                                                    {
                                                                                        question.options &&
                                                                                        question.options?.map((option, idx) => (
                                                                                            <FormControlLabel key={inx} value={option.id} control={<Radio />} label={option.value} />
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </RadioGroup>
                                                                        </FormControl>
                                                                    </div>
                                                                    <Divider className="my-2 lg:my-4" />
                                                                </div>
                                                                :
                                                                question.question_type === 'FITB' ?
                                                                    <div className="w-full">
                                                                        <div className="flex items-center justify-start gap-10 lg:gap-16 ps-4 mt-4 w-full">
                                                                            <FormControl>
                                                                                <FormLabel id="demo-radio-buttons-group-label" className="mb-3 font-bold">{index + 1}. {question.question}</FormLabel>
                                                                                <CustomTextField
                                                                                    fullWidth
                                                                                    placeholder="Type your answer here.."
                                                                                    className="w-full"
                                                                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <Divider className="my-2 lg:my-4" />
                                                                    </div>
                                                                    :
                                                                    <div></div>
                                                    }
                                                </div>)
                                            )
                                        }

                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Button
                                            variant='outlined'
                                            className="bg-primary text-white hover:text-gray-900"
                                            onClick={submitQuiz}
                                        >
                                            Submit Quiz
                                        </Button>
                                    </div>

                                </div>
                                :
                                <div className="flex items-center justify-center py-24">
                                    {
                                        !studentQuizSubmissionsCountList?.find((item) => item.quiz == currentLecture.id) ?
                                            <div>
                                                {
                                                    quizQuestions && quizQuestions?.length > 0 ?
                                                        <div>
                                                            <Typography variant='h4' className="text-center">Caution!</Typography>
                                                            <Typography variant='h5' className='text-primary text-center'>Be careful! After starting the Quiz, you can not change the lectures or leave this page. Otherwise, you will be disqualified.</Typography>
                                                            <div className="flex items-center justify-center mt-5 lg:mt-10">
                                                                <Button
                                                                    variant='outlined'
                                                                    className="bg-primary text-white hover:text-gray-900"
                                                                    onClick={() => {
                                                                        setQuizStarted(true)
                                                                        createInitialQuizSubmisison()
                                                                    }}
                                                                >
                                                                    Start Quiz
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="flex items-center justify-center mt-5 lg:mt-10">
                                                            <Typography variant='h6' className="text-center">Questions not added yet! Inform your instructor to add questions.</Typography>
                                                        </div>
                                                }
                                            </div>
                                            :
                                            studentQuizSubmissionsCountList?.find((item) => item.quiz === currentLecture.id)?.submitted < currentLecture?.retakes + 1 ?
                                                <div>
                                                    {
                                                        quizQuestions && quizQuestions?.length > 0 ?
                                                            <div>
                                                                <div>
                                                                    <Typography variant='h5' className="text-center">Quiz Result</Typography>
                                                                    <Typography variant='h6' className="text-center">Total marks: {currentLecture?.total_marks}</Typography>
                                                                    <Typography variant='h6' className="text-center">Pass mark: {currentLecture?.pass_marks}</Typography>
                                                                    <Typography
                                                                        variant='h6'
                                                                        className={`text-center ${currentLecture?.pass_mark > currentLecture?.quiz_submissions?.find(submission => submission.quiz == currentLecture?.id)?.obtained_marks && 'text-primary'}`}>
                                                                        Obtained marks: {obtainedMarks || currentLecture?.quiz_submissions?.find(submission => submission.quiz == currentLecture?.id)?.obtained_marks}
                                                                    </Typography>
                                                                </div>
                                                                <div className="mt-5 lg:mt-10">
                                                                    <Typography variant='h4' className="text-center">Caution!</Typography>
                                                                    <Typography variant='h5' className='text-primary text-center'>Be careful! After starting the Quiz, you can not change the lectures or leave this page. Otherwise, you will be disqualified.</Typography>
                                                                </div>
                                                                <div className="flex items-center justify-center mt-5 lg:mt-10">
                                                                    <Button
                                                                        variant='outlined'
                                                                        className="bg-primary text-white hover:text-gray-900"
                                                                        onClick={() => {
                                                                            setQuizStarted(true)
                                                                            createInitialQuizSubmisison()
                                                                        }}
                                                                    >
                                                                        Retake Quiz
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="flex items-center justify-center mt-5 lg:mt-10">
                                                                <Typography variant='h6' className="text-center">Questions not added yet! Inform your instructor to add questions.</Typography>
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    <Typography variant='h5' className="text-center">Quiz Result</Typography>
                                                    <Typography variant='h6' className="text-center">Total marks: {currentLecture?.total_marks}</Typography>
                                                    <Typography variant='h6' className="text-center">Pass mark: {currentLecture?.pass_marks}</Typography>
                                                    <Typography
                                                        variant='h6'
                                                        className={`text-center ${currentLecture?.pass_mark > currentLecture?.quiz_submissions?.find(submission => submission.quiz == currentLecture?.id)?.obtained_marks && 'text-primary'}`}>
                                                        Obtained marks: {obtainedMarks || currentLecture?.quiz_submissions?.find(submission => submission.quiz == currentLecture?.id)?.obtained_marks}
                                                    </Typography>
                                                </div>
                                    }
                                </div>
                        }
                    </div>
                    :

                    // vidoe player section
                    <div className='mli-2 mbs-2 overflow-hidden rounded'>
                        <ReactPlayer
                            playing
                            controls
                            url={videoUrl}

                            // url='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4'
                            height={smallScreen ? 280 : 440}
                            className='bg-black !is-full'
                            light={
                                <img
                                    src='/images/apps/academy/4.png'
                                    alt='Thumbnail'
                                    className='is-full bs-full object-cover bg-backgroundPaper'
                                />
                            }
                            playIcon={
                                <CustomIconButton variant='contained' color='error' className='absolute rounded-full'>
                                    <i className='tabler-player-play text-2xl' />
                                </CustomIconButton>
                            }
                        />
                    </div>
            }
        </div>
    )
}

export default VideoPlayerAndQuizContainer
