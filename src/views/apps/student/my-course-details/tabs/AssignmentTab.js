import { useState } from 'react';

import { useSelector } from 'react-redux'

import moment from 'moment'

import { toast } from 'react-toastify';

import DOMPurify from 'dompurify'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'

import { GET_AWS_PRESIGNED_URL } from '@/constants/constants';

function AssignmentTab({ assignments, submitAssignment }) {
	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)
	const submittedAssignments = useSelector(state => state.student.submittedAssignments || [])

	// assignment-list page related attributes starts here
	const [downloadFileLoading, setDownloadFileLoading] = useState(false)

	const [showAssignmentListPage, setShowAssignmentListPage] = useState(true)
	const [showAssignmentSubmissionPage, setShowAssignmentSubmissionPage] = useState(false)
	const [currentAssignment, setCurrentAssignment] = useState('')

	// assignment-form related attributes starts here
	const [answer, setAnswer] = useState('')
	const [privateNote, setPrivateNote] = useState('')
	const [file, setFile] = useState('')

	const submitAssignmentCallback = ({ success }) => {
		if (success) {
			setAnswer('')
			setPrivateNote('')
			setFile('')
			setShowAssignmentSubmissionPage(false)
			setShowAssignmentListPage(true)
		}
	}

	const callSubmitAssignmentFunc = () => {
		const formdata = new FormData()

		formdata.append('assignment', currentAssignment?.id)
		formdata.append('answer', answer)
		formdata.append('private_note', privateNote)
		file && formdata.append('file', file)

		submitAssignment(formdata, submitAssignmentCallback)
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
				setDownloadFileLoading(false)
				toast.success('Download successful!')
			} else {
				setDownloadFileLoading(false)
				toast.error('Download failed!')
			}
		} catch (error) {
			setDownloadFileLoading(false)
			toast.error('Download failed!')
			console.error('Error downloading file:', error);
		}
	};

	return (
		<div>
			{/* assignment list page  */}
			<div className={`${!showAssignmentListPage && 'hidden'}`}>
				<Grid container className="my-1 lg:my-2">
					<Grid item xs={12} className="lg:ps-5">
						<div className="">
							{
								assignments.length > 0 &&
								<Typography variant='h6'>Total {assignments?.length} Assignments</Typography>
							}
							<div className="w-full">
								{
									assignments?.length ?
										assignments?.map((assignment, index) => (
											<div key={index} className="my-2 lg:my-4">
												<Card className='border-2'>
													<CardContent className=''>
														<div className="flex items-start justify-between mb-3">
															<div className="flex justify-start">
																<i className='tabler-calendar-share mr-2'></i>
																<Typography className='max-is-[85%] break-words'>{assignment.name}</Typography>
															</div>
															<div>
																{
																	submittedAssignments.find(submitted => submitted?.assignment?.id === assignment.id) ?
																		(
																			submittedAssignments.find(submitted => submitted?.assignment?.id === assignment.id)?.status === 'COMPLETED' ?
																				<Chip
																					variant='tonal'
																					size='medium'
																					label='Completed'
																					color='success'
																					className="text-sm font-bold"
																				/>
																				:
																				submittedAssignments.find(submitted => submitted?.assignment?.id === assignment.id)?.status === 'RESUBMIT' ?
																					<Button
																						variant='outlined'
																						className="p-1 m-0 font-bold hover:bg-primary hover:text-white"
																						onClick={(e) => {
																							setCurrentAssignment(assignment)
																							setShowAssignmentListPage(false)
																							setShowAssignmentSubmissionPage(true)
																						}}
																					>
																						Resubmit
																					</Button>
																					:
																					<Chip
																						variant='tonal'
																						size='medium'
																						label='Pending'
																						color='warning'
																						className="text-sm font-bold"
																					/>
																		)
																		: (
																			<Button
																				variant='outlined'
																				className="p-1 m-0 font-bold hover:bg-primary hover:text-white"
																				onClick={(e) => {
																					setCurrentAssignment(assignment)
																					setShowAssignmentListPage(false)
																					setShowAssignmentSubmissionPage(true)
																				}}
																			>
																				Submit
																			</Button>
																		)
																}
															</div>
														</div>
														<div className="mb-2">
															<Typography>Attachment:</Typography>
															{
																assignment?.question_file ?
																	<div>
																		<Typography className="text-primary">
																			{
																				assignment?.question_file.split('/')[assignment?.question_file?.split('/')?.length - 1]?.split('?')?.[0]
																			}
																		</Typography>
																		<Button
																			size='small'
																			variant='contained'
																			className='my-2'
																			disabled={downloadFileLoading}
																			onClick={() => downloadFile(assignment?.question_file.split('?')?.[0])}
																		>
																			Download file
																		</Button>
																	</div>
																	:
																	<Typography>n/a</Typography>
															}
														</div>
														<div className="mb-2">
															<Typography className="max-is-[85%] mb-1">
																Deadline: {moment(assignment.deadline_date).format('ll')} {moment(assignment.deadline_time, 'HH:mm').format('hh:mm A')}
															</Typography>
														</div>
														<div className="flex items-center justify-between">
															<div>
																<Chip
																	variant='tonal'
																	size='medium'
																	className="font-bold"
																	label={`${assignment.status === 'ACTIVE' ? 'Active' : 'Draft'}`}
																	color={`${assignment.status === 'ACTIVE' ? 'primary' : 'warning'}`}
																/>
															</div>
															<div>
																<Typography>Total marks: {assignment.total_marks}</Typography>
															</div>
														</div>
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

			{/* assignment-submission page */}
			<div className={`${!showAssignmentSubmissionPage && 'hidden'}`}>
				<div>
					<div className="flex items-start justify-between">
						<Typography className="font-bold">Assignment Submission Form</Typography>
						<Button
							variant='outlined'
							className="p-1 m-0"
							onClick={() => {
								setCurrentAssignment('')
								setShowAssignmentSubmissionPage(false)
								setShowAssignmentListPage(true)
							}}
						>
							Back to assignment list
						</Button>
					</div>
					<div className="mt-5 lg:mt-8">
						<Grid container>
							<Grid item xs={12} className="w-full">
								<div className="border-2 p-3 lg:p-6 mb-3 lg:mb-6 w-full">
									<div classname="">
										<Typography variant='h6' className="font-bold">Questions: {currentAssignment?.id}</Typography>
										<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentAssignment?.questions) }}></p>
									</div>
									<div classname="my-2 lg:my-3">
										<Typography variant='h6' className="font-bold m-1 lg:mb-2">Download attached file:</Typography>
										{
											currentAssignment?.question_file ?
												<div>
													<Typography className="text-primary">
														{
															currentAssignment?.question_file.split('/')[currentAssignment?.question_file?.split('/')?.length - 1]?.split('?')?.[0]
														}
													</Typography>
													<Button
														size='small'
														variant='contained'
														className='my-2'
														disabled={downloadFileLoading}
														onClick={() => downloadFile(currentAssignment?.question_file.split('?')?.[0])}
													>
														Download file
													</Button>
												</div>
												:
												<Typography>n/a</Typography>
										}
									</div>
									<div className="my-3 lg:my-6 w-full">
										<Typography variant='h6' className="m-1">Answer*</Typography>
										<textarea
											rows={7}
											cols={100}
											className="max-w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-white focus:outline-none hover:border-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition duration-200"
											placeholder="Type your text here..."
											onChange={(e) => setAnswer(e.target.value)}
										/>
									</div>
									<div className="my-3 lg:my-6">
										<CustomTextField
											type='file'
											label='Upload file (optional)'
											className="w-full"
											onChange={(e) => setFile(e.target.files[0])}
										/>
									</div>
									<div className="my-3 lg:my-6 w-full">
										<Typography variant='h6' className="m-1">Private note (optional)</Typography>
										<textarea
											rows={7}
											cols={100}
											className="max-w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-white focus:outline-none hover:border-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition duration-200"
											placeholder="Type your text here..."
											onChange={(e) => setPrivateNote(e.target.value)}
										/>
									</div>
									<Button
										variant='outlined'
										className="bg-primary text-white"
										disabled={answer.length < 5}
										onClick={callSubmitAssignmentFunc}
									>
										Submit
									</Button>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AssignmentTab
