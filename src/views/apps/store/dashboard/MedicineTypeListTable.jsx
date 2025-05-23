'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell';

const rows = [
  {
    id: 'sl',
    align: 'left',
    disablePadding: false,
    label: 'Sl.',
    sort: true
  },
  {
    id: 'product_type',
    align: 'left',
    disablePadding: false,
    label: 'Product Type',
    sort: true
  },
  {
    id: 'quantity',
    align: 'left',
    disablePadding: false,
    label: 'Quantity',
    sort: true
  },
]

const MedicineTypeListTable = ({ productTypes, loading }) => {

  // const componentRef = useRef()

  let serialNumber = 1

  return (
    <>
      <Card>
        <div className='overflow-x-auto'>
          {
            loading ? '' : (
              productTypes?.length > 0 ? (
                <div id="downloadPage">
                  <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                    // ref={componentRef}
                    id="table-to-xls"
                  >
                    <TableHead>
                      <TableRow className="h-12">
                        {rows.map(row => {
                          return (
                            <TableCell
                              className="px-2 md:px-4 whitespace-nowrap"
                              key={row.id}
                              align={row.align}
                              padding={row.disablePadding ? 'none' : 'default'}
                            >
                              {row.label}
                            </TableCell>
                          );
                        }, this)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        productTypes?.map(n => (
                          <TableRow
                            className="h-10 cursor-pointer"
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={n.id}
                          >
                            <TableCell className="px-2 md:px-4" component="th" scope="row">
                              {serialNumber++}
                            </TableCell>
                            <TableCell
                              className="px-2 md:px-4 whitespace-nowrap"
                              component="th"
                              scope="row"
                            >
                              {n?.product_type_name} ({n?.total_types_count})
                            </TableCell>
                            <TableCell
                              className="px-2 md:px-4 whitespace-nowrap"
                              component="th"
                              scope="row"
                            >
                              {n?.total_quantity}
                            </TableCell>
                          </TableRow>
                        ))
                      }
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
                    No data found!
                  </Typography>
                </div>
              )
            )
          }
        </div>
      </Card>
    </>
  )
}

export default MedicineTypeListTable
