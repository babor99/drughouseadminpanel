import { useState } from 'react'

import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import AddSectionDialog from './dialogs/AddSection'
import EditSectionDialog from './dialogs/inner-dialogs/EditSection'
import DeleteSectionDialog from './dialogs/inner-dialogs/DeleteSection'
import SortSectionsDialog from './dialogs/SortSections'

import AddLessonDialog from './dialogs/AddLesson'
import EditLessonDialog from './dialogs/inner-dialogs/inner-inner-dialogs/EditLesson'
import DeleteLessonDialog from './dialogs/inner-dialogs/inner-inner-dialogs/DeleteLesson'
import AddQuizDialog from './dialogs/AddQuiz'
import SortLessonsDialog from './dialogs/inner-dialogs/SortLessons'

import AddResourceDialog from './dialogs/inner-dialogs/inner-inner-dialogs/AddResource'
import AddQuizQuestionDialog from './dialogs/inner-dialogs/inner-inner-dialogs/AddQuizQuestion'

import { GET_INSTRUCTOR_LECTURE_RESOURCE_BY_LECTURE_ID, GET_INSTRUCTOR_QUIZ_QUESTION_BY_QUIZ_ID } from '@/constants/constants'

function CurriculumTab(props) {
	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)

	const {
		sections,
		createNewSection,
		updateSection,
		deleteSection,
		updateSectionSorting,
		createNewLecture,
		updateLecture,
		deleteLecture,
		updateLessonSorting,
		createNewQuiz,
	} = props

	const { courseId } = useParams()

	var lectureCounter = 0
	var quizCounter = 0

	const [resources, setResources] = useState([])
	const [quizQuestions, setQuizQuestions] = useState([])

	function getInstructorResourceByLectureId(lectureId) {
		const authHeaders = {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'X-CSRFToken': csrfToken
			}
		}

		try {
			fetch(`${GET_INSTRUCTOR_LECTURE_RESOURCE_BY_LECTURE_ID}${lectureId}`, authHeaders)
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`Resource get failed with status code ${res.status}`)
				})
				.then(data => {

					setResources(data || [])
				})
				.catch(error => {

				})
		} catch (err) {

		}
	}

	function getInstructorQuizQuestionByQuizId(quizId) {
		const authHeaders = {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'X-CSRFToken': csrfToken
			}
		}

		try {
			fetch(`${GET_INSTRUCTOR_QUIZ_QUESTION_BY_QUIZ_ID}${quizId}`, authHeaders)
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`QuizQuestion get failed with status code ${res.status}`)
				})
				.then(data => {

					setQuizQuestions(data || [])
				})
				.catch(error => {

				})
		} catch (err) {

		}
	}

	return (
		<div className="w-full">
			<div className="flex items-center justify-center gap-5">
				<OpenDialogOnElementClick
					element={Button}
					elementProps={{
						variant: "outlined",
						className: "hover:bg-primary hover:text-white",
						children: "+ Add section"
					}}
					dialog={AddSectionDialog}
					dialogProps={{ createNewSection }}
				/>
				<OpenDialogOnElementClick
					element={Button}
					elementProps={{
						variant: "outlined",
						className: "hover:bg-primary hover:text-white",
						children: "+ Add lesson"
					}}
					dialog={AddLessonDialog}
					dialogProps={{ createNewLecture, courseId }}
				/>
				<OpenDialogOnElementClick
					element={Button}
					elementProps={{
						variant: "outlined",
						className: "hover:bg-primary hover:text-white",
						children: "+ Add quiz"
					}}
					dialog={AddQuizDialog}
					dialogProps={{ createNewQuiz, courseId }}
				/>
				<OpenDialogOnElementClick
					element={Button}
					elementProps={{
						variant: "outlined",
						className: "hover:bg-primary hover:text-white",
						children: "... Sort sections"
					}}
					dialog={SortSectionsDialog}
					dialogProps={{ updateSectionSorting }}
				/>
			</div>
			{/* section starts */}
			<div className="mt-6 lg:mt-10">
				{
					sections.map((section, index) => {
						return (
							<div key={index} className="group border-2 p-2 lg:p-5 my-10 lg:my-14">
								<div className="">
									<Typography variant='h5'>{`Section ${index + 1}: ${section?.name}`}</Typography>
								</div>
								<div className="flex items-center justify-end gap-5 invisible group-hover:visible">
									<OpenDialogOnElementClick
										element={Button}
										elementProps={{
											variant: "outlined",
											className: "hover:bg-primary hover:text-white",
											children: "... Sort lessons"
										}}
										dialog={SortLessonsDialog}
										dialogProps={{ lectures: section?.section_lectures || [], updateLessonSorting }}
									/>
									<OpenDialogOnElementClick
										element={Button}
										elementProps={{
											variant: "outlined",
											className: "hover:bg-primary hover:text-white",
											children: "/ Edit Section"
										}}
										dialog={EditSectionDialog}
										dialogProps={{ sectionName: section.name, sectionId: section.id, updateSection }}
									/>
									<OpenDialogOnElementClick
										element={Button}
										elementProps={{
											variant: "outlined",
											className: "hover:bg-primary hover:text-white",
											children: "X Delete Section"
										}}
										dialog={DeleteSectionDialog}
										dialogProps={{ sectionId: section.id, deleteSection }}
									/>
								</div>
								{/* lecture starts */}
								<div className="p-1 lg:p-2">
									{
										section?.section_lectures?.map((lecture, idx) => {
											lecture.is_quiz ?
												quizCounter += 1
												:
												lectureCounter += 1

											return (
												<div key={idx} className="group border-2 p-2 lg:p-4 m-2 lg:m-3 flex items-center justify-between">
													<div className="flex items-center justify-center">
														{
															lecture.is_quiz ?
																<i className='tabler-alarm text-[20px] mr-1'></i>
																:
																<i className='tabler-book text-[20px] mr-1'></i>
														}
														<Typography variant='h6'>{`${lecture.is_quiz ? 'Quiz' : 'Lesson'} ${lecture.is_quiz ? quizCounter : lectureCounter} : ${lecture?.name}`}</Typography>
													</div>
													<div className="invisible group-hover:visible">
														{
															lecture.is_quiz ?
																<>
																	{/* <IconButton><i className='tabler-message-2 text-secondary' title='Quiz results' /></IconButton> */}
																	<OpenDialogOnElementClick
																		element={IconButton}
																		elementProps={{
																			children: <i className='tabler-message-question text-secondary' title='Quiz questions' onClick={() => getInstructorQuizQuestionByQuizId(lecture.id)} />
																		}}
																		dialog={AddQuizQuestionDialog}
																		dialogProps={{ quizId: lecture.id, currentQuizName: lecture.name, quizQuestions }}
																	/>
																</>
																:
																<OpenDialogOnElementClick
																	element={IconButton}
																	elementProps={{
																		children: <i className='tabler-files text-secondary' title='Resource files' onClick={() => getInstructorResourceByLectureId(lecture.id)} />
																	}}
																	dialog={AddResourceDialog}
																	dialogProps={{ lectureId: lecture.id, resources }}
																/>
														}
														<OpenDialogOnElementClick
															element={IconButton}
															elementProps={{
																children: <i className='tabler-edit text-secondary' title='Edit' />
															}}
															dialog={EditLessonDialog}
															dialogProps={{ lecture, lectureId: lecture.id, updateLecture }}
														/>
														<OpenDialogOnElementClick
															element={IconButton}
															elementProps={{
																children: <i className='tabler-trash text-secondary' title='Delete' />
															}}
															dialog={DeleteLessonDialog}
															dialogProps={{ lecture, lectureId: lecture.id, deleteLecture }}
														/>
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default CurriculumTab;
