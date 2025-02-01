'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'

// Styled component for Accordion component
export const Accordion = styled(MuiAccordion)({
  margin: '0 !important',
  boxShadow: 'none !important',
  border: '1px solid var(--mui-palette-divider) !important',
  borderRadius: '0 !important',
  overflow: 'hidden',
  background: 'none',
  '&:not(:last-of-type)': {
    borderBottom: '0 !important'
  },
  '&:before': {
    display: 'none'
  },
  '&:first-of-type': {
    borderTopLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderTopRightRadius: 'var(--mui-shape-borderRadius) !important'
  },
  '&:last-of-type': {
    borderBottomLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderBottomRightRadius: 'var(--mui-shape-borderRadius) !important'
  }
})

// Styled component for AccordionSummary component
export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 6),
  transition: 'none',
  backgroundColor: 'var(--mui-palette-action-hover)',
  borderBlockEnd: '0 !important',
  '&.Mui-expanded': {
    borderBlockEnd: '1px solid var(--mui-palette-divider) !important'
  }
}))

// Styled component for AccordionDetails component
export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(4, 3)} !important`,
  backgroundColor: 'var(--mui-palette-background-paper)'
}))

const Sidebar = (props) => {
  const studentLectureProgresses = useSelector(state => state.student.studentLectureProgresses)

  const {
    enrollment,
    sections,
    currentLecture,
    setCurrentLecture,
    awsUrlLoading,
    setAwsUrlLoading,
    lectureItemClicked,
    setLectureItemClicked,
    createOrUpdateStudenLectureProgress,
    accordionExpanded,
    setAccordionExpanded
  } = props

  const handleChange = panel => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? panel : false)
  }

  const handleCheckboxChange = (e, index1, index2) => {
    setItems(
      items.map((item, i) => {
        if (i === index1) {
          return item.map((topic, j) => {
            if (j === index2) {
              return { ...topic, isCompleted: e.target.checked }
            }

            return topic
          })
        }

        return item
      })
    )
  }

  const isProgressCompleted = (lectureId, name) => {
    return studentLectureProgresses.find(item => {
      if (item?.lecture?.id == lectureId && item?.name === name) {
        return item?.is_completed
      }

      return false
    })
  }

  useEffect(() => { }, [studentLectureProgresses])

  const setCourseLog = (courseId, lectureId) => {
    let log = localStorage.getItem('liacourselog')

    if (log) {
      let parsedLog = JSON.parse(log)
      let newlog = { ...parsedLog, [courseId]: lectureId }

      localStorage.setItem('liacourselog', JSON.stringify(newlog))
    } else {
      let log = { [courseId]: lectureId }

      localStorage.setItem('liacourselog', JSON.stringify(log))
    }
  }

  return (
    <Card>
      <div className="p-2">
        <Typography variant='h5'>Contents</Typography>
      </div>

      <Divider className='mb-2' />

      <div>
        {
          sections?.length > 0 ?
            sections?.map((section, index) => (
              <Accordion
                key={index}
                expanded={accordionExpanded === section?.id}
                onChange={handleChange(section?.id)}
                disabled={awsUrlLoading}
              >
                <AccordionSummary
                  id='customized-panel-header-1'
                  expandIcon={<i className='tabler-chevron-right text-textSecondary' />}
                  aria-controls={'sd'}
                >
                  <Typography variant='h5'>{section?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List role='list' component='div' className='flex flex-col gap-4 plb-0'>
                    {section.section_lectures && section.section_lectures?.map((lecture, idx) => {
                      const isCompleted = isProgressCompleted(lecture?.id, lecture?.name)

                      return (
                        <ListItem
                          key={idx}
                          role='listitem'
                          disabled={awsUrlLoading}
                        >
                          <ListItemIcon>
                            <Checkbox
                              tabIndex={-1}
                              checked={isCompleted}
                              disabled={isCompleted || lecture?.is_quiz}
                              onChange={e => {
                                const value = e.target.checked



                                if (value) {
                                  createOrUpdateStudenLectureProgress(lecture?.id, lecture?.name, value)
                                }
                              }}
                            />
                          </ListItemIcon>
                          <div
                            className={`w-full p-1 m-0 ${!awsUrlLoading && 'cursor-pointer hover:border hover:border-primary'} ${currentLecture?.id === lecture.id ? 'border border-primary' : 'border border-transparent'}`}
                            onClick={(e) => {
                              setCourseLog(enrollment.course.id, lecture.id)

                              if (!awsUrlLoading) {
                                setCurrentLecture(lecture)
                                setTimeout(() => {
                                  setLectureItemClicked(!lectureItemClicked)
                                }, 1000);
                              }

                              setAwsUrlLoading(true)
                              setTimeout(() => {
                                setAwsUrlLoading(false)
                              }, 3000);
                            }}
                          >
                            <Typography className={`font-medium`}>{lecture?.name}</Typography>
                            <Typography variant='body2'>
                              {lecture.is_quiz && 'Quiz | '}
                              {['YOUTUBE', 'VIDEO_FILE'].includes(lecture.lecture_type) && 'Video | '}
                              {lecture.lecture_type === 'TEXT' && 'Text'}
                              {lecture.lecture_type !== 'TEXT' && `${lecture?.duration} minutes`}
                            </Typography>
                          </div>
                        </ListItem>
                      )
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            )
            )
            :
            <div className="flex items-center justify-center my-5">
              <Typography variant='h5'>No contents found</Typography>
            </div>
        }
      </div>
    </Card>
  )
}

export default Sidebar
