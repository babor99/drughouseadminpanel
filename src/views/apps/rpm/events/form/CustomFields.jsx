'use client'

import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import { isNumber } from '@/commons/utils'

const CustomFields = ({ fields, setFields }) => {
  const [fieldType, setFieldType] = useState('')

  const addNewField = () => {
    if (fieldType) {
      if (['MCQ', 'TF'].includes(fieldType)) {
        setFields(prevFields => ([...prevFields,
        {
          field_title: '',
          field_type: fieldType,
          correct_answer: '',
          options_count: 0,
          options: []
        }
        ]))
      } else {
        setFields(prevFields => ([...prevFields,
        {
          field_title: '',
          field_type: fieldType,
          correct_answer: '',
        }
        ]))
      }
    }
  }

  const removeField = (index) => {
    const newFields = fields.filter((field, idx) => index !== idx)

    setFields(newFields)
  }

  const setFieldTitle = (index, value) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index ? { ...field, field_title: value } : field
    );

    setFields(updatedFields);
  }

  const setFieldAnswer = (index, value) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index ? { ...field, correct_answer: value } : field
    );

    setFields(updatedFields);
  }

  const setFieldOptionsCount = (index, count) => {
    if (count && isNumber(count)) {
      const optionsArray = []

      for (let i = 1; i <= count; i++) {
        optionsArray.push({ id: i, value: '' })
      }

      const updatedFields = fields.map((field, idx) =>
        idx === index ? { ...field, options_count: count, options: optionsArray } : field
      );

      setFields(updatedFields);
    }
  }

  const setFieldOptionValue = (fIndex, oIndex, value) => {
    console.log('--------setFieldOptionValue called-------')

    const updatedFields = fields.map((field, idx) =>
      idx === fIndex ?
        {
          ...field,
          options: field.options.map((option, indx) => indx === oIndex ? { ...option, value: value } : option)
        }
        :
        field
    );

    setFields(updatedFields);
  }

  return (
    <Card className='mt-5'>
      <CardHeader title='Custom Fields' />
      <CardContent>
        <div>
          {
            fields.map((field, fIndex) => (
              <div key={fIndex} className='border p-5 mb-5'>
                <div className='flex items-center justify-between'>
                  <Typography variant='h5' className='mb-2'>Field{fIndex + 1} ({field?.field_type})</Typography>
                  <Button variant='contained' color='error' size='sm' className='p-1' onClick={() => removeField(fIndex)}>Remove</Button>
                </div>
                <Grid container spacing={5}>
                  {
                    field?.field_type !== 'FITB' &&
                    <Grid item xs={12}>
                      <CustomTextField
                        fullWidth
                        label='Question or field title'
                        defaultValue={field?.field_title}
                        onChange={e => setFieldTitle(fIndex, e.target.value)}
                      />
                    </Grid>
                  }
                  {
                    field?.field_type === 'FITB' &&
                    <>
                      <Grid item xs={12}>
                        <CustomTextField
                          fullWidth
                          className='mt-3'
                          label="Field title/ question. (Demo: The velocity of rockfall was _______ km/hour.)"
                          defaultValue={field?.field_title}
                          onChange={e => setFieldTitle(fIndex, e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTextField
                          fullWidth
                          className='mt-3'
                          label="Enter correct answer"
                          defaultValue={field?.correct_answer}
                          onChange={e => setFieldAnswer(fIndex, e.target.value)}
                        />
                      </Grid>
                    </>
                  }
                  {
                    ['MCQ', 'TF'].includes(field?.field_type) &&
                    <Grid item xs={12}>
                      <CustomTextField
                        fullWidth
                        className='mt-3'
                        label='Number of options'
                        type='number'
                        defaultValue={field?.options_count}
                        onChange={e => setFieldOptionsCount(fIndex, e.target.value)}
                      />
                    </Grid>
                  }
                  {
                    field?.options && field?.options.map((option, oIndex) => (
                      <Grid key={oIndex} item xs={12}>
                        <Grid container gap={0}>
                          <Grid item xs={12}>
                            <div className="flex items-center justify-center w-full my-0">
                              <CustomTextField
                                fullWidth
                                label={`Option ${oIndex + 1}`}
                                defaultValue={option.value}
                                onChange={e => setFieldOptionValue(fIndex, oIndex, e.target.value)}
                              />
                              <FormControlLabel
                                className="border-2 rounded-md mt-5 ms-0 mr-0"
                                control={
                                  <Radio
                                    checked={field.correct_answer == option.id}
                                    onChange={() => setFieldAnswer(fIndex, option.id)}
                                    value={option.id}
                                    name="option-radio"
                                    color="primary"
                                  />
                                }
                                label=""
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </div>
            ))
          }
        </div>
        <div>
          <Grid container gap={0}>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <CustomTextField
                  select
                  fullWidth
                  label='Field type*'
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value)}
                >
                  <MenuItem value="TEXT">
                    Text input
                  </MenuItem>
                  <MenuItem value="FILE">
                    File input
                  </MenuItem>
                  <MenuItem value="MCQ">
                    Multiple choice
                  </MenuItem>
                  <MenuItem value="TF">
                    True/ False
                  </MenuItem>
                  <MenuItem value="FITB">
                    Fill in the blanks
                  </MenuItem>
                </CustomTextField>
                <div className="border-2 rounded-md bg-primary mt-5 ms-1 mr-0">
                  <IconButton onClick={addNewField}>
                    <i className='tabler-plus' title='Add field' />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card >
  )
}

export default CustomFields
