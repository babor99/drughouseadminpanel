'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

// MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import { CREATE_SECTION, UPDATE_SECTION, DELETE_SECTION } from '@/constants/constants'

const SectionsInformation = ({ sections }) => {
  const { schoolId, lang: locale } = useParams()

  const accessToken = useSelector(state => state.authentication.accessToken)
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([...sections])
  }, [sections])

  function handleAddNewSection() {
    try {
      const data = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ school: schoolId, name: '' })
      };

      fetch(`${CREATE_SECTION}`, data)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(`Create failed with status code ${response.status}`)
        })
        .then(data => {
          if (data) {
            setRows(data);
          }


        })
        .catch(error => {
          console.error('Adding employee failed:', error);
        });
    } catch (error) {
      console.error('Error in handleAddNewSection:', error);
    }
  }

  const handleDeleteSectionItem = params => {
    fetch(`${DELETE_SECTION}${params?.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`Update failed with status code ${response.status}`)
      })
      .then(data => {
        setRows(data);

      })
      .catch(error => {
        console.error('Error deleting section:', error);
      });
  };

  const handleEditCellChange = params => {
    try {
      const data = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(params)
      };

      fetch(`${UPDATE_SECTION}${params?.id}`, data)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(`Update failed with status code ${response.status}`)
        })
        .then(data => {
          setRows(data);

        })
        .catch(error => {
          console.error('Update section failed:', error);
        });
    } catch (error) {
      console.error('Error in handleEditCellChange:', error);
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      editable: false,
      sortable: true,
      width: 350,
      disableFilter: true,
      valueGetter: value => `${value || ''}`,
      renderCell: params => {
        return (
          <CustomTextField
            fullWidth
            placeholder="Enter name"
            defaultValue={params?.row?.name}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleEditCellChange({ ...params.row, name: event?.target?.value })
              }
            }}
          />
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 100,
      disableFilter: true,
      renderCell: params => {
        return (
          <IconButton
            onClick={() => handleDeleteSectionItem(params.row)}
          >
            <i className='tabler-trash text-danger' />
          </IconButton>
        )
      }
    }
  ];

  return (
    <Card>
      <CardHeader title="Sections" />
      <CardContent>
        <div className='flex flex-wrap justify-start mb-3'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={handleAddNewSection}
          >
            New Section
          </Button>
        </div>
        <div>
          <DataGrid
            style={{ fontSize: '11px' }}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            processRowUpdate={handleEditCellChange}
            onProcessRowUpdateError={() => { }}
          />
        </div>
      </CardContent>
    </Card >
  )
}

export default SectionsInformation
