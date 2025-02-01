'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import CurriculumTab from './tabs/Curriculum/CurriculumTab';
import AcademicProgressTab from './tabs/AcademicProgress/AcademicProgressTab';
import AssignmentTab from './tabs/Assignment/AssignmentTab';
import BasicInfoTab from './tabs/BasicInfoTab';
import MediaTab from './tabs/MediaTab';
import FinishTab from './tabs/FinishTab';
import { isNumber } from '@/commons/utils';

import {
  CREATE_INSTRUCTOR_LECTURE_SECTION,
  UPDATE_INSTRUCTOR_LECTURE_SECTION,
  DELETE_INSTRUCTOR_LECTURE_SECTION,
  UPDATE_INSTRUCTOR_LECTURE_SECTION_SORTING,
  CREATE_INSTRUCTOR_LECTURE,
  UPDATE_INSTRUCTOR_LECTURE,
  DELETE_INSTRUCTOR_LECTURE,
  UPDATE_INSTRUCTOR_LECTURE_SORTING,
  CREATE_INSTRUCTOR_QUIZ,
  CREATE_INSTRUCTOR_ASSIGNMENT,
  UPDATE_INSTRUCTOR_ASSIGNMENT,
  DELETE_INSTRUCTOR_ASSIGNMENT
} from '@/constants/constants'

import { getInstructorLectureSectionsByCourseIdWP } from '@/redux-store/slices/instructor'
import { getStudentEnrollmentsWP } from '@/redux-store/slices/student'

