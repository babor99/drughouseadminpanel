'use client'

// React Imports
import { useState, useRef } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import _ from 'lodash'
import moment from 'moment-timezone'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Pagination from '@mui/material/Pagination'

// Component Imports
import TableFilters from './TableFilters'
import CourseTableHead from './CourseTableHead'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'
import MakeMicroCredentialDialog from './dialogs/MakeMicroCredentialDialog'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { rowsPerPage } from '@/commons/dropdownOptions'

const CourseListTable = (props) => {
  const {
    courseData,
    loading,
    totalPages,
    params,
    setParams,
    getAllCourse,
    publishCourse,
    makeCourseMicroCredential,
    selected,
    order,
    handleRequestSort,
    handleSelectAllClick,
    handleDeselect,
    handleCheck
  } = props

  let serialNumber = 1
  const router = useRouter()
  const { lang: locale } = useParams()

  const componentRef = useRef()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openMicroCredentialDialog, setOpenMicroCredentialDialog] = useState(false)
  const [dialogMicroCredentialCourses, setDialogMicroCredentialCourses] = useState({});

  // Function to open the microcredential-dialog with specific course data
  const handleOpenMicroCredentialDialog = (courseId) => {
    setDialogMicroCredentialCourses(prevState => ({
      ...prevState,
      [courseId]: courseData.find(item => item.id === courseId)
    }));
    setOpenMicroCredentialDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader title='My Courses' />
        <TableFilters
          params={params}
          setParams={setParams}
          getAllCourse={getAllCourse}
        />
        <Divider />

        {/* header buttons */}
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <CustomTextField
            placeholder='Search'
            className='max-sm:is-full'
            value={searchKeyword ?? ''}
            onChange={e => {
              setSearchKeyword(e.target.value)


              if (e.target.value.length === 0) {
                getAllCourse({ ...params, keyword: '' })
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getAllCourse({ ...params, keyword: e.target.value })
              }
            }}
          />
        </div>

        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              courseData?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    ref={componentRef}
                    id="table-to-xls"
                  >
                    <CourseTableHead
                      order={order}
                      selectedRpmIds={selected}
                      rowCount={courseData?.length}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        courseData,
                        [
                          o => {
                            switch (order.id) {
                              case 'region': {
                                return o.region ? o.region?.name : '';
                              }

                              default: {
                                return o[order.id];
                              }
                            }
                          }
                        ],
                        [order.direction]
                      )
                        .map(n => {
                          const isSelected = selected.indexOf(n.id) !== -1;

                          return (
                            <TableRow
                              className="h-10 cursor-pointer"
                              hover
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.id}
                              selected={isSelected}
                            >
                              <TableCell className="text-center" padding="none">
                                <Checkbox
                                  checked={isSelected}
                                  onClick={event => event.stopPropagation()}
                                  onChange={event => handleCheck(event, n.id)}
                                />
                              </TableCell>
                              <TableCell className="px-1" component="th" scope="row">
                                {serialNumber++}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <img src={n.thumbnail} height={50} width={50} />
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <Link href={getLocalizedUrl(`/apps/store/courses/${n.id}`, locale)}>{n.name}</Link>
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.category?.name}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.language}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.lectures}
                              </TableCell>
                              {/* <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.duration}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.rating}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.reviews}
                              </TableCell> */}
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.is_published ? <i className='tabler-checks text-success' /> : <i className='tabler-brand-xamarin text-error' />}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.is_microcredential ? <i className='tabler-checks text-success' /> : <i className='tabler-brand-xamarin text-error' />}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.has_caption ? <i className='tabler-checks text-success' /> : <i className='tabler-brand-xamarin text-error' />}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.is_premium ? <i className='tabler-checks text-success' /> : <i className='tabler-brand-xamarin text-error' />}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.is_best_rated ? <i className='tabler-checks text-success' /> : <i className='tabler-brand-xamarin text-error' />}
                              </TableCell>
                              <TableCell
                                className="px-1 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <div className='flex items-center'>
                                  <Link
                                    href={getLocalizedUrl(`/apps/store/courses/${n.id}`, locale)}
                                    title="View details"
                                  >
                                    <IconButton>
                                      <i className='tabler-eye text-textSecondary' />
                                    </IconButton>
                                  </Link>
                                  <div>
                                    <IconButton
                                      title='Micro-credential'
                                      onClick={() => handleOpenMicroCredentialDialog(n.id)}
                                    >
                                      <i className='tabler-password-user text-textSecondary' />
                                    </IconButton>
                                    {
                                      dialogMicroCredentialCourses[n.id] && (
                                        <MakeMicroCredentialDialog
                                          key={n.id}
                                          open={openMicroCredentialDialog}
                                          setOpen={setOpenMicroCredentialDialog}
                                          setDialogMicroCredentialCourses={setDialogMicroCredentialCourses}
                                          makeCourseMicroCredential={makeCourseMicroCredential}
                                          course={dialogMicroCredentialCourses?.[n.id]}
                                        />
                                      )
                                    }
                                  </div>
                                  <IconButton
                                    onClick={() => publishCourse(n.id)}
                                  >{
                                      n?.is_published ?
                                        <i className='tabler-lock-open text-textSecondary' title='Unpublish course' />
                                        :
                                        <i className='tabler-lock text-textSecondary' title='Publish course' />
                                    }
                                  </IconButton>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  className="flex flex-1 items-center justify-center h-full"
                >
                  <Typography color="textSecondary" variant="h5">
                    No course found!
                  </Typography>
                </div>
              )
            )
          }
        </div>

        {/* bottom pagination */}
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

export default CourseListTable
