'use client'

import { useState, useRef, useEffect } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import _ from 'lodash'
import moment from 'moment-timezone'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { rowsPerPage } from '@/commons/dropdownOptions'

const ListTable = (props) => {
  const {
    eventData,
    params,
    setParams,
    totalPages,
    getAllEvent,
    createEventEnrollment,
    setFields,
    setCurrentEventId,
    loading,
    dialogLoading,
    setDialogLoading,
    setShowModal,
  } = props

  const eventEnrollments = useSelector(state => state.student.eventEnrollments)
  const router = useRouter()
  const { lang: locale } = useParams()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    setEnrollments([...eventEnrollments])
  }, [eventEnrollments])

  const checkEnrollment = (eventId) => {
    return (enrollObj) => {
      if (enrollObj?.event?.id === eventId) return true
    }
  }

  return (
    <>
      <Card>
        <CardHeader className='py-0' />
        {/* header buttons */}
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <div>
            <Typography variant='h5' className='text-semibold'>Upcoming Events</Typography>
          </div>
          <div>
            <CustomTextField
              placeholder='Search'
              className='max-sm:is-full'
              value={searchKeyword ?? ''}
              onChange={e => {
                setSearchKeyword(e.target.value)

                if (e.target.value.length === 0) {
                  getAllEvent({ ...params, keyword: '' })
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getAllEvent({ ...params, keyword: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <Divider />
        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              eventData?.length > 0 ? (
                <div className='p-5'>
                  <Grid container>
                    {
                      eventData.map((event, index) => (
                        <Grid key={index} item sm={6} xl={4} className='p-4'>
                          <Card className='bg-gray-700 w-full'>
                            <CardContent className='flex flex-col gap-y-3 items-start'>
                              <img height='100%' width='100%' src={event?.photo} className='rounded-md' />
                              <div className='flex flex-col gap-y-1'>
                                <Typography variant='h5'>{event.name}</Typography>
                                <Typography className='break-words text-justify'>{event.description}</Typography>
                              </div>
                              <div className='my-3'>
                                <div className='flex justify-evenly'>
                                  <div className='me-3'>
                                    <div className='flex items-center justify-start'>
                                      <CustomAvatar variant='rounded' size={60} color='success' skin='light'>
                                        <i className='tabler-calendar text-[40px]' />
                                      </CustomAvatar>
                                      <div className='ps-2'>
                                        {
                                          event?.is_tba ?
                                            <div>
                                              <Typography>To be announced</Typography>
                                            </div>
                                            :
                                            <div>
                                              <Typography>{event.date && moment(event.date).format('ll')}</Typography>
                                              <Typography>{event.time && moment(event.time, 'HH:mm').format('LT')}</Typography>
                                            </div>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className=''>
                                    <div className='flex items-center justify-start'>
                                      <CustomAvatar variant='rounded' size={60} color='success' skin='light'>
                                        <i className='tabler-location text-[40px]' />
                                      </CustomAvatar>
                                      <div className='ps-2'>
                                        <Typography className='break-words'>{event.address}</Typography>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {
                                enrollments?.find(checkEnrollment(event.id)) ?
                                  <Button variant='contained' className='w-full' disabled>Joined</Button>
                                  :
                                  <Button
                                    variant='contained'
                                    className='w-full'
                                    onClick={() => {
                                      setDialogLoading(true)

                                      if (event?.event_custom_fields?.length) {
                                        const newFields = event?.event_custom_fields?.map(field => (
                                          { ...field, selected_answer: '', file: '', text: '' }
                                        ))

                                        setCurrentEventId(event.id)
                                        setFields(newFields)
                                        setTimeout(() => {
                                          setShowModal(true)
                                          setDialogLoading(false)
                                        }, 1000)
                                      } else {
                                        createEventEnrollment(event.id)
                                        setTimeout(() => {
                                          setShowModal(true)
                                          setDialogLoading(false)
                                        }, 1000)
                                      }
                                    }}
                                    disabled={loading || dialogLoading}
                                  >
                                    Join the Event
                                  </Button>
                              }
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    }
                  </Grid>
                </div>
              ) : (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  className="flex flex-1 items-center justify-center h-full"
                >
                  <Typography color="textSecondary" variant="h5">
                    No event found!
                  </Typography>
                </div>
              )
            )
          }
        </div>

        {/* bottom pagination */}
        <Divider />
        <div className='py-3 px-2'>
          <Grid container >
            <Grid item xs={12} md={1}>
              <CustomTextField
                select
                fullWidth
                value={params?.size}
                onChange={(e) => {
                  setParams(prevParams => {
                    return { ...prevParams, size: e.target.value }
                  })
                }}
              >
                {
                  rowsPerPage?.map((size, index) => (
                    <MenuItem key={index} value={size}>{size}</MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={11}>
              <div className="flex items-center justify-end">
                <Pagination
                  showFirstButton
                  showLastButton
                  shape='rounded'
                  variant='tonal'
                  color='primary'
                  count={totalPages}
                  page={params?.page}
                  onChange={(e, newPage) => {

                    setParams(prevParams => {
                      return { ...prevParams, page: newPage }
                    })

                    // setActivePage(newPage - 1)
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Card>
    </>
  )
}

export default ListTable
