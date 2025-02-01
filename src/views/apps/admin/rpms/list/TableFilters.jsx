// React Imports
import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

// MUI Imports
import { Autocomplete } from '@mui/material'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = (props) => {
  const {
    params,
    setParams,
    getAllRPM,
  } = props

  const regionOptions = useSelector(state => state.data.regions)
  const schoolOptions = useSelector(state => state.data.schools)
  const [filteredSchoolOptions, setFilterSchoolOptions] = useState([])

  useEffect(() => {
    const newSchoolOptions = schoolOptions.filter((school) => params?.assigned_regions?.includes(school?.region))

    setFilterSchoolOptions([...newSchoolOptions])
  }, [params?.assigned_regions])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={regionOptions}
            value={params?.assigned_regions ? regionOptions.filter(region => params?.assigned_regions?.includes(region.id)) : []}
            getOptionLabel={option => `${option?.name}`}
            onChange={(event, newValues) => {
              if (newValues.length) {
                const newIds = newValues?.map(obj => obj?.id)

                setParams(prevParams => {
                  return { ...prevParams, assigned_regions: newIds }
                })
              } else {
                setParams(prevParams => {
                  return { ...prevParams, assigned_regions: [], assigned_schools: [] }
                })
                getAllRPM({ ...params, assigned_regions: [], assigned_schools: [] })
              }
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select regions"
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
        <Grid item xs={12} sm={8}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={filteredSchoolOptions}
            value={params.assigned_schools ? filteredSchoolOptions.filter(school => params.assigned_schools?.includes(school?.id)) : []}
            getOptionKey={option => option?.id}
            getOptionLabel={option => `${option.name}`}
            onChange={(event, newValues) => {
              const selectedValues = newValues.map(option => option.id);

              setParams(prevParams => {
                return { ...prevParams, assigned_schools: selectedValues }
              });
            }}
            renderInput={params => {
              return (
                <CustomTextField
                  {...params}
                  placeholder="Select assigned schools"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant='contained'
            color='secondary'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-filter' />}
            disabled={!params?.assigned_regions?.length}
            onClick={() => getAllRPM(params)}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
