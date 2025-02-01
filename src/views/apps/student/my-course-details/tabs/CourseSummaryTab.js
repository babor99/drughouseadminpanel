import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import DOMPurify from 'dompurify'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

function SummaryTab({ enrollment, currentLecture, totalLecturesCount }) {

	return (
		<div className="w-full">
			<div className='flex flex-col gap-6 p-5'>
				<div className='flex flex-col gap-4'>
					<Typography variant='h5'>About this course</Typography>
					<Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(enrollment?.course?.short_description) }}></Typography>
				</div>
				<Divider />
				<div className='flex flex-col gap-4'>
					<Typography variant='h5'>By the numbers</Typography>
					<div className='flex flex-wrap justify-between gap-x-12 gap-y-2'>
						<List role='list' component='div' className='flex flex-col gap-2 plb-0'>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-check text-xl text-textSecondary' />
								<Typography>Skill level: {enrollment?.skillLevel}</Typography>
							</ListItem>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-users text-xl text-textSecondary' />
								<Typography>Students: {enrollment?.totalStudents?.toLocaleString()}</Typography>
							</ListItem>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-world text-xl text-textSecondary' />
								<Typography>Languages: {enrollment?.course?.language}</Typography>
							</ListItem>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-file text-xl text-textSecondary' />
								<Typography>Captions: {enrollment?.course?.has_caption ? 'Yes' : 'No'}</Typography>
							</ListItem>
						</List>
						<List role='list' component='div' className='flex flex-col gap-2 plb-0'>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-video text-xl text-textSecondary' />
								<Typography>Lectures: {totalLecturesCount}</Typography>
							</ListItem>
							<ListItem role='listitem' className='flex items-center gap-2 p-0'>
								<i className='tabler-clock text-xl text-textSecondary' />
								<Typography>Video: {totalLecturesCount}</Typography>
							</ListItem>
						</List>
					</div>
				</div>
				<Divider />
				<div className='flex flex-col gap-4'>
					<Typography variant='h5'>Description</Typography>
					<Typography className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(enrollment?.course?.description) }}></Typography>
				</div>
				<Divider />
				<div className='flex flex-col gap-4'>
					<Typography variant='h5'>Instructor</Typography>
					<div className='flex items-center gap-4'>
						<CustomAvatar skin='light-static' color='error' src={enrollment?.course?.instructor?.image} size={38} />
						<div className='flex flex-col gap-1'>
							<Typography className='font-medium' color='text.primary'>
								{enrollment?.course?.instructor?.name} {enrollment?.course?.instructor?.last_name}
							</Typography>
							<Typography variant='body2'>{enrollment?.course?.instructor?.designation}</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SummaryTab;
