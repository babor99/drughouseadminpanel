import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify';

import moment from 'moment'

import DOMPurify from 'dompurify'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

// Third-Party Imports
import classnames from 'classnames'

import CustomTextField from '@core/components/mui/TextField'
import EditAssignmentDialog from './dialogs/EditAssignmentDialog'
import DeleteAssignmentDialog from './dialogs/DeleteAssignmentDialog'


// Styles Imports
import styles from './styles.module.css'

import { assignmentSubmissionStatusOptions } from '@/commons/dropdownOptions'

import {
	GET_INSTRUCTOR_ASSIGNMENT_SUBMISSIONS_BY_ASSIGNMENT_ID,
	UPDATE_INSTRUCTOR_ASSIGNMENT_SUBMISSION,
	GET_AWS_PRESIGNED_URL
} from '@/constants/constants'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

function AssignmentTab(props) {
	const { courseId } = useParams()
	let serialNumber = 1

	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)

	const {
		assignments,
		createNewAssignment,
		updateAssignment,
		deleteAssignment
	} = props

	// assignment submisson related attributes starts here
	// assignment submisson related attributes starts here
	const [downloadFileLoading, setDownloadFileLoading] = useState(false)

	const [showAssignmentFormAndListPage, setShowAssignmentFormAndListPage] = useState(true)
	const [showAssignmentSubmissionListPage, setShowAssignmentSubmissionListPage] = useState(false)
	const [showSingleAssignmentSubmissionPage, setShowSingleAssignmentSubmissionPage] = useState(false)
	const [currentSubmission, setCurrentSubmission] = useState({})
	const [currentAssignmentId, setCurrentAssignmentId] = useState('')
	const [assignmentSubmissions, setAssignmentSubmissions] = useState([])

	const [assessmentData, setAssessmentData] = useState({
		total_marks: '',
		status: '',
		remarks: ''
	})

	// handle assessmentdata-input field change
	const handleAssessmentInputChange = (field, value) => {
		setAssessmentData((prevData) => {
			return { ...prevData, [field]: value }
		})
	}

	useEffect(() => {
		if (currentAssignmentId) {
			getAssignmentSubmissionsByAssignmentId()
		}
	}, [currentAssignmentId])

	function getAssignmentSubmissionsByAssignmentId() {
		const authHeaders = {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'X-CSRFToken': csrfToken
			}
		}

		try {
			fetch(`${GET_INSTRUCTOR_ASSIGNMENT_SUBMISSIONS_BY_ASSIGNMENT_ID}${currentAssignmentId}`, authHeaders)
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`AssignmentSubmission get failed with status code ${res.status}`)
				})
				.then(data => {

					setAssignmentSubmissions(data?.assignment_submissions || [])
				})
				.catch(error => {

				})
		} catch (err) {

		}
	}

	function updateAssignmentSubmissionAssessment(assignmentSubmissionId) {
		try {
			fetch(`${UPDATE_INSTRUCTOR_ASSIGNMENT_SUBMISSION}${assignmentSubmissionId}`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
					'X-CSRFToken': csrfToken
				},
				body: JSON.stringify(assessmentData),
			})
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`AssignmentSubmission update failed with status code ${res.status}`)
				})
				.then(data => {

					data && setAssignmentSubmissions(data)
					toast.success('Congrats! Submission update success!')

					// after update success return to submissin-list page
					setShowAssignmentFormAndListPage(false)
					setShowSingleAssignmentSubmissionPage(false)
					setShowAssignmentSubmissionListPage(true)
				})
				.catch(error => {
					toast.error('Oops! Submission update failed!')

				})
		} catch (err) {
			toast.error('Oops! Submission update failed!')

		}
	}

	// assignment-form and list related attributes starts here
	// assignment-form and list related attributes starts here
	const [anchorElements, setAnchorElements] = useState({})
	const [menuOpen, setMenuOpen] = useState(false)
	const [questions, setQuestions] = useState('')
	const [questionFile, setQuestionFile] = useState('')

	const [formData, setFormData] = useState({
		name: '',
		total_marks: '',
		deadline_date: '',
		deadline_time: '',
		note: '',
		submission_status: ''
	})

	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [dialogUpdateAssignments, setDialogUpdateAssignments] = useState({});
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [dialogDeleteAssignments, setDialogDeleteAssignments] = useState({});

	// 


	// Function to open the update-dialog with specific assignment data
	const handleOpenUpdateDialog = (assignmentId) => {
		setDialogUpdateAssignments(prevState => ({
			...prevState,
			[assignmentId]: assignments.find(a => a.id === assignmentId)
		}));
		setOpenUpdateDialog(true);
	};

	// Function to close the update-dialog with specific assignment data
	const handleCloseUpdateDialog = (assignmentId) => {
		setDialogUpdateAssignments(prevState => ({
			...prevState,
			[assignmentId]: null
		}));
		setOpenUpdateDialog(false);
	};

	// Function to open the delete-dialog with specific assignment data
	const handleOpenDeleteDialog = (assignmentId) => {
		setDialogDeleteAssignments(prevState => ({
			...prevState,
			[assignmentId]: assignments.find(a => a.id === assignmentId)
		}));
		setOpenDeleteDialog(true);
	};

	// Function to close the delete-dialog with specific assignment data
	const handleCloseDeleteDialog = (assignmentId) => {
		setDialogDeleteAssignments(prevState => ({
			...prevState,
			[assignmentId]: null
		}));
		setOpenDeleteDialog(false);
	};

	// Function to handle menu click for a specific assignment
	const handleMenuClick = (event, assignmentId) => {
		setAnchorElements(prevState => ({
			...prevState,
			[assignmentId]: event.currentTarget
		}));
	};

	// Function to close the menu for a specific assignment
	const handleMenuClose = (assignmentId) => {
		setAnchorElements(prevState => ({
			...prevState,
			[assignmentId]: null
		}));
	};

	// handle input field change
	const handleInputChange = (field, value) => {
		setFormData((prevData) => {
			return { ...prevData, [field]: value }
		})
	}

	const createAssignmentCallback = ({ success }) => {
		if (success) {

			setQuestions('')
			setQuestionFile('')
			setFormData({
				name: '',
				total_marks: '',
				deadline_date: '',
				deadline_time: '',
				note: '',
				submission_status: ''
			})
		}
	}

	const callCreateAssignmentFunc = () => {
		const formdata = new FormData()

		formdata.append('course', courseId)
		formdata.append('questions', questions)
		formdata.append('question_file', questionFile)

		for (let key of Object.keys(formData)) {

			formdata.append(key, formData[key])
		}

		createNewAssignment(formdata, createAssignmentCallback)
	}

	const downloadFile = async fileUrl => {
		const authHeaders = {
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'X-CSRFToken': csrfToken
			}
		};

		try {
			setDownloadFileLoading(true)

			const fileKey = fileUrl.split('amazonaws.com/')?.[fileUrl.split('amazonaws.com/')?.length - 1]
			const response = await fetch(`${GET_AWS_PRESIGNED_URL}?file_key=${fileKey}&expiry=300`, authHeaders); // 300 seconds = 5 minutes

			if (!response.ok) {
				throw new Error(`File download failed with status code  ${response.status}`);
			}

			const data = await response.json();
			const url = data?.url;

			if (url) {
				const fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];

				const link = document.createElement('a');

				link.href = url;

				// Fetch the actual file to determine the content type
				const fileResponse = await fetch(url);
				const blob = await fileResponse.blob();

				// Create a URL for the blob and set the download attribute
				const blobUrl = window.URL.createObjectURL(blob);

				link.href = blobUrl;
				link.setAttribute('download', fileName);

				document.body.appendChild(link);
				link.click();

				// Clean up the blob URL
				window.URL.revokeObjectURL(blobUrl);
				document.body.removeChild(link);
				toast.success('File download success!')
				setDownloadFileLoading(false)
			} else {
				toast.error('Oops! File download failed!')
				setDownloadFileLoading(false)
			}
		} catch (error) {
			toast.error('Oops! File download failed!')
			setDownloadFileLoading(false)
			console.error('Error downloading file:', error);
		}
	}

	return (
		<div>
			{/* assignment-form and assignment list */}
			<div className={`${!showAssignmentFormAndListPage && 'hidden'}`}>
				<Grid container className="my-1 lg:my-2">
					<Grid item xs={12} lg={7}>
						<div className="">
							<Typography variant='h6'>CREATE NEW ASSIGNMENT</Typography>
							<div>
								<CustomTextField
									fullWidth
									id="name"
									variant="outlined"
									label="Assignment title*"
									placeholder="First Assignment"
									className="my-2 lg:my-4"
									value={formData?.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
								/>
								<div className="">
									<Typography className="text-sm">Questions</Typography>
									<CustomTinyMCEEditor
										id='tiny-add-assignment-questions'
										value={questions}
										setValue={setQuestions}
									/>
								</div>
								<CustomTextField
									fullWidth
									id="question_file"
									variant="outlined"
									label="Question file"
									placeholder=""
									className="my-2 lg:my-4"
									type="file"
									onChange={(e) => {

										setQuestionFile(e.target.files[0])
									}}
								/>
								<CustomTextField
									fullWidth
									id="total_marks"
									variant="outlined"
									label="Total marks*"
									placeholder=""
									className="my-2 lg:my-4"
									type="number"
									value={formData?.total_marks}
									onChange={(e) => handleInputChange('total_marks', e.target.value)}
								/>
								<CustomTextField
									fullWidth
									id="deadline_date"
									variant="outlined"
									label="Deadline (date)*"
									placeholder=""
									className="my-2 lg:my-4"
									type="date"
									value={formData?.deadline_date}
									onChange={(e) => handleInputChange('deadline_date', e.target.value)}
								/>
								<CustomTextField
									fullWidth
									id="deadline_time"
									variant="outlined"
									label="Deadline (time)*"
									placeholder=""
									className="my-2 lg:my-4"
									type="time"
									value={formData?.deadline_time}
									onChange={(e) => handleInputChange('deadline_time', e.target.value)}
								/>
								<CustomTextField
									fullWidth
									id="note"
									variant="outlined"
									label="Note"
									placeholder=""
									className="my-2 lg:my-4"
									value={formData?.note}
									onChange={(e) => handleInputChange('note', e.target.value)}
								/>
								<CustomTextField
									select
									fullWidth
									id="submission_status"
									variant="outlined"
									label="Submission status*"
									className="my-2 lg:my-4"
									defaultValue='DRAFT'
									onChange={(e) => handleInputChange('submission_status', e.target.value)}
								>
									<MenuItem value='DRAFT'>Draft</MenuItem>
									<MenuItem value='ACTIVE'>Active</MenuItem>
								</CustomTextField>
							</div>
							<div className="my-2 lg:my-4">
								<Button
									variant='outlined'
									className="bg-primary text-white"
									onClick={callCreateAssignmentFunc}
									disabled={
										!formData.name ||
										!formData.total_marks ||
										!formData.deadline_date ||
										!formData.deadline_time ||
										!questions
									}
								>
									Create Assignment
								</Button>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} lg={5} className="lg:ps-5">
						<div className="">
							<Typography variant='h6'>ASSIGNMENT LIST</Typography>
							<div className="w-full">
								{
									assignments?.length ?
										assignments?.map((assignment, index) => (
											<div key={index} className="my-2 lg:my-4">
												<Card className={classnames('border-2', styles.card)}>
													<CardContent className='flex flex-col items-start relative overflow-hidden'>
														<div className='absolute block-start-4 inline-end-3' onClick={e => e.stopPropagation()}>
															<IconButton
																aria-label='more'
																size='small'
																className={classnames(styles.menu, {
																	[styles.menuOpen]: menuOpen
																})}
																aria-controls={`long-menu-${assignment.id}`}
																aria-haspopup='true'
																onClick={(e) => handleMenuClick(e, assignment.id)}
															>
																<i className='tabler-dots-vertical' />
															</IconButton>
															<Menu
																id={`long-menu-${assignment.id}`}
																transformOrigin={{ vertical: 'top', horizontal: 'right' }}
																anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
																anchorEl={anchorElements[assignment.id]}
																keepMounted
																open={Boolean(anchorElements[assignment.id])}
																onClose={() => handleMenuClose(assignment.id)}
															>
																<MenuItem>
																	<Button onClick={() => handleOpenUpdateDialog(assignment.id)} className="w-full">
																		Edit
																	</Button>

																	{/* Dialog Instance */}
																	{dialogUpdateAssignments[assignment.id] && (
																		<EditAssignmentDialog
																			key={assignment.id}
																			open={openUpdateDialog}
																			setOpen={setOpenUpdateDialog}
																			handleMenuClose={handleMenuClose}
																			handleCloseUpdateDialog={handleCloseUpdateDialog}
																			updateAssignment={updateAssignment}
																			assignment={dialogUpdateAssignments[assignment.id]}
																		/>
																	)}
																</MenuItem>
																<MenuItem
																	onClick={() => {
																		const formdata = new FormData();

																		formdata.append('status', assignment.status === 'ACTIVE' ? 'DRAFT' : 'ACTIVE')

																		const callback = ({ success }) => {
																			success && handleMenuClose(assignment.id)
																		}

																		updateAssignment({ formdata, assignmentId: assignment.id }, callback)
																	}}
																>
																	Mark as {assignment.status === 'ACTIVE' ? 'draft' : 'active'}
																</MenuItem>
																<MenuItem
																	onClick={() => {
																		setCurrentAssignmentId(assignment.id)
																		handleMenuClose(assignment.id)
																		setShowAssignmentSubmissionListPage(true)
																		setShowAssignmentFormAndListPage(false)
																		setShowSingleAssignmentSubmissionPage(false)
																	}}
																>
																	View sumbission
																</MenuItem>
																<MenuItem>
																	<Button onClick={() => handleOpenDeleteDialog(assignment.id)} className="w-full">
																		Delete
																	</Button>

																	{/* Dialog Instance */}
																	{dialogDeleteAssignments[assignment.id] && (
																		<DeleteAssignmentDialog
																			key={assignment.id}
																			open={openDeleteDialog}
																			setOpen={setOpenDeleteDialog}
																			handleMenuClose={handleMenuClose}
																			handleCloseDeleteDialog={handleCloseDeleteDialog}
																			deleteAssignment={deleteAssignment}
																			assignment={dialogDeleteAssignments[assignment.id]}
																		/>
																	)}
																</MenuItem>
															</Menu>
														</div>
														<div className="flex items-center justify-center mb-3">
															<i className='tabler-calendar-share mr-2'></i>
															<Typography className='max-is-[85%] break-words'>{assignment.name}</Typography>
														</div>
														<Typography className="max-is-[85%] mb-1">
															Deadline: {moment(assignment.deadline_date).format('ll')} {moment(assignment.deadline_time, 'HH:mm').format('hh:mm A')}
														</Typography>
														<Chip
															variant='tonal'
															size='small'
															label={`${assignment.status === 'ACTIVE' ? 'Active' : 'Draft'}`}
															color={`${assignment.status === 'ACTIVE' ? 'primary' : 'warning'}`}
														/>
													</CardContent>
												</Card>
											</div>
										))
										:
										<div className="flex justify-center my-5 lg:my-10">
											<Typography variant='h6' >No assignment</Typography>
										</div>
								}
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
			{/* assignment-submission list table */}
			<div className={`${!showAssignmentSubmissionListPage && 'hidden'}`}>
				<div>
					<div className="flex items-center justify-between">
						<Typography className="font-bold">SUBMITTED ASSIGNMENT LIST</Typography>
						<Button
							variant='outlined'
							onClick={() => {
								setCurrentAssignmentId('')
								setAssignmentSubmissions([])
								setShowSingleAssignmentSubmissionPage(false)
								setShowAssignmentSubmissionListPage(false)
								setShowAssignmentFormAndListPage(true)
							}}
						>
							Back to assignment list
						</Button>
					</div>
					<div className="flex items-center justify-center mt-5">
						{
							assignmentSubmissions?.length ?
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
												Assignment
											</TableCell>
											<TableCell
												className="px-2 md:px-4"
											>
												Total Marks
											</TableCell>
											<TableCell
												className="px-2 md:px-4"
											>
												Obtained Marks
											</TableCell>
											<TableCell
												className="px-2 md:px-4"
											>
												Status
											</TableCell>
											<TableCell
												className="px-2 md:px-4"
											>
												Deadline
											</TableCell>
											<TableCell
												className="px-2 md:px-4"
											>
												Submitted on
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
											assignmentSubmissions.map(n => {
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
															<span>{n.assignment?.name}</span>
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															<span>{n.assignment?.total_marks}</span>
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															<span>{n.obtained_marks && n.obtained_marks}</span>
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															<span
																className={`rounded-md text-white p-1 ${n.status === 'COMPLETED' ? 'bg-success' : n.status === 'RESUBMIT' ? 'bg-warning' : 'bg-secondary'}`}
															>
																{n.status?.toLowerCase()}
															</span>
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															{n?.assignment?.deadline_date && moment(n?.assignment?.deadline_date).format('LL')} {' '}
															{n?.assignment?.deadline_time && moment(n?.assignment?.deadline_time, 'HH:mm').format('LT')}
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															{n.created_at ? moment(n.created_at).format('LLL') : 'n/a'}
														</TableCell>
														<TableCell
															className="px-2 md:px-4"
															component="th"
															scope="row"
														>
															<div className='flex items-center'>
																<IconButton
																	onClick={() => {
																		setCurrentSubmission(n)
																		setAssessmentData({ obtained_marks: n.obtained_marks, status: n.status, remarks: n.remarks })
																		setShowSingleAssignmentSubmissionPage(true)
																		setShowAssignmentFormAndListPage(false)
																		setShowAssignmentSubmissionListPage(false)
																	}}
																>
																	<i className='tabler-eye text-primary' title='View submission' />
																</IconButton>
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
			</div>
			{/* single assignment-submission page */}
			<div className={`${!showSingleAssignmentSubmissionPage && 'hidden'}`}>
				<div>
					<div className="flex items-center justify-between">
						<Typography className="font-bold">ASSIGNMENT REVIEWING FORM</Typography>
						<Button
							variant='outlined'
							onClick={() => {
								setShowAssignmentFormAndListPage(false)
								setShowSingleAssignmentSubmissionPage(false)
								setShowAssignmentSubmissionListPage(true)
							}}
						>
							Back to submission list
						</Button>
					</div>
					<div className="flex items-center justify-center mt-5">
						{
							currentSubmission && (
								<div>
									<Grid container>
										<Grid item xs={12} md={5} className="mb-3 md:mb-6">
											<div className="border-2 p-3 lg:p-6">
												<Typography variant='h6' className="font-bold mb-1">Your questions:</Typography>
												<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentSubmission.assignment?.questions) }}></p>
												{/* <p>{currentSubmission.assignment?.questions}</p> */}
												<Typography variant='h6' className="font-bold mt-2 mb-1">Download question file:</Typography>
												{
													currentSubmission.assignment?.question_file ?
														<div>
															<Typography className="text-primary">
																{
																	currentSubmission.assignment?.question_file.split('/')[currentSubmission.assignment?.question_file?.split('/')?.length - 1]?.split('?')?.[0]
																}
															</Typography>
															<Button
																size='small'
																variant='contained'
																className='my-2'
																disabled={downloadFileLoading}
																onClick={() => downloadFile(currentSubmission.assignment?.question_file.split('?')?.[0])}
															>
																Download file
															</Button>
														</div>
														:
														<Typography>n/a</Typography>
												}
											</div>
										</Grid>
										<Grid item xs={12} md={7} className="md:ps-5">
											<div>
												<div className="border-2 p-3 lg:p-6 mb-3 lg:mb-6">
													<Typography variant='h6' className="font-bold mb-1">Student&apos;s submission:</Typography>
													<p>Submitted by: {currentSubmission.student?.name}{currentSubmission.student?.last_name}</p>
												</div>
												<div className="border-2 p-3 lg:p-6 mb-3 lg:mb-6">
													<Typography variant='h6' className="font-bold mb-1">Answers:</Typography>
													<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentSubmission.answer) }}></p>
													<Typography variant='h6' className="font-bold mt-2 mb-1">Download answer file:</Typography>
													{
														currentSubmission.file ?
															<div>
																<Typography className="text-primary">
																	{
																		currentSubmission.file?.split('/')[currentSubmission.file?.split('/')?.length - 1]?.split('?')?.[0]
																	}
																</Typography>
																<Button
																	size='small'
																	variant='contained'
																	className='my-2'
																	disabled={downloadFileLoading}
																	onClick={() => downloadFile(currentSubmission.file?.split('?')?.[0])}
																>
																	Download file
																</Button>
															</div>
															:
															<Typography>n/a</Typography>
													}
												</div>
												<div className="border-2 p-3 lg:p-6 mb-3 lg:mb-6">
													<Typography variant='h6' className="font-bold mb-2">Provide your assessment:</Typography>
													<div className="my-3 lg:my-6">
														<CustomTextField
															fullWidth
															id="obtained_marks"
															variant="outlined"
															className="mb-2 lg:mb-4"
															type="number"
															label={`Marks (out of ${currentSubmission.assignment?.total_marks})*`}
															InputLabelProps={assessmentData.obtained_marks && { shrink: true }}
															value={assessmentData.obtained_marks}
															onChange={(e) => handleAssessmentInputChange('obtained_marks', e.target.value)}
														/>
														<Autocomplete
															fullWidth
															options={assignmentSubmissionStatusOptions}
															value={assessmentData.status ? assignmentSubmissionStatusOptions.find(status => status.id === assessmentData.status) : null}
															getOptionLabel={option => `${option?.name}`}
															onChange={(event, newValue) => {

																handleAssessmentInputChange('status', newValue?.id)
															}}
															renderInput={params => {
																return (
																	<CustomTextField
																		{...params}
																		className="mb-2 lg:mb-4"
																		placeholder="Select status"
																		label='Status'
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
														<CustomTextField
															fullWidth
															id="remarks"
															variant="outlined"
															label="Remarks"
															InputLabelProps={assessmentData.remarks && { shrink: true }}
															value={assessmentData.remarks}
															onChange={(e) => handleAssessmentInputChange('remarks', e.target.value)}
														/>
													</div>
													<Button
														variant='outlined'
														className="bg-primary text-white"
														disabled={!assessmentData.obtained_marks}
														onClick={() => updateAssignmentSubmissionAssessment(currentSubmission.id)}
													>
														Submit
													</Button>
												</div>
											</div>
										</Grid>
									</Grid>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AssignmentTab
