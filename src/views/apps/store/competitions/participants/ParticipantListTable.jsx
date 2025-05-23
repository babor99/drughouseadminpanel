'use client'

// React Imports
import { useState, useRef } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import _ from 'lodash'
import moment from 'moment-timezone'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Pagination from '@mui/material/Pagination'

// Component Imports
import ParticipantTableHead from './ParticipantTableHead'
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'

import { GET_AWS_PRESIGNED_URL } from '@/constants/constants'

// Util Imports
import { rowsPerPage } from '@/commons/dropdownOptions'

const ListTable = (props) => {
  const accessToken = useSelector(state => state.authentication.accessToken)
  const csrfToken = useSelector(state => state.authentication.csrfToken)

  const {
    participantData,
    currentCompetition,
    loading,
    downloadCsvloading,
    totalPages,
    params,
    setParams,
    getAllParticipant,
    downloadAllParticipant,
    selected,
    order,
    handleRequestSort,
    handleSelectAllClick,
    handleDeselect,
    handleCheck
  } = props

  const [downloadFileLoading, setDownloadFileLoading] = useState(false)

  let serialNumber = 1
  const router = useRouter()
  const { lang: locale } = useParams()

  const [searchKeyword, setSearchKeyword] = useState('')
  const componentRef = useRef()

  const downloadFile = async fileUrl => {
    const authHeaders = {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      }
    };

    try {
      setDownloadFileLoading(true)

      const fileKey = fileUrl.split('amazonaws.com/')?.[fileUrl.split('amazonaws.com/')?.length - 1]
      const response = await fetch(`${GET_AWS_PRESIGNED_URL}?file_key=${fileKey}&expiry=300`, authHeaders); // 300 seconds = 5 minutes

      if (!response.ok) {
        throw new Error(`File download failed with status code  ${response.status}`);
      }

      const data = await response.json();
      const url = data?.url;

      if (url) {
        const fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];

        const link = document.createElement('a');

        link.href = url;

        // Fetch the actual file to determine the content type
        const fileResponse = await fetch(url);
        const blob = await fileResponse.blob();

        // Create a URL for the blob and set the download attribute
        const blobUrl = window.URL.createObjectURL(blob);

        link.href = blobUrl;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
        toast.success('File download success!')
        setDownloadFileLoading(false)
      } else {
        toast.error('Oops! File download failed!')
        setDownloadFileLoading(false)
      }
    } catch (error) {
      toast.error('Oops! File download failed!')
      setDownloadFileLoading(false)
      console.error('Error downloading file:', error);
    }
  }

  return (
    <>
      <Card>
        <CardHeader title={`Participant List (${currentCompetition?.name})`} />
        {/* header buttons */}
        <div className='flex justify-between gap-4 p-6'>
          <CustomTextField
            placeholder='Search'
            className='max-sm:is-full'
            value={searchKeyword ?? ''}
            onChange={e => {
              setSearchKeyword(e.target.value)

              if (e.target.value.length === 0) {
                getAllParticipant({ ...params, keyword: '' })
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getAllParticipant({ ...params, keyword: e.target.value })
              }
            }}
          />
          <CustomIconButton
            className='px-3'
            variant='contained'
            size='small'
            color='primary'
            title='Download CSV file'
            disabled={downloadCsvloading}
            onClick={downloadAllParticipant}
          >
            <i className='tabler-download' /> CSV
          </CustomIconButton>
        </div>

        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              participantData?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    ref={componentRef}
                    id="table-to-xls"
                  >
                    <ParticipantTableHead
                      order={order}
                      selectedRpmIds={selected}
                      rowCount={participantData.length}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        participantData,
                        [
                          o => {
                            switch (order.id) {
                              case 'name': {
                                return o.name;
                              }

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
                                  onClick={participant => participant.stopPropagation()}
                                  onChange={participant => handleCheck(participant, n.id)}
                                />
                              </TableCell>
                              <TableCell className="px-2 md:px-4" component="th" scope="row">
                                {serialNumber++}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.user?.name} {' '} {n.user?.last_name}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.user?.email}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.student?.school?.state?.name}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.student?.school?.name}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n?.created_at && moment(n?.created_at).format('LLL')}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {
                                  n?.competition_enrollment_answers?.map((fieldValue, index) => {
                                    if (fieldValue?.file) return <div key={index} className='flex items-center'>
                                      <span >{fieldValue?.file.split('?')?.[0]?.split('CompetitionCustomFieldValueFiles/')?.[1]}</span>
                                      <CustomIconButton
                                        className='ms-3 p-1'
                                        variant='contained'
                                        color='primary'
                                        disabled={downloadFileLoading}
                                        onClick={() => {
                                          fieldValue?.file && downloadFile(fieldValue?.file?.split('?')?.[0])
                                        }}
                                      >
                                        <i className='tabler-file-download' />
                                      </CustomIconButton>
                                    </div>
                                  })
                                }
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
                    No participants found!
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

export default ListTable