const InstructorInformation = (props) => {
  const { courseId } = useParams()
  const dispatch = useDispatch()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const [loading, setLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0);

  const {
    assignments,
    enrollments,
    sections
  } = props

  const [currentSections, setCurrentSections] = useState([])
  const [currentAssignments, setCurrentAssignments] = useState([])

  useEffect(() => {
    setCurrentSections([...sections])
  }, [sections])

  useEffect(() => {
    setCurrentAssignments([...assignments])
  }, [assignments])

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  const authHeaders = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    }
  }

  function createNewSection(name, setOpen) {
    setLoading(true)


    try {
      fetch(CREATE_INSTRUCTOR_LECTURE_SECTION, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({ course: courseId, name: name }),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            setOpen(false)

            return res.json()
          }

          throw new Error(`Section create failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Section create success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
          dispatch(getInstructorLectureSectionsByCourseIdWP(accessToken, csrfToken, courseId))
        })
        .catch(error => {
          toast.error('Oops! Section create failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Section create failed!')
      setLoading(false)

    }
  }

  function updateSection(name, sectionId, setOpen) {
    setLoading(true)


    try {
      fetch(`${UPDATE_INSTRUCTOR_LECTURE_SECTION}${sectionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({ course: courseId, name: name }),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Section update failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Section update success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
          dispatch(getInstructorLectureSectionsByCourseIdWP(accessToken, csrfToken, courseId))
        })
        .catch(error => {
          toast.error('Oops! Section update failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Section update failed!')
      setLoading(false)

    }
  }

  function deleteSection(sectionId, setOpen) {
    setLoading(true)

    try {
      fetch(`${DELETE_INSTRUCTOR_LECTURE_SECTION}${sectionId}`, {
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

          throw new Error(`Section delete failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Section delete success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
          dispatch(getInstructorLectureSectionsByCourseIdWP(accessToken, csrfToken, courseId))
        })
        .catch(error => {
          toast.error('Oops! Section delete failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Section delete failed!')
      setLoading(false)

    }
  }

  function updateSectionSorting(sortedIds, setOpen) {
    setLoading(true)


    try {
      fetch(`${UPDATE_INSTRUCTOR_LECTURE_SECTION_SORTING}${courseId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({ ids: sortedIds }),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Section update failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Section sorting success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
          dispatch(getInstructorLectureSectionsByCourseIdWP(accessToken, csrfToken, courseId))
        })
        .catch(error => {
          toast.error('Oops! Section sorting failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Section sorting failed!')
      setLoading(false)

    }
  }

  function createNewLecture(formdata, callback) {
    setLoading(true)


    try {
      fetch(CREATE_INSTRUCTOR_LECTURE, {
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

          throw new Error(`Lecture create failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Lesson create success!')
          setCurrentSections(data || [])
          setLoading(false)
          callback({ success: true })
        })
        .catch(error => {
          toast.error('Oops! Lesson create failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Lesson create failed!')
      setLoading(false)

    }
  }

  function updateLecture(formdata, lectureId, callback) {
    setLoading(true)


    try {
      fetch(`${UPDATE_INSTRUCTOR_LECTURE}${lectureId}`, {
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

          throw new Error(`Lecture update failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Lesson update success!')
          setCurrentSections(data || [])
          dispatch(getStudentEnrollmentsWP(accessToken, csrfToken))
          setLoading(false)
          callback({ success: true })
        })
        .catch(error => {
          toast.error('Oops! Lesson update failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Lesson update failed!')
      setLoading(false)

    }
  }

  function deleteLecture(lectureId, setOpen) {
    setLoading(true)

    try {
      fetch(`${DELETE_INSTRUCTOR_LECTURE}${lectureId}`, {
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

          throw new Error(`Lecture delete failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Lesson delete success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
        })
        .catch(error => {
          toast.error('Oops! Lesson delete failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Lesson delete failed!')
      setLoading(false)

    }
  }

  function updateLessonSorting(sortedIds, setOpen) {
    setLoading(true)


    try {
      fetch(`${UPDATE_INSTRUCTOR_LECTURE_SORTING}${courseId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders.headers,
        body: JSON.stringify({ ids: sortedIds }),
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          throw new Error(`Lesson update failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Lesson sorting success!')
          setCurrentSections(data || [])
          setLoading(false)
          setOpen(false)
        })
        .catch(error => {
          toast.error('Oops! Lesson sorting failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Lesson sorting failed!')
      setLoading(false)

    }
  }

  function createNewQuiz(formdata, callback) {
    setLoading(true)

    try {
      fetch(CREATE_INSTRUCTOR_QUIZ, {
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

          throw new Error(`Quiz create failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Quiz create success!')
          callback({ success: true })
          setCurrentSections(data || [])
          setLoading(false)
        })
        .catch(error => {
          toast.error('Oops! Quiz create failed!')
          setLoading(false)

        })
    } catch (err) {
      toast.error('Oops! Quiz create failed!')
      setLoading(false)

    }
  }

  function createNewAssignment(formdata, callback) {
    setLoading(true)


    try {
      fetch(CREATE_INSTRUCTOR_ASSIGNMENT, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
        body: formdata,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          callback({ success: false })
          throw new Error(`Assignment create failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Assignment create success!')
          setLoading(false)
          setCurrentAssignments(data || [])
          callback({ success: true })
        })
        .catch(error => {
          toast.error('Oops! Assignment create failed!')
          setLoading(false)
          callback({ success: false })

        })
    } catch (err) {
      toast.error('Oops! Assignment create failed!')
      setLoading(false)
      callback({ success: false })

    }
  }

  function updateAssignment({ formdata, assignmentId }, callback) {
    setLoading(true)


    try {
      fetch(`${UPDATE_INSTRUCTOR_ASSIGNMENT}${assignmentId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
        body: formdata,
      })
        .then(res => {
          if (res.ok && [200, 201].includes(res.status)) {
            return res.json()
          }

          callback({ success: false })
          throw new Error(`Assignment update failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Assignment update success!')
          setLoading(false)
          setCurrentAssignments(data || [])
          callback({ success: true, assignmentId: assignmentId })
        })
        .catch(error => {
          toast.error('Oops! Assignment update failed!')
          setLoading(false)
          callback({ success: false })

        })
    } catch (err) {
      toast.error('Oops! Assignment update failed!')
      setLoading(false)
      callback({ success: false })

    }
  }

  function deleteAssignment(assignmentId, callback) {
    setLoading(true)

    try {
      fetch(`${DELETE_INSTRUCTOR_ASSIGNMENT}${assignmentId}`, {
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

          callback({ success: false })
          throw new Error(`Assignment delete failed with status code ${res.status}`)
        })
        .then(data => {

          toast.success('Congrats! Assignment delete success!')
          setLoading(false)
          setCurrentAssignments(data || [])
          callback({ success: true, assignmentId: assignmentId })
        })
        .catch(error => {
          toast.error('Oops! Assignment delete failed!')
          setLoading(false)
          callback({ success: false })

        })
    } catch (err) {
      toast.error('Oops! Assignment delete failed!')
      setLoading(false)
      callback({ success: false })

    }
  }

  return (
    <Card>
      <CardContent>
        <div className={`mb-10 px-3`}>
          {
            courseId === 'new' ?
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                classes={{ root: 'h-16 border-b-1' }}
              >
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Basic Information" />
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Media" />
                <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Finish" />
              </Tabs>
              :
              isNumber(courseId) ?
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  classes={{ root: 'h-16 border-b-2' }}
                >
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Curriculum" />
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Academic Progress" />
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Assignment" />
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Basic Information" />
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Media" />
                  <Tab className="h-16 m-0 py-0 px-5 xl:px-10" label="Finish" />
                </Tabs>
                :
                <></>
          }

          <div className="flex items-center justify-center">
            <div className="py-5 w-full">
              {
                courseId === 'new' ?
                  <>
                    <div className={tabValue !== 0 ? 'hidden' : ''}>
                      <BasicInfoTab />
                    </div>

                    <div className={tabValue !== 1 ? 'hidden' : ''}>
                      <MediaTab />
                    </div>

                    <div className={tabValue !== 2 ? 'hidden' : ''}>
                      <FinishTab />
                    </div>
                  </>
                  :
                  isNumber(courseId) ?
                    <>
                      <div className={tabValue !== 0 ? 'hidden' : ''}>
                        <CurriculumTab
                          sections={currentSections}
                          createNewSection={createNewSection}
                          updateSection={updateSection}
                          deleteSection={deleteSection}
                          createNewLecture={createNewLecture}
                          updateLecture={updateLecture}
                          deleteLecture={deleteLecture}
                          createNewQuiz={createNewQuiz}
                          updateSectionSorting={updateSectionSorting}
                          updateLessonSorting={updateLessonSorting}
                        />
                      </div>

                      <div className={tabValue !== 1 ? 'hidden' : ''}>
                        <AcademicProgressTab
                          enrollments={enrollments}
                        />
                      </div>

                      <div className={tabValue !== 2 ? 'hidden' : ''}>
                        <AssignmentTab
                          assignments={currentAssignments}
                          createNewAssignment={createNewAssignment}
                          updateAssignment={updateAssignment}
                          deleteAssignment={deleteAssignment}
                        />
                      </div>
                      <div className={tabValue !== 3 ? 'hidden' : ''}>
                        <BasicInfoTab />
                      </div>

                      <div className={tabValue !== 4 ? 'hidden' : ''}>
                        <MediaTab />
                      </div>

                      <div className={tabValue !== 5 ? 'hidden' : ''}>
                        <FinishTab />
                      </div>
                    </>
                    :
                    <></>
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InstructorInformation
