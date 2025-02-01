import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import DOMPurify from 'dompurify'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { GET_AWS_PRESIGNED_URL, GET_QUIZ_QUESTION_BY_COURSE_ID_QUIZ_ID } from '@/constants/constants'

import VideoPlayerAndQuizContainer from './VideoPlayerAndQuizContainer'
import TabsContainer from './TabsContainer'

const Details = (props) => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const { courseId } = useParams()

  // Hooks
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [videoUrl, setVideoUrl] = useState('')
  const [quizQuestions, setQuizQuestions] = useState([])
  const [obtainedMarks, setObtainedMarks] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    enrollment,
    assignments,
    currentLecture,
    setCurrentLecture,
    totalLecturesCount,
    setAwsUrlLoading,
    lectureItemClicked,
    createOrUpdateStudenLectureProgress
  } = props

  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  useEffect(() => {
    if (currentLecture?.is_quiz) {
      getQuizQuestionsByCourseIdQuizId()
    } else {
      setObtainedMarks('')

      if (currentLecture?.lecture_type !== 'TEXT') {
        if (currentLecture?.url) {
          setVideoUrl(currentLecture?.url)
        } else {
          currentLecture?.file ? getAwsPresignedUrl(currentLecture?.file, currentLecture?.duration * 60) : setVideoUrl('')
        }
      } else {
        setVideoUrl('')
      }
    }
  }, [lectureItemClicked])

  const getQuizQuestionsByCourseIdQuizId = () => {
    setLoading(true)

    try {
      fetch(`${GET_QUIZ_QUESTION_BY_COURSE_ID_QUIZ_ID}${courseId}/${currentLecture?.id}`, authHeaders)
        .then(response => {
          if (response.ok && response.status === 200) {
            return response.json()
          }

          throw new Error(`QuizQuestion get failed with status code ${response.status}`)
        })
        .then(data => {
          setQuizQuestions(data?.quiz_questions || [])
          setCurrentLecture(data?.quiz || {})
          setLoading(false)

        })
        .catch(error => {
          setLoading(false)

        })
    } catch (err) {
      setLoading(false)

    }
  }

  const getAwsPresignedUrl = (fileKey, expiryTime) => {
    setAwsUrlLoading(true)

    if (fileKey) {
      const key = fileKey.split("amazonaws.com/")[1].split("?AWSAccessKeyId")[0]

      try {
        fetch(`${GET_AWS_PRESIGNED_URL}?file_key=${key}&expiry=${expiryTime}`, authHeaders)
          .then(res => {
            if (res.ok && res.status === 200) {


              return res.json()
            }

            throw new Error(`Request failed with status code ${res.status}`)
          })
          .then(data => {

            setVideoUrl(data?.url ?? '')
            setAwsUrlLoading(false)
          })
          .catch(error => {
            setVideoUrl('')
            setAwsUrlLoading(false)

          })
      } catch (err) {
        setVideoUrl('')
        setAwsUrlLoading(false)

      }
    }
  }

  return (
    <Card>
      <CardContent className="">
        {
          currentLecture?.is_quiz ?

            // quiz header info
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <Typography variant='h5' className="text-justify">Quiz: {currentLecture?.name}</Typography>
              </div>
              <div>||</div>
              <div>
                <Typography variant='h6'>Questions: {quizQuestions?.length} | Marks: {currentLecture?.total_marks} | Duration: {currentLecture?.duration} minutes</Typography>
              </div>
            </div>
            :

            // lesson header info
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Typography variant='h5'>Lecture: {currentLecture?.name}</Typography>
                <Typography>
                  By: Prof. <span className='font-medium text-textPrimary'>{enrollment?.course?.instructor?.name} {enrollment?.course?.instructor?.last_name}</span>
                </Typography>
              </div>
              <div className='flex items-center gap-4'>
                <Chip label={enrollment?.course?.category?.name ?? ''} variant='tonal' size='medium' className="text-sm font-bold" color={enrollment?.course?.category?.color_code ?? 'default'} />
              </div>
            </div>
        }
      </CardContent>
      <CardContent>
        <div className='border rounded'>
          {/* video-player-and-quiz container component */}
          <div>
            {
              currentLecture?.lecture_type == 'TEXT' ?
                <div className="p-2 lg:p-4">
                  <Typography variant='h6' className="my-2">Lecture Content:</Typography>
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentLecture?.text_description) }}></p>
                </div>
                :
                <div>
                  <VideoPlayerAndQuizContainer
                    currentLecture={currentLecture}
                    quizQuestions={quizQuestions}
                    videoUrl={videoUrl}
                    obtainedMarks={obtainedMarks}
                    setObtainedMarks={setObtainedMarks}
                    createOrUpdateStudenLectureProgress={createOrUpdateStudenLectureProgress}
                  />
                </div>
            }
          </div>
          <Divider className="mt-3 lg:mt-5" />
          {/* summary, assignment and certificate tabs container component */}
          <div className='flex flex-col gap-6 px-5 '>
            <TabsContainer
              enrollment={enrollment}
              assignments={assignments}
              currentLecture={currentLecture}
              totalLecturesCount={totalLecturesCount}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Details
