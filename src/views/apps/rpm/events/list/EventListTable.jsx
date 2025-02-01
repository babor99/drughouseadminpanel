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
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Pagination from '@mui/material/Pagination'

// Component Imports
import EventTableHead from './EventTableHead'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { rowsPerPage } from '@/commons/dropdownOptions'

const ListTable = (props) => {
  const {
    eventData,
    loading,
    totalPages,
    params,
    setParams,
    getAllEvent,
    deleteEvent,
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

  const [searchKeyword, setSearchKeyword] = useState('')
  const componentRef = useRef()

  return (
    <>
      <Card>
        <CardHeader title='Events List' />
        {/* header buttons */}
        <div className='flex flex-wrap justify-between gap-4 p-6'>
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
          <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <Button
              variant='contained'
              component={Link}
              className='max-sm:is-full is-auto'
              href={getLocalizedUrl('/apps/rpm/events/new', locale)}
              startIcon={<i className='tabler-plus' />}
            >
              New Event
            </Button>
          </div>
        </div>

        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              eventData?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    ref={componentRef}
                    id="table-to-xls"
                  >
                    <EventTableHead
                      order={order}
                      selectedRpmIds={selected}
                      rowCount={eventData.length}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        eventData,
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
                                  onClick={event => event.stopPropagation()}
                                  onChange={event => handleCheck(event, n.id)}
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
                                <img src={n.photo} height={50} width={50} />
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <Link href={getLocalizedUrl(`/apps/rpm/events/${n.id}`, locale)}>{n.name}</Link>
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n?.date && moment(n?.date).format('LL')} {' | '}
                                {n?.time && moment(n?.time, 'HH:mm').format('LT')}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.address}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <span className='flex items-center justify-start'>
                                  <IconButton className='mr-2'>
                                    <Link href={getLocalizedUrl(`/apps/rpm/events/${n.id}/participants`, locale)}>
                                      <i className='tabler-eye' title='Veiw participants' />
                                    </Link>
                                  </IconButton>
                                  <p>{n.participants}</p>
                                </span>
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <div className='flex items-center'>
                                  <Link
                                    href={getLocalizedUrl(`/apps/rpm/events/${n.id}`, locale)}
                                  >
                                    <IconButton>
                                      <i className='tabler-edit text-textSecondary' />
                                    </IconButton>
                                  </Link>
                                  <OptionMenu
                                    iconButtonProps={{ size: 'medium' }}
                                    iconClassName='text-textSecondary'
                                    options={[
                                      {
                                        text: 'Delete',
                                        icon: 'tabler-trash',
                                        menuItemProps: { onClick: () => deleteEvent(n.id) }
                                      },
                                    ]}
                                  />
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
                    No event found!
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
