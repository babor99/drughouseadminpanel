'use client'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { Autocomplete, InputAdornment, IconButton, Icon } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import { BASE_URL } from '@/constants/constants'

const OrderInformation = ({ orderItems, setOrderItems }) => {
  const productOptions = useSelector(state => state.data.products || [])
  const orderStatusOptions = useSelector(state => state.data.orderStatuss || [])
  const paymentMethodOptions = useSelector(state => state.data.paymentMethods || [])

  let orderTotal = 0
  const { orderId } = useParams()

  const methods = useFormContext()
  const { control, formState, getValues, watch, reset } = methods
  const { errors, isValid, dirtyFields } = formState

  const addNewItem = () => {
    const productId = watch('product')
    const quantity = watch('quantity')

    if (productId && quantity) {
      const productItem = productOptions?.find(product => productId === product?.id)

      setOrderItems(prevItems => {
        const existingIndex = prevItems.findIndex(item => item.product_id === productId)

        if (existingIndex !== -1) {
          return prevItems.map((item, index) => index === existingIndex ?
            {
              product_id: productId,
              product_name: productItem?.name,
              unit_price: productItem?.unit_price,
              available_qty: productItem?.quantity,
              quantity: quantity,
            }
            :
            item
          )
        } else {
          return [...prevItems, {
            product_id: productId,
            product_name: productItem?.name,
            unit_price: productItem?.unit_price,
            available_qty: productItem?.quantity,
            quantity: quantity,
          }]
        }
      })

      reset({ product: null, quantity: '' })
    }
  }

  const removeItem = (index) => {
    const newOrderItems = orderItems.filter((item, idx) => index !== idx)

    setOrderItems(newOrderItems)
  }

  return (
    <Card>
      <Grid container>
        <Grid item sx={12} md={8}>
          <Card>
            <CardHeader className='text-center pb-0 my-0' title='Order Details' />
            <CardContent>
              <Grid container spacing={6} className='mbe-6'>
                <Grid item xs={12}>
                  <Typography variant='h6' className='font-bold'>Order Items:</Typography>
                  {
                    orderItems?.length > 0 && (
                      <div>
                        <Divider className='my-2' />
                        <table class="table-auto text-left w-full">
                          <thead>
                            <tr>
                              <th>Serial</th>
                              <th>Item</th>
                              <th>Unit Price</th>
                              <th>Quantity</th>
                              <th>Line Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              orderItems?.map((item, index) => {
                                orderTotal += item?.unit_price * item?.quantity
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.product_name}</td>
                                    <td>{item?.unit_price}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{(item?.unit_price * item?.quantity).toFixed(2)}</td>
                                    <td>
                                      <IconButton onClick={() => removeItem(index)}>
                                        <i className='tabler-trash' title='remove' />
                                      </IconButton>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className='font-bold'>Total</td>
                              <td className='font-bold'>{orderTotal?.toFixed(2)}</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                  <Divider className='my-2' />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Controller
                        name="product"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            filterSelectedOptions
                            options={productOptions}
                            value={value ? productOptions.find(product => product?.id === value) : null}
                            getOptionKey={option => option?.id}
                            getOptionLabel={option => `${option.name} [price=${option?.unit_price};qty=${option?.quantity}]`}
                            onChange={(event, newValue) => {
                              onChange(newValue?.id);
                            }}
                            renderInput={params => {
                              return (
                                <CustomTextField
                                  {...params}
                                  label="Product"
                                  placeholder="Select product"
                                  variant="outlined"
                                  size="small"
                                  error={!!errors.product || !value}
                                  helperText={errors?.product?.message}
                                  InputLabelProps={value && { shrink: true }}
                                />
                              );
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => {
                          return (
                            <CustomTextField
                              {...field}
                              fullWidth
                              id="quantity"
                              variant="outlined"
                              label="Qty"
                              placeholder="3"
                              helperText={errors?.quantity?.message}
                              InputLabelProps={field.value && { shrink: true }}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <div className="border-2 rounded-md bg-primary mt-4 ms-1 mr-0">
                        <IconButton className='w-full' onClick={addNewItem}>
                          <i className='tabler-plus' title='Add item' />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={12} md={4}>
          <Card>
            <CardHeader className='text-center' title='Customer Information' />
            <CardContent>
              <Grid container spacing={6} className='mbe-6'>
                <Grid item xs={12}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        filterSelectedOptions
                        options={orderStatusOptions}
                        value={value ? orderStatusOptions.find(status => status?.id === value) : null}
                        getOptionKey={option => option?.id}
                        getOptionLabel={option => `${option.name}`}
                        onChange={(event, newValue) => {
                          onChange(newValue?.id);
                        }}
                        renderInput={params => {
                          return (
                            <CustomTextField
                              {...params}
                              label="Order Status"
                              placeholder="Select status"
                              variant="outlined"
                              size="small"
                              error={!!errors.status || !value}
                              helperText={errors?.status?.message}
                              InputLabelProps={value && { shrink: true }}
                            />
                          );
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="payment_method"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        filterSelectedOptions
                        options={paymentMethodOptions}
                        value={value ? paymentMethodOptions.find(payment_method => payment_method?.id === value) : null}
                        getOptionKey={option => option?.id}
                        getOptionLabel={option => `${option.name}`}
                        onChange={(event, newValue) => {
                          onChange(newValue?.id);
                        }}
                        renderInput={params => {
                          return (
                            <CustomTextField
                              {...params}
                              label="Payment Method"
                              placeholder="Select payment-method"
                              variant="outlined"
                              size="small"
                              error={!!errors.payment_method || !value}
                              helperText={errors?.payment_method?.message}
                              InputLabelProps={value && { shrink: true }}
                            />
                          );
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="customer_name"
                    control={control}
                    render={({ field }) => {
                      return (
                        <CustomTextField
                          {...field}
                          fullWidth
                          id="customer_name"
                          variant="outlined"
                          label="Customer Name"
                          placeholder="John Doe"
                          error={!!errors.customer_name || !field.value}
                          helperText={errors?.customer_name?.message}
                          InputLabelProps={field.value && { shrink: true }}

                        // onKeyDown={handleSubmitOnKeyDownEnter}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="customer_phone"
                    control={control}
                    render={({ field }) => {
                      return (
                        <CustomTextField
                          {...field}
                          fullWidth
                          id="customer_phone"
                          variant="outlined"
                          label="Customer Phone"
                          placeholder="+8801254658512"
                          error={!!errors.customer_phone || !field.value}
                          helperText={errors?.customer_phone?.message}
                          InputLabelProps={field.value && { shrink: true }}

                        // onKeyDown={handleSubmitOnKeyDownEnter}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="customer_email"
                    control={control}
                    render={({ field }) => {
                      return (
                        <CustomTextField
                          {...field}
                          fullWidth
                          id="customer_email"
                          type="email"
                          variant="outlined"
                          label="Customer Email"
                          placeholder="johndoe123@gmail.com"
                          error={!!errors.customer_email || !field.value}
                          helperText={errors?.customer_email?.message}
                          InputLabelProps={field.value && { shrink: true }}

                        // onKeyDown={handleSubmitOnKeyDownEnter}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card >
  )
}

export default OrderInformation
