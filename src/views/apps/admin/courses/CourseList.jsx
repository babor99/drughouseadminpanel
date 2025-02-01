import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

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

import DOMPurify from 'dompurify'

import { Autocomplete } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const CourseList = props => {
  // Props
  const { courseData, studentEnrollments, params, setParams, loading, createEnrollment, enrollBtnDisabled, totalPages } = props

  const categoryOptions = useSelector(state => state.data?.courseCategorys)

  const [activePage, setActivePage] = useState(0)

  // Hooks
  const { lang: locale } = useParams()

  const checkEnrollment = (courseId) => {
    return (enrollObj) => {
      if (enrollObj?.course?.id === courseId) return true
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>Available Courses</Typography>
          </div>
          <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <FormControl fullWidth size='small' className='is-[250px] flex-auto'>
              <Autocomplete
                freeSolo
                options={categoryOptions}
                getOptionLabel={option => `${option.name}`}
                getOptionKey={option => option.id}
                onChange={(event, newValue) => {
                  setParams((prevState) => {
                    return { ...prevState, category: newValue?.id || null }
                  })
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
          </div>
        </div>
        {
          loading ? '' : (
            courseData?.length > 0 ? (
              <Grid container spacing={6}>
                {courseData?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <div className='border rounded bs-full'>
                      <div className='pli-2 pbs-2'>
                        <div className='flex'>
                          <img src={item.thumbnail} alt={item.name} className='is-full' />
                        </div>
                      </div>
                      <div className='flex flex-col gap-4 p-5'>
                        <div className='flex items-center justify-between'>
                          <Chip label={item?.category?.name} variant='tonal' size='small' color={item?.category?.color_code} />
                          {/* <div className='flex items-start'>
                            <Typography className='font-medium mie-1'>{item.rating}</Typography>
                            <i className='tabler-star-filled text-warning mie-2' />
                            <Typography>{`(${item.reviews})`}</Typography>
                          </div> */}
                        </div>
                        <div className='flex flex-col gap-1'>
                          <Typography
                            variant='h5'
                            className='hover:text-primary'
                          >
                            {item.name}
                          </Typography>
                          <Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.short_description) }}></Typography>
                        </div>
                        {/* {studentEnrollments.find(checkEnrollment(item?.id)) ? (
                          <div className='flex flex-wrap gap-4'>
                            <Button
                              fullWidth
                              disabled
                              variant='tonal'
                              color='primary'
                              className='is-auto flex-auto'
                            >
                              Enrolled
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant='tonal'
                            startIcon={<i className='tabler-rotate-clockwise-2' />}
                            onClick={() => createEnrollment(item?.id)}
                            disabled={enrollBtnDisabled}
                          >
                            Enroll Now
                          </Button>
                        )} */}
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
            )
          )

        }
        <div className='flex justify-center'>
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
      </CardContent>
    </Card>
  )
}

export default CourseList
