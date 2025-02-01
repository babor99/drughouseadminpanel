import React, { useEffect, useState } from 'react';

import Link from 'next/link'
import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux'

import moment from 'moment';

import IconButton from '@mui/material/IconButton'
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material'

import QuizResultsDialog from './dialogs/QuizResults'
import LinearProgress from '@/components/custom/LinearProgress';
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import { getLocalizedUrl } from '@/utils/i18n';
import { GET_INSTRUCTOR_QUIZ_SUBMISSION_BY_STUDENT_ID_COURSE_ID } from '@/constants/constants'

function AcademicProgressTab({ enrollments }) {
	let serialNumber = 1
	const { lang: locale } = useParams()

	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)

	const [quizzes, setQuizzes] = useState([])

	function getAInstructorQuizSubmission(studentId, courseId) {
		const authHeaders = {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'X-CSRFToken': csrfToken
			}
		}

		try {
			fetch(`${GET_INSTRUCTOR_QUIZ_SUBMISSION_BY_STUDENT_ID_COURSE_ID}${studentId}/${courseId}`, authHeaders)
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`Quiz get failed with status code ${res.status}`)
				})
				.then(data => {

					setQuizzes(data?.quizzes || [])
				})
				.catch(error => {

				})
		} catch (err) {

		}
	}

	return (
		<div className="flex items-center justify-center">
			<div className="">
				{
					enrollments?.length ?
						<Table
							stickyHeader
						>
							<TableHead>
								<TableRow className="h-12">
									<TableCell
										className="px-2 md:px-4"
									>
										Sl
									</TableCell>
									<TableCell
										className="px-2 md:px-4"
									>
										Student
									</TableCell>
									<TableCell
										className="px-2 md:px-4"
									>
										School
									</TableCell>
									<TableCell
										className="px-2 md:px-4"
									>
										Date
									</TableCell>
									<TableCell
										className="px-2 md:px-4"
									>
										Progress
									</TableCell>
									<TableCell
										className="px-2 md:px-4"
									>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									enrollments.map(n => {
										return (
											<TableRow
												className="h-10 cursor-pointer"
												hover
												tabIndex={-1}
												key={n.id}
											>
												<TableCell className="px-2 md:px-4" component="th" scope="row">
													{serialNumber++}
												</TableCell>
												<TableCell
													className="px-2 md:px-4"
													component="th"
													scope="row"
												>
													<span>
														{n.student?.name} {n.student?.last_name}
													</span>
													<br />
													<span>{n.student?.email}</span>
												</TableCell>
												<TableCell
													className="px-2 md:px-4"
													component="th"
													scope="row"
												>
													{n.student?.school?.name}
												</TableCell>
												<TableCell
													className="px-2 md:px-4"
													component="th"
													scope="row"
												>
													<span>Enrolled from: {moment(n.enrolled_at).format('LLL')}</span>
													<br />
													<span>Completed on:  {n.completed_at ? moment(n.completed_at).format('LLL') : 'n/a'}</span>
												</TableCell>
												<TableCell
													className="px-2 md:px-4"
													component="th"
													scope="row"
												>
													<LinearProgress value={n?.course?.lectures ? (n?.completed_lectures * 100) / n?.course?.lectures : 0} color='primary' variant='determinate' className='bs-1.5' />
													<br />
													<span>Completed lessons: {n.completed_lectures} Out of {n?.course?.lectures}</span>
													<br />
													<span>Watched duration: </span>
												</TableCell>
												<TableCell
													className="px-2 md:px-4"
													component="th"
													scope="row"
												>
													<div className='flex items-center gap-2'>
														<OpenDialogOnElementClick
															element={IconButton}
															elementProps={{
																children: <i className='tabler-book-2 text-primary' title='Quiz results' onClick={() => getAInstructorQuizSubmission(n.student?.id, n.course?.id)} />
															}}
															dialog={QuizResultsDialog}
															dialogProps={{ quizzes }}
														/>
														<Link href={getLocalizedUrl(`/apps/student/certificate/${n.student?.id}/${n.course?.id}`, locale)}>
															<IconButton>
																<i className='tabler-certificate text-primary' title='Certificate' />
															</IconButton>
														</Link>
													</div>
												</TableCell>
											</TableRow>
										);
									})
								}
							</TableBody>
						</Table>
						:
						<Typography variant='h6' >No data found</Typography>
				}
			</div>
		</div>
	)
}

export default AcademicProgressTab;
