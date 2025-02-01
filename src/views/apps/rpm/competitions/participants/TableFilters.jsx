import { useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = (props) => {
  const {
    params,
    setParams,
    getAllInstructor,
  } = props

  const stateOptions = useSelector(state => state.data.states)
  const regionOptions = useSelector(state => state.data.regions)

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            options={stateOptions}
            value={params?.state ? stateOptions.find(state => params?.state === state.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(participant, newValue) => {


              if (newValue) {
                setParams(prevParams => {
                  return { ...prevParams, state: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, state: '', region: '', assigned_schools: [] }
                })
                getAllInstructor({ ...params, state: '', region: '', assigned_schools: [] })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select state"
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
        <Grid item xs={12} sm={6}>
          <Autocomplete
            filterSelectedOptions
            options={regionOptions}
            value={params?.region ? regionOptions.find(region => params?.region === region.id) : null}
            getOptionLabel={option => `${option?.name}`}
            onChange={(participant, newValue) => {
              if (newValue) {

                setParams(prevParams => {
                  return { ...prevParams, region: newValue.id }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, region: '', assigned_schools: [] }
                })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select region"
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
            disabled={!params?.state}
            onClick={() => getAllInstructor(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
