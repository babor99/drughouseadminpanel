import Typography from '@mui/material/Typography'

import DOMPurify from 'dompurify'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

function SummaryTab({ enrollment, currentLecture, totalLecturesCount }) {

	return (
		<div className="w-full">
			<div className='flex flex-col gap-6 p-5'>
				<div className='flex flex-col gap-4'>
					<div className="text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentLecture?.summary?.replace(/\\n/g, "<br>")).replace(/^"|"$/g, "") }} />
				</div>
			</div>
		</div>
	)
}

export default SummaryTab;
