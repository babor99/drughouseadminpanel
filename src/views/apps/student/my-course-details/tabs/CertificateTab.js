import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

import { getLocalizedUrl } from '@/utils/i18n'

import { DOWNLOAD_COURSE_COMPLETION_CERTIFICATE } from '@/constants/constants';

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

function CertificateTab({ enrollment, totalLecturesCount }) {
	const accessToken = useSelector(state => state.authentication.accessToken)
	const csrfToken = useSelector(state => state.authentication.csrfToken)
	const studentLectureProgresses = useSelector(state => state.student.studentLectureProgresses || [])
	const studentId = useSelector(state => state.user.id || 0)

	const [certificateDownloadLoading, setCertificateDownloadLoading] = useState(false)
	const [completedPercentage, setCompletedPercentage] = useState(0)

	const { lang: locale, courseId } = useParams()

	useEffect(() => {
		const completedLecturesCount = studentLectureProgresses.length

		if (totalLecturesCount && completedLecturesCount) {
			const percentage = (completedLecturesCount * 100) / totalLecturesCount

			percentage && setCompletedPercentage(percentage > 100 ? 100 : Math.floor(percentage))

		}
	}, [totalLecturesCount, studentLectureProgresses])

	const theme = useTheme()
	const textSecondary = 'var(--mui-palette-text-secondary)'
	const successColor = 'var(--mui-palette-success-main)'

	const [chartOptions, setChartOptions] = useState({
		colors: [
			successColor,
			'rgba(var(--mui-palette-success-mainChannel) / 0.7)',
		],
		stroke: { width: 0 },
		legend: { show: false },
		tooltip: { enabled: true, theme: 'false' },
		dataLabels: { enabled: false },
		labels: ['Completed', 'Remaining'],
		states: {
			hover: {
				filter: { type: 'none' }
			},
			active: {
				filter: { type: 'none' }
			}
		},
		grid: {
			padding: {
				top: -22,
				bottom: -18
			}
		},
		plotOptions: {
			pie: {
				customScale: 0.8,
				expandOnClick: false,
				donut: {
					size: '73%',
					labels: {
						show: true,
						name: {
							offsetY: 25,
							color: 'primary',
							fontFamily: theme.typography.fontFamily
						},

						// value: {
						// 	offsetY: -15,
						// 	fontWeight: 500,
						// 	formatter: val => `${val}`,
						// 	color: 'var(--mui-palette-text-primary)',
						// 	fontFamily: theme.typography.fontFamily,
						// 	fontSize: theme.typography.h3.fontSize
						// },
						total: {
							show: true,
							showAlways: true,
							label: '',
							value: 34,
							color: successColor,
							fontFamily: theme.typography.fontFamily,
							fontSize: theme.typography.body1.fontSize,
							formatter: () => `${completedPercentage}%`
						}
					}
				}
			}
		},
		responsive: [
			{
				breakpoint: theme.breakpoints.values.xl,
				options: {
					chart: { width: 200, height: 237 }
				}
			},
			{
				breakpoint: theme.breakpoints.values.md,
				options: {
					chart: { width: 150, height: 199 }
				}
			}
		]
	})

	let options = {
		colors: [
			successColor,
			'rgba(var(--mui-palette-success-mainChannel) / 0.7)',
		],
		stroke: { width: 0 },
		legend: { show: false },
		tooltip: { enabled: true, theme: 'false' },
		dataLabels: { enabled: false },
		labels: ['Completed', 'Remaining'],
		states: {
			hover: {
				filter: { type: 'none' }
			},
			active: {
				filter: { type: 'none' }
			}
		},
		grid: {
			padding: {
				top: -22,
				bottom: -18
			}
		},
		plotOptions: {
			pie: {
				customScale: 0.8,
				expandOnClick: false,
				donut: {
					size: '73%',
					labels: {
						show: true,
						name: {
							offsetY: 25,
							color: 'primary',
							fontFamily: theme.typography.fontFamily
						},
						value: {
							offsetY: -15,
							fontWeight: 500,
							formatter: val => `${val}`,
							color: 'var(--mui-palette-text-primary)',
							fontFamily: theme.typography.fontFamily,
							fontSize: theme.typography.h3.fontSize
						},
						total: {
							show: true,
							showAlways: true,
							label: '',
							value: 34,
							color: successColor,
							fontFamily: theme.typography.fontFamily,
							fontSize: theme.typography.body1.fontSize,
							formatter: () => `${completedPercentage}%`
						}
					}
				}
			}
		},
		responsive: [
			{
				breakpoint: theme.breakpoints.values.xl,
				options: {
					chart: { width: 200, height: 237 }
				}
			},
			{
				breakpoint: theme.breakpoints.values.md,
				options: {
					chart: { width: 150, height: 199 }
				}
			}
		]
	}

	useEffect(() => {
		options.plotOptions.pie.donut.labels.total.formatter = () => `${completedPercentage}%`
	}, [completedPercentage])

	useEffect(() => {
	}, [completedPercentage])

	const downloadCertificate = async () => {
		setCertificateDownloadLoading(true)

		try {
			const response = await fetch(`${DOWNLOAD_COURSE_COMPLETION_CERTIFICATE}${studentId}/${courseId}`, {
				method: "GET",
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
					'X-CSRFToken': csrfToken
				}
			})

			if (!response.ok) {
				throw new Error("Failed to fetch PDF")
			}

			// Get the PDF blob
			const blob = await response.blob()

			// Create a link element for download
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement("a")

			a.href = url
			a.download = "microcredentials-certificate.pdf"
			document.body.appendChild(a);
			a.click()

			// Cleanup
			a.remove()
			window.URL.revokeObjectURL(url)

			setTimeout(() => {
				setCertificateDownloadLoading(false)
				toast.success('Certificate downloaded successfully!')
			}, 2500)
		} catch (error) {
			setCertificateDownloadLoading(false)
			toast.error('Certificate download failed!')
		}
	}

	return (
		<div className="my-3 lg:my-5">
			<div className="flex items-center justify-center">
				{
					completedPercentage === 100 && enrollment?.course?.is_completed ?
						<div>
							<Button
								className="border rounded-md bg-primary text-white p-2 lg:p-3"
								disabled={certificateDownloadLoading}
								onClick={downloadCertificate}
							>
								Download Certificate
							</Button>
						</div>
						:
						<div>
							<div className="mb-4 lg:mb-7 flex items-center justify-center">
								{
									completedPercentage &&
									<AppReactApexCharts type='donut' width={150} height={177} series={[completedPercentage, 100 - completedPercentage]} options={options} />
								}
							</div>
							<div className="border border-primary p-2 lg:p-4">
								<Typography variant='h5' className="text-center">Notice</Typography>
								<Divider className="my-3 lg:my-4" />
								<p className="text-center">
									You have completed {completedPercentage}% of the course.
								</p>
								{/* <p className="text-center">
									You can download the course completion certificate after completing the course.
								</p> */}
							</div>
						</div>
				}
			</div>
		</div>
	)
}

export default CertificateTab;
