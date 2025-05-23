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
import ProductTableHead from './ProductTableHead'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { rowsPerPage } from '@/commons/dropdownOptions'

const ProductListTable = (props) => {
  const {
    productData,
    loading,
    totalPages,
    params,
    setParams,
    getAllProduct,
    deleteProduct,
    selected,
    order,
    handleRequestSort,
    handleSelectAllClick,
    handleDeselect,
    handleCheck
  } = props

  const { lang: locale } = useParams()
  const router = useRouter()

  const [searchKeyword, setSearchKeyword] = useState('')
  const componentRef = useRef()

  let serialNumber = 1

  return (
    <>
      <Card>
        <div className='flex items-center justify-between gap-4 px-5 py-3'>
          <div>
            <Typography variant='h6'>Low Stock Products</Typography>
          </div>
          {/* header buttons */}
          <div>
            <CustomTextField
              placeholder='Search'
              className='max-sm:is-full'
              value={searchKeyword ?? ''}
              onChange={e => {
                setSearchKeyword(e.target.value)

                if (e.target.value.length === 0) {
                  getAllProduct({ ...params, keyword: '' })
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getAllProduct({ ...params, keyword: e.target.value })
                }
              }}
            />
          </div>
        </div>
        
        {/* table */}
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              productData?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    ref={componentRef}
                    id="table-to-xls"
                  >
                    <ProductTableHead
                      order={order}
                      selectedAdminIds={selected}
                      rowCount={productData?.length}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        productData,
                        [
                          o => {
                            switch (order.id) {
                              case 'name': {
                                return o.name;
                              }
                              case 'quantity': {
                                return o.quantity;
                              }
                              case 'manufacturer': {
                                return o.manufacturer ? o.manufacturer?.name : '';
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
                                <Link href={getLocalizedUrl(`/apps/store/products/${n.id}`, locale)}>{n.name}</Link>
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.product_type?.name}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.quantity}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.unit_price}
                              </TableCell>
                              <TableCell
                                className="px-2 md:px-4 whitespace-nowrap"
                                component="th"
                                scope="row"
                              >
                                {n.manufacturer?.name}
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
                    No product found!
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

export default ProductListTable
