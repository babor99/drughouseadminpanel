import React, { useEffect, useState } from 'react';

import { useRouter, useParams } from 'next/navigation'

import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

import { getLocalizedUrl } from '@/utils/i18n'
import { CREATE_INSTRUCTOR_COURSE, UPDATE_INSTRUCTOR_COURSE } from '@/constants/constants'
import { isNumber } from '@/commons/utils';

function FinishTab() {
	const { lang: locale, courseId } = useParams()
	const router = useRouter()

	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)

	const methods = useFormContext();
	const { control, formState, getValues } = methods;
	const { errors, isValid, dirtyFields } = formState;

	const [loading, setLoading] = useState(false)
	const mandatoryFields = ['name', 'category', 'language', 'description']
	let missingFields = []
	const getvalues = getValues()

	for (let key of Object.keys(getvalues)) {
		if (mandatoryFields.includes(key)) {
			!getvalues[key] && missingFields.push(key)
		}
	}

	function createCourse(getvalues) {
		setLoading(true)
		const formdata = new FormData()

		for (let key of Object.keys(getvalues)) {
			formdata.append(key, getvalues[key])
		}

		try {
			fetch(CREATE_INSTRUCTOR_COURSE, {
				method: 'POST',
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'X-CSRFToken': csrfToken,
				},
				body: formdata,
			})
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`Course create failed with status code ${res.status}`)
				})
				.then(data => {

					setLoading(false)
					toast.success("Success! Course created successfully!")
					router.push(getLocalizedUrl('/apps/instructor/courses', locale))
				})
				.catch(error => {
					setLoading(false)
					toast.error("Failed! Course create failed!")

				})
		} catch (err) {
			setLoading(false)
			toast.error("Failed! Course create failed!")

		}
	}

	function updateCourse(getvalues) {
		setLoading(true)
		const formdata = new FormData()

		for (let key of Object.keys(getvalues)) {
			formdata.append(key, getvalues[key])
		}

		try {
			fetch(`${UPDATE_INSTRUCTOR_COURSE}${courseId}`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'X-CSRFToken': csrfToken,
				},
				body: formdata,
			})
				.then(res => {
					if (res.ok && [200, 201].includes(res.status)) {
						return res.json()
					}

					throw new Error(`Course update failed with status code ${res.status}`)
				})
				.then(data => {

					setLoading(false)
					toast.success("Success! Course updated successfully!")
					router.push(getLocalizedUrl('/apps/instructor/courses', locale))
				})
				.catch(error => {
					setLoading(false)
					toast.error("Failed! Course update failed!")

				})
		} catch (err) {

			setLoading(false)
			toast.error("Failed! Course update failed!")
		}
	}

	return (
		<div className="my-5">
			<div className="flex items-center justify-center">
				<div>
					<div className="flex items-center justify-center my-2 lg:my-4">
						<IconButton><i className="tabler-coffee text-primary text-[45px] lg:text-[60px]" /></IconButton>
					</div>
					<div className="flex items-center justify-center my-2 lg:my-4">
						<Typography variant='h4'>Thank You!</Typography>
					</div>
					<div className="flex items-center justify-center my-2 lg:my-4">
						<Typography variant='h5'>You are just one click away</Typography>
					</div>
					<div className="flex items-center justify-center my-2 lg:my-4">
						<Button
							variant='outlined'
							className="bg-primary text-white"
							disabled={Boolean(missingFields.length) || loading}
							onClick={() => {
								if (isNumber(courseId)) {
									updateCourse(getvalues)
								} else {
									createCourse(getvalues)
								}
							}
							}
						>
							{isNumber(courseId) ? 'Update' : 'Submit'}
						</Button>
					</div>
					<div className="flex items-center justify-center my-2 lg:my-4">
						{
							missingFields.length ?
								<span className="text-warning">Please fill-up all the required fields. These fields are missing value: {missingFields.map(field => `${field}, `)}</span> : ""
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FinishTab;
