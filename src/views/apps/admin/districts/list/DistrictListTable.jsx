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
import DistrictTableHead from './DistrictTableHead'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { rowsPerPage } from '@/commons/dropdownOptions'
import { BASE_URL } from '@/constants/constants'

const ListTable = (props) => {
  const {
    districtData,
    loading,
    totalPages,
    params,
    setParams,
    getAllDistrict,
    deleteDistrict,
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
        <CardHeader title='District List' />
        {/* header buttons */}
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <CustomTextField
            placeholder='Search'
            className='max-sm:is-full'
            defaultValue={params?.keyword}
            onChange={e => {
              if (e.target.value.length === 0) {
                getAllDistrict({ ...params, keyword: '' })
                setParams({ ...params, keyword: '' })
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                getAllDistrict({ ...params, keyword: e.target.value })
                setParams({ ...params, keyword: e.target.value })
              }
            }}
          />
          <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <Button
              variant='contained'
              component={Link}
              className='max-sm:is-full is-auto'
              href={getLocalizedUrl('/apps/admin/districts/new', locale)}
              startIcon={<i className='tabler-plus' />}
            >
              New District
            </Button>
          </div>
        </div>

        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              districtData?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    ref={componentRef}
                    id="table-to-xls"
                  >
                    <DistrictTableHead
                      order={order}
                      selectedRpmIds={selected}
                      rowCount={districtData.length}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        districtData,
                        [
                          o => {
                            switch (order.id) {
                              case 'name': {
                                return o.name;
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
                                <Link href={getLocalizedUrl(`/apps/admin/districts/${n.id}`, locale)}>{n.name}</Link>
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.state?.name}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                <div className='flex items-center'>
                                  <Link
                                    href={getLocalizedUrl(`/apps/admin/districts/${n.id}`, locale)}
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
                                        menuItemProps: { onClick: () => deleteDistrict(n.id) }
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
                    No district found!
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
