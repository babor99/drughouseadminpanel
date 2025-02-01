'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { Divider } from '@mui/material'

// Styled component for Accordion component
export const Accordion = styled(MuiAccordion)({
  margin: '0 !important',
  boxShadow: 'none !important',
  border: '1px solid var(--mui-palette-divider) !important',
  borderRadius: '0 !important',
  overflow: 'hidden',
  background: 'none',
  '&:not(:last-of-type)': {
    borderBottom: '0 !important'
  },
  '&:before': {
    display: 'none'
  },
  '&:first-of-type': {
    borderTopLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderTopRightRadius: 'var(--mui-shape-borderRadius) !important'
  },
  '&:last-of-type': {
    borderBottomLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderBottomRightRadius: 'var(--mui-shape-borderRadius) !important'
  }
})

// Styled component for AccordionSummary component
export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 6),
  transition: 'none',
  backgroundColor: 'var(--mui-palette-action-hover)',
  borderBlockEnd: '0 !important',
  '&.Mui-expanded': {
    borderBlockEnd: '1px solid var(--mui-palette-divider) !important'
  }
}))

// Styled component for AccordionDetails component
export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(4, 3)} !important`,
  backgroundColor: 'var(--mui-palette-background-paper)'
}))

const Sidebar = ({ sections }) => {
  const [expanded, setExpanded] = useState(0)

  return (
    <Card>
      <div className="p-2">
        <Typography variant='h5'>Contents</Typography>
      </div>
      <Divider className='mb-2' />
      <div>
        {
          sections?.length > 0 ?
            sections?.map((section, index) => (
              <Accordion
                key={index}
                disabled
              >
                <AccordionSummary
                  id='customized-panel-header-1'
                  expandIcon={<i className='tabler-chevron-right text-textSecondary' />}
                  aria-controls={'sd'}
                >
                  <Typography variant='h5'>{section?.name}</Typography>
                </AccordionSummary>
              </Accordion>
            )
            )
            :
            <div className="flex items-center justify-center my-5">
              <Typography variant='h5'>No contents found</Typography>
            </div>
        }
      </div>
    </Card>
  )
}

export default Sidebar
