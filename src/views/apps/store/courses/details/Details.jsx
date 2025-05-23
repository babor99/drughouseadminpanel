import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'

import DOMPurify from 'dompurify'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import CustomAvatar from '@core/components/mui/Avatar'

const Details = ({ course, totalLecturesCount, totalStudentsCount }) => {
  // Hooks
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card>
      <CardContent>
        <div className='border rounded'>
          <div className='flex flex-col gap-6 px-5 '>
            <div className="w-full">
              <div className='flex flex-col gap-6 p-5'>

                <div className=''>
                  <div className="flex items-center justify-between">
                    <Typography variant='h5'>About this course</Typography>
                  </div>
                  <div className='mt-4'>
                    <Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course?.short_description) }}></Typography>
                  </div>
                </div>

                <Divider />

                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>By the numbers</Typography>
                  <div className='flex flex-wrap justify-between gap-x-12 gap-y-2'>
                    <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-check text-xl text-textSecondary' />
                        <Typography>Skill level: {course?.skillLevel}</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-users text-xl text-textSecondary' />
                        <Typography>Students: {totalStudentsCount}</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-world text-xl text-textSecondary' />
                        <Typography>Languages: {course?.language}</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-file text-xl text-textSecondary' />
                        <Typography>Captions: {course?.has_caption ? 'Yes' : 'No'}</Typography>
                      </ListItem>
                    </List>
                    <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-video text-xl text-textSecondary' />
                        <Typography>Lectures: {totalLecturesCount}</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='tabler-clock text-xl text-textSecondary' />
                        <Typography>Video: {totalLecturesCount}</Typography>
                      </ListItem>
                    </List>
                  </div>
                </div>

                <Divider />

                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Description</Typography>
                  <Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course?.description) }}></Typography>
                </div>

                <Divider />

                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Instructor</Typography>
                  <div className='flex items-center gap-4'>
                    <CustomAvatar skin='light-static' color='error' src={course?.instructor?.image} size={38} />
                    <div className='flex flex-col gap-1'>
                      <Typography className='font-medium' color='text.primary'>
                        {course?.instructor?.name} {course?.instructor?.last_name}
                      </Typography>
                      <Typography variant='body2'>{course?.instructor?.designation}</Typography>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Details
