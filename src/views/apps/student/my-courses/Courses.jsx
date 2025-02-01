import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useParams, redirect } from 'next/navigation'

import DOMPurify from 'dompurify'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

import { useSelector } from 'react-redux'

import { Autocomplete } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const Courses = props => {
  const {
    enrollments,
    setCategoryId,
    hideCompleted,
    setHideCompleted
  } = props

  const categoryOptions = useSelector(state => state.data?.courseCategorys)
  const { lang: locale } = useParams()

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>My Courses</Typography>
          </div>
          <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <FormControl fullWidth size='small' className='is-[250px] flex-auto'>
              <Autocomplete
                freeSolo
                options={categoryOptions}
                getOptionLabel={option => `${option.name}`}
                getOptionKey={option => option.id}
                onChange={(event, newValue) => {
                  setCategoryId(newValue?.id || null)
                }}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    placeholder='Select category'
                    id='category'
                    variant='outlined'
                  />
                )}
              />
            </FormControl>
            <FormControlLabel
              control={<Switch onChange={(e) => setHideCompleted(e.target.checked)} checked={hideCompleted} />}
              label='Hide completed'
            />
          </div>
        </div>
        {enrollments?.length > 0 ? (
          <Grid container spacing={6}>
            {enrollments?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className='border rounded bs-full'>
                  <div className='pli-2 pbs-2'>
                    <div className='flex'>
                      <img src={item?.course?.thumbnail} alt={item?.course?.name} className='is-full' />
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 p-5'>
                    <div className='flex items-center justify-between'>
                      <Chip label={item?.course?.category?.name} variant='tonal' size='small' color={item?.course?.category?.color_code} />
                      {/* <div className='flex items-start'>
                        <Typography className='font-medium mie-1'>{item?.course?.rating}</Typography>
                        <i className='tabler-star-filled text-warning mie-2' />
                        <Typography>{`(${item?.course?.reviews})`}</Typography>
                      </div> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography
                        variant='h5'
                        className='hover:text-primary'
                      >
                        {item?.course?.name}
                      </Typography>
                      <Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.course?.short_description) }}></Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                      {item.completed_lectures === item?.course?.lectures ? (
                        <div className='flex items-center gap-1'>
                          <i className='tabler-check text-xl text-success' />
                          <Typography color='success.main'>Completed</Typography>
                        </div>
                      ) : (
                        <div className='flex items-center gap-1'>
                          <i className='tabler-clock text-xl' />
                          <Typography>{`${item?.completed_lectures} / ${item?.course?.lectures}`}</Typography>
                        </div>
                      )}
                      <LinearProgress
                        color='primary'
                        value={Math.floor((item.completed_lectures / item?.course?.lectures) * 100)}
                        variant='determinate'
                        className='is-full bs-2'
                      />
                    </div>
                    {item?.course?.lectures === item?.completed_lectures ? (
                      <Link href={`/${locale}/apps/student/my-courses/${item?.course?.id}?action=restart`}>
                        <Button
                          fullWidth
                          variant='tonal'
                          startIcon={<i className='tabler-rotate-clockwise-2' />}
                        >
                          Start Over
                        </Button>
                      </Link>
                    ) : (
                      <div className='flex flex-wrap gap-4'>
                        <div>
                          <Link href={`/${locale}/apps/student/my-courses/${item?.course?.id}?action=restart`}>
                            <Button
                              fullWidth
                              variant='tonal'
                              color='secondary'
                              startIcon={<i className='tabler-rotate-clockwise-2' />}
                              className='is-auto flex-auto'
                            >
                              Start Over
                            </Button>
                          </Link>
                        </div>
                        <div>
                          <Link href={`/${locale}/apps/student/my-courses/${item?.course?.id}?action=continue`}>
                            <Button
                              fullWidth
                              variant='tonal'
                              endIcon={
                                <DirectionalIcon ltrIconClass='tabler-chevron-right' rtlIconClass='tabler-chevron-left' />
                              }
                              className='is-auto flex-auto'
                            >
                              Continue
                            </Button>
                          </Link>

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full"
          >
            <Typography color="textSecondary" variant="h5">
              No courses found!
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Courses
