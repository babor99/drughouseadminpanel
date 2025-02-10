'use client'

import { useSelector } from 'react-redux'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash';

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const RoleInformation = () => {
  const permissions = useSelector(state => state.data.permissions)

  const methods = useFormContext()
  const { control, formState, getValues, watch, reset } = methods
  const { errors, isValid, dirtyFields } = formState

  const name = watch('name');
	const permissionss = watch('permissions');

  return (
    <Card>
      <CardHeader title='Role Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <CustomTextField
                    {...field}
                    fullWidth
                    id="name"
                    variant="outlined"
                    label="Role Name"
                    placeholder="Keraniganj"
                    error={!!errors.name || !field.value}
                    helperText={errors?.name?.message}
                    InputLabelProps={field.value && { shrink: true }}

                  // onKeyDown={handleSubmitOnKeyDownEnter}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Controller
                name={'all'}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label={`ALL`}
                      control={
                        <Checkbox
                          {...field}
                          color="primary"
                          required={false}
                          onChange={event => {
                            field.onChange(event);

                            let uniqPermissinsIds = _.uniq(getValues()?.permissions);

                            if (event.target.checked) {
                              permissions?.map((permission, indx) => {
                                uniqPermissinsIds.push(permission.id);
                              });
                              reset({ ...getValues(), permissions: _.uniq(uniqPermissinsIds) });
                            } else {
                              reset({ ...getValues(), permissions: [] });
                            }
                          }}
                          checked={field.value ? field.value : false}
                        />
                      }
                    />
                  </FormControl>
                )}
              />

              {permissions?.map(permission => {
                return (
                  <Controller
                    key={permission?.id}
                    name={`permission${permission?.id}`}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <FormControlLabel
                          label={`${permission.name}`}
                          control={
                            <Checkbox
                              {...field}
                              required={false}
                              color="primary"
                              // onChange={(event) => handleOnChange(event)}
                              checked={
                                getValues()?.permissions?.find(id => id == permission?.id) || false
                              }
                              onChange={event => {
                                if (event.target.checked) {
                                  const unicPermissionIds = _.uniq(getValues()?.permissions);
                                  reset({
                                    ...getValues(),
                                    permissions: [...unicPermissionIds, permission?.id]
                                  });
                                } else {
                                  let removableId = getValues()?.permissions?.indexOf(
                                    permission?.id
                                  );
                                  let permissionIdAll = _.uniq(getValues()?.permissions);
                                  permissionIdAll.splice(removableId, 1);
                                  reset({ ...getValues(), permissions: permissionIdAll });
                                }
                              }}
                            />
                          }
                        />
                      </FormControl>
                    )}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RoleInformation
