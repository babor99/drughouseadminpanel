import React, { useEffect, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material'

function MediaTab() {

	const methods = useFormContext();
	const { control, getValues, watch } = methods;

	const image = watch('thumbnail')
	const [previewImage, setPreviewImage] = useState(null)

	const formatPhoneNumber = (input) => {
		const cleaned = ('' + input).replace(/\D/g, '');
		const sliced = cleaned.slice(0, 10)
		const match = sliced.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}

		return input;
	};

	return (
		<Grid container className="my-5">
			<Grid item xs={12}>
				<Typography variant='h5' className="mt-3 mb-8 text-center">
					Upload Thumbnail
				</Typography>
				<div className="flex items-center justify-center">
					<div className="">
						<Controller
							name="thumbnail"
							control={control}
							render={({ field: { onChange, value } }) => (
								<label
									htmlFor="button-file"
									className="flex items-center justify-center relative w-128 h-128 mx-12 overflow-hidden cursor-pointer shadow hover:shadow-lg mb-5"
								>
									<input
										accept="image/*"
										className="hidden"
										id="button-file"
										type="file"
										onChange={async e => {
											const reader = new FileReader();

											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewImage(reader.result);
												}
											};

											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											onChange(file);
										}}
									/>
									<i className="tabler-cloud-upload" style={{ width: '90px', height: '90px' }} />
								</label>
							)}
						/>
						{image && !previewImage && (
							<img src={`${image}`} style={{ width: '300px', height: '200px' }} alt="Not found" />
						)}

						{
							previewImage && (
								<img src={previewImage} style={{ width: '300px', height: '200px' }} alt="Not found" />
							)
						}
					</div>
				</div>
			</Grid>
		</Grid>
	)
}

export default MediaTab;
