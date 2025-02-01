'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import ReactPlayer from '@/libs/ReactPlayer'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomIconButton from '@core/components/mui/IconButton'
import { GET_AWS_PRESIGNED_URL } from '@/constants/constants'

const Details = (props) => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  // Hooks
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [videoUrl, setVideoUrl] = useState('')

  const { enrollment, currentLecture, totalLecturesCount, setAwsUrlLoading } = props

  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
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

  useEffect(() => {
    if (currentLecture?.url) {
      setVideoUrl(currentLecture?.url)
    } else {
      currentLecture?.file ? getAwsPresignedUrl(currentLecture?.file, currentLecture?.duration * 60) : setVideoUrl('')
    }
  }, [currentLecture])

  return (
    <Card>
      <CardContent className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <Typography variant='h5'>Lecture: {currentLecture?.name}</Typography>
          <Typography>
            By: Prof. <span className='font-medium text-textPrimary'>{enrollment?.course?.instructor?.name} {enrollment?.course?.instructor?.last_name}</span>
          </Typography>
        </div>
        <div className='flex items-center gap-4'>
          <Chip label={enrollment?.course?.category?.name ?? ''} variant='tonal' size='small' color={enrollment?.course?.category?.color_code ?? 'default'} />
          <i className='tabler-share cursor-pointer' />
          <i className='tabler-bookmarks cursor-pointer' />
        </div>
      </CardContent>
      <CardContent>
        <div className='border rounded'>
          {/* video player */}
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
          <div className='flex flex-col gap-6 p-5'>
            <div className='flex flex-col gap-4'>
              <Typography variant='h5'>About this course</Typography>
              <Typography>{enrollment?.course?.description}</Typography>
            </div>
            <Divider />
            <div className='flex flex-col gap-4'>
              <Typography variant='h5'>By the numbers</Typography>
              <div className='flex flex-wrap gap-x-12 gap-y-2'>
                <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                  <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                    <i className='tabler-check text-xl text-textSecondary' />
                    <Typography>Skill level: {enrollment?.skillLevel}</Typography>
                  </ListItem>
                  <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                    <i className='tabler-users text-xl text-textSecondary' />
                    <Typography>Students: {enrollment?.totalStudents?.toLocaleString()}</Typography>
                  </ListItem>
                  <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                    <i className='tabler-world text-xl text-textSecondary' />
                    <Typography>Languages: {enrollment?.course?.language}</Typography>
                  </ListItem>
                  <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                    <i className='tabler-file text-xl text-textSecondary' />
                    <Typography>Captions: {enrollment?.course?.has_caption ? 'Yes' : 'No'}</Typography>
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
              <Typography>{currentLecture?.description}</Typography>

            </div>
            <Divider />
            <div className='flex flex-col gap-4'>
              <Typography variant='h5'>Instructor</Typography>
              <div className='flex items-center gap-4'>
                <CustomAvatar skin='light-static' color='error' src={enrollment?.course?.instructor?.image} size={38} />
                <div className='flex flex-col gap-1'>
                  <Typography className='font-medium' color='text.primary'>
                    {enrollment?.course?.instructor?.name} {enrollment?.course?.instructor?.last_name}
                  </Typography>
                  <Typography variant='body2'>{enrollment?.course?.instructor?.designation}</Typography>
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
