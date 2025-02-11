'use client'

import { useSelector } from 'react-redux'
import { Controller, useFormContext } from 'react-hook-form'

import _ from 'lodash'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { GridKeyboardArrowRight, GridArrowDownwardIcon } from '@mui/x-data-grid'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const RoleMenuInformation = () => {
  const roleOptions = useSelector(state => state.data.roles)
  const nestedMenuItems = useSelector(state => state.data.nestedMenuItems);

  const methods = useFormContext()
  const { control, formState, getValues, reset, watch } = methods
  const { errors, isValid, dirtyFields } = formState

  console.log('nestedMenuItems: ', nestedMenuItems)

  return (
    <Card>
      <CardHeader title='RoleMenu Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name="role"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    filterSelectedOptions
                    options={roleOptions}
                    value={value ? roleOptions.find(role => value === role.id) : null}
                    getOptionLabel={option => `${option?.name}`}
                    onChange={(e, newValue) => {
                      onChange(newValue?.id)
                    }}
                    renderInput={params => {
                      return (
                        <CustomTextField
                          {...params}
                          placeholder="Select role"
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
                );
              }}
            />
          </Grid>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            {nestedMenuItems?.map(parentMenu => {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <Controller
                    name={`extend${parentMenu.id}`}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          {
                            parentMenu?.type === 'collapse' ? (
                              getValues()[`extend${parentMenu.id}`] ? (
                                <GridArrowDownwardIcon
                                  style={{ marginTop: '10px', marginRight: '5px', cursor: 'pointer' }}
                                  onClick={() =>
                                    reset({ ...getValues(), [`extend${parentMenu.id}`]: false })
                                  }
                                />
                              ) : (
                                <GridKeyboardArrowRight
                                  style={{ marginTop: '10px', marginRight: '5px', cursor: 'pointer' }}
                                  onClick={() =>
                                    reset({ ...getValues(), [`extend${parentMenu.id}`]: true })
                                  }
                                />
                              )
                            ) : <div style={{ marginTop: '10px', marginRight: '10px' }}></div>
                          }
                          <FormControlLabel
                            label={`${parentMenu?.translate}`}
                            control={
                              <>
                                <Checkbox
                                  {...field}
                                  color="primary"
                                  onChange={event => {
                                    let uniqMenuItemIds = _.uniq(getValues().menu_items);

                                    if (event.target.checked) {
                                      parentMenu.children?.map(menu_item => {
                                        uniqMenuItemIds.push(menu_item.id);
                                      });
                                      uniqMenuItemIds.push(parentMenu.id);

                                      reset({
                                        ...getValues(),
                                        menu_items: _.uniq(uniqMenuItemIds)
                                      });
                                    } else {
                                      let menuItemIdAll = _.uniq(getValues()?.menu_items);

                                      parentMenu.children?.map(menu_item => {
                                        let removableIndex = menuItemIdAll?.indexOf(
                                          menu_item?.id
                                        );

                                        if (removableIndex >= 0) {
                                          menuItemIdAll.splice(removableIndex, 1);
                                        }
                                      });
                                      menuItemIdAll.splice(
                                        menuItemIdAll?.indexOf(parentMenu.id),
                                        1
                                      );

                                      reset({
                                        ...getValues(),
                                        menu_items: _.uniq(menuItemIdAll)
                                      });
                                    }
                                  }}
                                  checked={
                                    getValues().menu_items?.find(
                                      id => id == parentMenu?.id
                                    ) || false
                                  }
                                />
                              </>
                            }
                          />
                        </div>
                      </FormControl>
                    )}
                  />

                  {parentMenu?.children && getValues()[`extend${parentMenu.id}`]
                    ? parentMenu.children.map(menu_item => (
                      <div
                        key={menu_item?.id}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: '10px'
                        }}
                      >
                        {menu_item?.children?.length == 0 && (
                          <Controller
                            name={`menu_item${menu_item?.id}`}
                            control={control}
                            render={({ field }) => (
                              <FormControl style={{ marginLeft: '55px' }}>
                                <FormControlLabel
                                  label={`${menu_item?.translate}`}
                                  control={
                                    <Checkbox
                                      {...field}
                                      color="primary"
                                      checked={
                                        getValues()?.menu_items?.includes(
                                          menu_item.id
                                        ) || false
                                      }
                                      onChange={event => {
                                        const menuItemId = menu_item.id;
                                        const menuItems =
                                          getValues()?.menu_items || [];
                                        const updatedMenuItems = event.target
                                          .checked
                                          ? [
                                            ...new Set([
                                              ...menuItems,
                                              menuItemId,
                                              parentMenu.id
                                            ])
                                          ]
                                          : menuItems.filter(
                                            id => id !== menuItemId
                                          );

                                        reset({
                                          ...getValues(),
                                          menu_items: updatedMenuItems
                                        });
                                      }}
                                    />
                                  }
                                />
                              </FormControl>
                            )}
                          />
                        )}
                        {menu_item?.children?.length > 0 && (
                          <div>
                            {/* Parent Menu */}
                            <Controller
                              name={`menu_item${menu_item?.id}`}
                              control={control}
                              render={({ field }) => (
                                <FormControl style={{ marginLeft: '55px' }}>
                                  <FormControlLabel
                                    label={`${menu_item?.translate}`}
                                    control={
                                      <Checkbox
                                        {...field}
                                        color="primary"
                                        checked={
                                          getValues()?.menu_items?.includes(
                                            menu_item.id
                                          ) || false
                                        }
                                        onChange={event => {
                                          const menuItemId = menu_item.id;
                                          const menuItems =
                                            getValues()?.menu_items || [];
                                          let updatedMenuItems = [...menuItems];

                                          if (event.target.checked) {
                                            // Select the parent menu and all its children
                                            updatedMenuItems = [
                                              ...new Set([
                                                ...menuItems,
                                                menuItemId,
                                                ...menu_item.children.map(
                                                  child => child.id
                                                )
                                              ])
                                            ];
                                          } else {
                                            // Deselect the parent menu and all its children
                                            updatedMenuItems = menuItems.filter(
                                              id =>
                                                ![
                                                  menuItemId,
                                                  ...menu_item.children.map(
                                                    child => child.id
                                                  )
                                                ].includes(id)
                                            );
                                          }

                                          reset({
                                            ...getValues(),
                                            menu_items: updatedMenuItems
                                          });
                                        }}
                                      />
                                    }
                                  />
                                </FormControl>
                              )}
                            />
                            {/* Child Menu */}
                            {menu_item?.children?.map(nested_menu_item => (
                              <div key={nested_menu_item?.id} style={{ marginLeft: '110px' }}>
                                <Controller
                                  name={`menu_item${nested_menu_item?.id}`}
                                  control={control}
                                  render={({ field }) => (
                                    <FormControl>
                                      <FormControlLabel
                                        label={`${nested_menu_item?.title}`}
                                        control={
                                          <Checkbox
                                            {...field}
                                            color="primary"
                                            checked={
                                              getValues()?.menu_items?.includes(
                                                nested_menu_item.id
                                              ) || false
                                            }
                                            onChange={event => {
                                              const nestedMenuItemId =
                                                nested_menu_item.id;
                                              const menuItems =
                                                getValues()?.menu_items ||
                                                [];
                                              let updatedMenuItems = [
                                                ...menuItems
                                              ];

                                              if (event.target.checked) {
                                                // Select the child menu and its parent (if not already selected)
                                                updatedMenuItems = [
                                                  ...new Set([
                                                    ...menuItems,
                                                    nestedMenuItemId,
                                                    menu_item.id
                                                  ])
                                                ];
                                              } else {
                                                // Deselect the child menu
                                                updatedMenuItems =
                                                  menuItems.filter(
                                                    id =>
                                                      id !==
                                                      nestedMenuItemId
                                                  );
                                              }

                                              reset({
                                                ...getValues(),
                                                menu_items: updatedMenuItems
                                              });
                                            }}
                                          />
                                        }
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                    : null}
                </div>
              );
            })}
          </div>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RoleMenuInformation
