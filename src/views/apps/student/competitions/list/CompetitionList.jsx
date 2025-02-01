'use client'

import { useState, useEffect } from 'react'

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
    competitionData,
    params,
    setParams,
    totalPages,
    getAllCompetition,
    createCompetitionEnrollment,
    setFields,
    setCurrentCompetitionId,
    loading,
    dialogLoading,
    setDialogLoading,
    setShowModal,
  } = props

  const competitionEnrollments = useSelector(state => state.student.competitionEnrollments)
  const router = useRouter()
  const { lang: locale } = useParams()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    setEnrollments([...competitionEnrollments])
  }, [competitionEnrollments])

  const checkEnrollment = (competitionId) => {
    return (enrollObj) => {
      if (enrollObj?.competition?.id === competitionId) return true
    }
  }

  return (
    <>
      <Card>
        <CardHeader className='py-0' />
        {/* header buttons */}
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <div>
            <Typography variant='h5' className='text-semibold'>Upcoming Competitions</Typography>
          </div>
          <div>
            <CustomTextField
              placeholder='Search'
              className='max-sm:is-full'
              value={searchKeyword ?? ''}
              onChange={e => {
                setSearchKeyword(e.target.value)

                if (e.target.value.length === 0) {
                  getAllCompetition({ ...params, keyword: '' })
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getAllCompetition({ ...params, keyword: e.target.value })
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
              competitionData?.length > 0 ? (
                <div className='p-5'>
                  <Grid container>
                    {
                      competitionData.map((competition, index) => (
                        <Grid key={index} item sm={6} xl={4} className='p-4'>
                          <Card className='bg-gray-700 w-full'>
                            <CardContent className='flex flex-col gap-y-3 items-start'>
                              <img height='100%' width='100%' src={competition?.photo} className='rounded-md' />
                              <div className='flex flex-col gap-y-1'>
                                <Typography variant='h5'>{competition.name}</Typography>
                                <Typography className='break-words text-justify'>{competition.description}</Typography>
                              </div>
                              <div className='my-3'>
                                <Grid container>
                                  <Grid item>
                                    <div className='flex items-center justify-start'>
                                      <CustomAvatar variant='rounded' size={60} color='success' skin='light'>
                                        <i className='tabler-calendar text-[40px]' />
                                      </CustomAvatar>
                                      <div className='ps-2'>
                                        <Typography>Start: {competition.start_date && moment(competition.start_date).format('ll')}</Typography>
                                        <Typography>End: {competition.end_date && moment(competition.end_date).format('ll')}</Typography>
                                      </div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                              {
                                enrollments?.find(checkEnrollment(competition.id)) ?
                                  <Grid container>
                                    <Grid item sm={6} className='pr-1'>
                                      <Button variant='contained' className='w-full' disabled>Registered</Button>
                                    </Grid>
                                    <Grid item sm={6}>
                                      <Button
                                        variant='contained'
                                        className='w-full'
                                        onClick={() => {
                                          setDialogLoading(true)

                                          if (competition?.competition_custom_fields?.length) {
                                            const newFields = competition?.competition_custom_fields?.map(field => (
                                              { ...field, selected_answer: '', file: '', text: '' }
                                            ))

                                            setCurrentCompetitionId(competition.id)
                                            setFields(newFields)
                                            setTimeout(() => {
                                              setShowModal(true)
                                              setDialogLoading(false)
                                            }, 1000)
                                          } else {
                                            createCompetitionEnrollment(competition.id)
                                            setTimeout(() => {
                                              setShowModal(true)
                                              setDialogLoading(false)
                                            }, 1000)
                                          }
                                        }}
                                        disabled={loading || dialogLoading}
                                      >
                                        Register again?
                                      </Button>
                                    </Grid>
                                  </Grid>
                                  :
                                  <Button
                                    variant='contained'
                                    className='w-full'
                                    onClick={() => {
                                      setDialogLoading(true)

                                      if (competition?.competition_custom_fields?.length) {
                                        const newFields = competition?.competition_custom_fields?.map(field => (
                                          { ...field, selected_answer: '', file: '', text: '' }
                                        ))

                                        setCurrentCompetitionId(competition.id)
                                        setFields(newFields)
                                        setTimeout(() => {
                                          setShowModal(true)
                                          setDialogLoading(false)
                                        }, 1000)
                                      } else {
                                        createCompetitionEnrollment(competition.id)
                                        setTimeout(() => {
                                          setShowModal(true)
                                          setDialogLoading(false)
                                        }, 1000)
                                      }
                                    }}
                                    disabled={loading || dialogLoading}
                                  >
                                    Register
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
                    No competition found!
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
