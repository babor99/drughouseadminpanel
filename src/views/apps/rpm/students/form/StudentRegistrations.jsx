'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

const AdminStudentInformation = ({ loading, eventEnrollments, competitionEnrollments }) => {

  return (
    <Card>
      <CardHeader title='Registrations' />
      <CardContent>
        <div>
          {
            loading ? '' :
              !(eventEnrollments.length || competitionEnrollments.length) ? (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  className="flex flex-1 items-center justify-center h-full"
                >
                  <Typography color="textSecondary" variant="h5">
                    No registrations yet!
                  </Typography>
                </div>
              )
                :
                (
                  <div className='pb-2'>
                    <Grid container>
                      {
                        eventEnrollments.map((enrollment, index) => (
                          <Grid key={index} item sm={4} xl={3} className='p-1'>
                            <Card className='bg-gray-700 w-full'>
                              <CardContent>
                                <div className='my-3'>
                                  <Grid container>
                                    <Grid item className=''>
                                      <div className='flex items-start justify-start'>
                                        <CustomAvatar variant='rounded' size={40} color='success' skin='light'>
                                          <i className='tabler-calendar-event text-[30px]' />
                                        </CustomAvatar>
                                        <div className='ps-2'>
                                          <Typography></Typography>
                                          <Typography>{enrollment.event?.name}</Typography>
                                        </div>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      }
                      {
                        competitionEnrollments.map((enrollment, index) => (
                          <Grid key={`key${index}`} item sm={4} xl={3} className='p-1'>
                            <Card className='bg-gray-700 w-full'>
                              <CardContent>
                                <div className='my-3'>
                                  <Grid container>
                                    <Grid className=''>
                                      <div className='flex items-start justify-start'>
                                        <CustomAvatar variant='rounded' size={40} color='success' skin='light'>
                                          <i className='tabler-timeline-event-plus text-[30px]' />
                                        </CustomAvatar>
                                        <div className='ps-2'>
                                          <Typography></Typography>
                                          <Typography>{enrollment.competition?.name}</Typography>
                                        </div>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </div>
                )
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminStudentInformation
