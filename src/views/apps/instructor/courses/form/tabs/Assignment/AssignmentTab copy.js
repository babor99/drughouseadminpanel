import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import moment from 'moment'

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

// Third-Party Imports
import classnames from 'classnames'

import CustomTextField from '@core/components/mui/TextField'
import EditAssignmentDialog from './dialogs/EditAssignmentDialog'
import DeleteAssignmentDialog from './dialogs/DeleteAssignmentDialog'

// Styles Imports
import styles from './styles.module.css'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

function AssignmentTab(props) {
	const { courseId } = useParams()

	const {
		assignments,
		createNewAssignment,
		updateAssignment,
		deleteAssignment
	} = props

	const [anchorEl, setAnchorEl] = useState(null)
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

	const [dialogAssignment, setDialogAssignment] = useState({});
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = (assignment) => {
		setDialogAssignment(assignment);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setDialogAssignment(null);
	};

	const handleInputChange = (field, value) => {
		setFormData((prevData) => {
			return { ...prevData, [field]: value }
		})
	}

	// Handle menu click
	const handleMenuClick = e => {
		setMenuOpen(true)
		setAnchorEl(e.currentTarget)
	}

	// Handle menu close
	const handleMenuClose = () => {
		setAnchorEl(null)
		setMenuOpen(false)
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



	return (
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
								id='tiny-assignment-question'
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
						<Button onClick={callCreateAssignmentFunc} variant='outlined' className="bg-primary text-white">Create Assignment</Button>
					</div>
				</div>
			</Grid>
			<Grid item xs={12} lg={5} className="lg:ps-5">
				<div className="">
					<Typography variant='h6'>ASSIGNMENT LIST</Typography>
					<div className="w-full">
						{
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
													aria-controls='long-menu'
													aria-haspopup='true'
													onClick={handleMenuClick}
												>
													<i className='tabler-dots-vertical' />
												</IconButton>
												<Menu
													id='long-menu'
													transformOrigin={{ vertical: 'top', horizontal: 'right' }}
													anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
													anchorEl={anchorEl}
													keepMounted
													open={Boolean(anchorEl)}
													onClose={handleMenuClose}
												>
													<MenuItem>
														{/* <OpenDialogOnElementClick
															element={Button}
															elementProps={{
																children: "Edit",
																className: "w-full"
															}}
															dialog={EditAssignmentDialog}
															dialogProps={{
																updateAssignment: updateAssignment,
																assignment: assignment,
															}}
														/> */}
														<Button onClick={() => handleOpenDialog(assignment)} className="w-full">
															Edit
														</Button>
														<EditAssignmentDialog
															key={assignment?.id || index}
															open={openDialog}
															setOpen={setOpenDialog}
															updateAssignment={updateAssignment}
															assignment={dialogAssignment}
														/>
													</MenuItem>
													<MenuItem onClick={handleMenuClose}>
														Mark as {assignment.submission_status === 'ACTIVE' ? 'draft' : 'active'}
													</MenuItem>
													<MenuItem onClick={handleMenuClose}>View sumbission</MenuItem>
													<MenuItem>
														<OpenDialogOnElementClick
															element={Button}
															elementProps={{
																children: "Delete",
																className: "w-full"
															}}
															dialog={DeleteAssignmentDialog}
															dialogProps={{
																deleteAssignment: deleteAssignment
															}}
														/>
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
												label={`${assignment.submission_status === 'ACTIVE' ? 'Active' : 'Draft'}`}
												color={`${assignment.submission_status === 'ACTIVE' ? 'primary' : 'warning'}`}
											/>
										</CardContent>
									</Card>
								</div>
							))
						}
					</div>
				</div>
			</Grid>
		</Grid>
	)
}

export default AssignmentTab;
