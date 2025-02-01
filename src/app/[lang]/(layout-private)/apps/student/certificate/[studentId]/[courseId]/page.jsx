'use client'

import { useEffect, useState } from 'react'

import { useRouter, useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import moment from 'moment'

import { Typography } from '@mui/material'

import { getLocalizedUrl } from '@/utils/i18n'

import { GET_COURSE_COMPLETION_CERTIFICATE_DATA } from '@/constants/constants';

const DownloadCertificate = () => {
    const isInstructor = useSelector(state => state.user.is_instructor)
    const isStudent = useSelector(state => state.user.is_student)

    if (!isInstructor && !isStudent) {
        router.replace(getLocalizedUrl('/', locale))
    }

    const accessToken = useSelector(state => state.authentication.accessToken)
    const csrfToken = useSelector(state => state.authentication.csrfToken)

    const router = useRouter()
    const { lang: locale, studentId, courseId } = useParams()

    const [loading, setLoading] = useState(false)
    const [enrollment, setEnrollment] = useState(null)

    // months
    const diffInMonths = moment(enrollment?.completed_at).diff(moment(enrollment?.enrolled_at), 'months');

    // Calculate the remaining days after the months difference
    const remainingDays = moment(enrollment?.completed_at).diff(moment(enrollment?.enrolled_at).clone().add(diffInMonths, 'months'), 'days');

    useEffect(() => {
        if (isInstructor || isStudent) {
            getCourseCompletionCertificateData()
        }
    }, [])

    function getCourseCompletionCertificateData() {
        setLoading(true)

        const authHeaders = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken
            }
        }

        try {
            fetch(`${GET_COURSE_COMPLETION_CERTIFICATE_DATA}${studentId}/${courseId}`, authHeaders)
                .then(res => {
                    if (res.ok && [200, 201].includes(res.status)) {
                        return res.json()
                    }

                    throw new Error(`Certificate data get failed with status code ${res.status}`)
                })
                .then(data => {
                    data?.enrollment && setEnrollment(data?.enrollment)
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                })
        } catch (err) {
            setLoading(false)
        }
    }

    const downloadCertificate = async () => {
        const certificateElement = document.getElementById('certificate');

        // Temporarily remove border, shadow, and set background to white for clean capture
        certificateElement.style.boxShadow = 'none';
        certificateElement.style.border = '8px solid gray';
        certificateElement.style.borderStyle = 'double';
        certificateElement.style.backgroundColor = '#ffffff';

        // Capture the certificate as an image
        const canvas = await html2canvas(certificateElement);
        const imgData = canvas.toDataURL('image/png');

        // Restore original styles after capture
        certificateElement.style.boxShadow = '';
        certificateElement.style.border = '';
        certificateElement.style.backgroundColor = '';

        // Create PDF with A4 dimensions
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm

        // Calculate the image width and height to maintain aspect ratio
        const imgWidth = pageWidth - 20; // Adjust for margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // If the image height exceeds A4 page height, scale to fit
        if (imgHeight > pageHeight - 20) {
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, pageHeight - 20);
        } else {
            pdf.addImage(imgData, 'PNG', 10, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
        }

        // Download the PDF
        pdf.save("certificate.pdf");
    };

    return (
        <div>
            {
                !loading ?
                    enrollment ?
                        <div>
                            <Typography variant='h4'>Certificate</Typography>
                            <div className="flex justify-center mt-5">
                                <div id="certificate" className="bg-white border border-gray-300 shadow-md rounded-lg p-10 w-full max-w-3xl">
                                    <div className="text-center mb-8">
                                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate of Completion</h1>
                                        <p className="text-lg text-gray-600">This certificate is awarded to</p>
                                    </div>
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-semibold text-blue-600 mb-4" id="studentName">{enrollment?.student?.name} {enrollment?.student?.last_name}</h2>
                                        <h2 className="text-lg font-bold text-blue-600 mb-4" id="studentId">Student ID: 24000{enrollment?.student?.id}</h2>
                                        <p className="text-lg text-gray-700">For successfully completing the course,</p>
                                        <h3 className="text-2xl font-semibold text-gray-800 mt-2" id="courseName">{enrollment?.course?.name}</h3>
                                    </div>
                                    <div className="text-center my-6">
                                        <p className="text-gray-600">Awarded on</p>
                                        <p className="text-lg font-semibold text-gray-800" id="completionDate">{moment(enrollment?.completed_at).format('LL')}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-8">
                                        <div className="text-center">
                                            <p className="text-gray-600">Instructor</p>
                                            <p className="font-semibold text-gray-800">{enrollment?.course?.instructor?.name} {enrollment?.course?.instructor?.last_name}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-600">Course Duration</p>
                                            <p>
                                                <span className="font-semibold text-gray-800">{diffInMonths && `${diffInMonths} ${diffInMonths > 1 ? 'months' : 'month'}`}</span>{' '}
                                                <span className="font-semibold text-gray-800">{remainingDays && `${remainingDays} ${remainingDays > 1 ? 'days' : 'day'}`}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center mt-10">
                                        <p className="text-sm text-gray-500 italic">This certificate is valid and recognized by &lsquo;Latinos in Action&lsquo;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <button onClick={downloadCertificate} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-blue-700 hover:cursor-pointer">Download Certificate</button>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center">
                            <Typography variant='h4'>Certificate not found</Typography>
                        </div>
                    :
                    ''

            }

        </div>
    )
}

export default DownloadCertificate
