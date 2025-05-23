import { useSelector } from 'react-redux'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = (props) => {
  const branchOptions = useSelector(state => state.data.branchs || [])
  const orderStatusOptions = useSelector(state => state.data.orderStatuss || [])
  const paymentMethodOptions = useSelector(state => state.data.paymentMethods || [])
  
  const {
    params,
    setParams,
    getAllOrder,
  } = props

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={branchOptions}
            value={params?.branch ? branchOptions.find(branch => params?.branch === branch.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, branch: newValue.id })
              } else {
                getAllOrder({ ...params, branch: ''})
                setParams({ ...params, branch: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select branch"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
            getOptionKey={option => option?.id}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={orderStatusOptions}
            value={params?.status ? orderStatusOptions.find(os => params?.status === os.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, status: newValue.id })
              } else {
                getAllOrder({ ...params, status: ''})
                setParams({ ...params, status: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select order-status"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
            getOptionKey={option => option?.id}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            filterSelectedOptions
            options={paymentMethodOptions}
            value={params?.payment_method ? paymentMethodOptions.find(pm => params?.payment_method === pm.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValue) => {
              if (newValue) {
                setParams({ ...params, payment_method: newValue.id })
              } else {
                getAllOrder({ ...params, payment_method: ''})
                setParams({ ...params, payment_method: ''})
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select payment-method"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
            getOptionKey={option => option?.id}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant='contained'
            color='secondary'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-filter' />}
            disabled={!params?.branch && !params?.status && !params?.payment_method}
            onClick={() => getAllOrder(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
