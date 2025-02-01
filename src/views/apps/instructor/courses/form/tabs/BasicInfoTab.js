import dynamic from 'next/dynamic';

import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Grid, Typography, Autocomplete, Switch } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const CustomTinyMCEEditor = dynamic(() => import('@/components/custom/TinyMCEEditor'), { ssr: false });

function BasicInfoTab() {
	const categoryOptions = useSelector(state => state.data.courseCategorys)

	const methods = useFormContext();
	const { control, formState, getValues, setValue } = methods;
	const { errors, isValid, dirtyFields } = formState;

	return (
		<Grid container className="my-5" gap={1}>
			<Grid item xs={12} md={2} className="my-3 lg:my-5 flex items-center justify-sart">
				<Typography>Course Title*</Typography>
			</Grid>
			<Grid item xs={12} md={9} className="my-3 lg:my-5">
				<Controller
					name="name"
					control={control}
					render={({ field }) => {
						return (
							<CustomTextField
								{...field}
								fullWidth
								id="name"
								variant="outlined"
								placeholder="Theory of Computation"
								error={!!errors.name || !field.value}
								helperText={errors?.name?.message}
								InputLabelProps={field.value && { shrink: true }}
							/>
						);
					}}
				/>
			</Grid>

			<Grid item xs={12} md={2} className="my-3 lg:my-5 flex items-center justify-sart">
				<Typography>Category*</Typography>
			</Grid>
			<Grid item xs={12} md={9} className="my-3 lg:my-5">
				<Controller
					name="category"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							fullWidth
							options={categoryOptions}
							value={value ? categoryOptions.find(category => category.id === value) : null}
							getOptionLabel={option => `${option?.name}`}
							onChange={(event, newValue) => {

								onChange(newValue?.id)
							}}
							renderInput={params => {
								return (
									<CustomTextField
										{...params}
										placeholder="Select category"
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
					)}
				/>
			</Grid>

			<Grid item xs={12} md={2} className="my-3 lg:my-5 flex items-center justify-sart">
				<Typography>Language*</Typography>
			</Grid>
			<Grid item xs={12} md={9} className="my-3 lg:my-5">
				<Controller
					name="language"
					control={control}
					render={({ field }) => {
						return (
							<CustomTextField
								{...field}
								fullWidth
								id="language"
								variant="outlined"
								placeholder="English"
								error={!!errors.language || !field.value}
								helperText={errors?.language?.message}
								InputLabelProps={field.value && { shrink: true }}
							/>
						);
					}}
				/>
			</Grid>

			<Grid item xs={12} md={2} className="my-3 lg:my-5 flex items-center justify-sart">
				<Typography>Short Description*</Typography>
			</Grid>
			<Grid item xs={12} md={9} className="my-3 lg:my-5">
				<Controller
					name="short_description"
					control={control}
					render={({ field }) => {
						return (
							<CustomTextField
								{...field}
								fullWidth
								placeholder="Short description..."

							/>
						);
					}}
				/>
			</Grid>

			<Grid item xs={12} md={2} className="my-3 lg:my-5 flex items-center justify-sart">
				<Typography>Description*</Typography>
			</Grid>
			<Grid item xs={12} md={9} className="my-3 lg:my-5">
				<Controller
					name="description"
					control={control}
					render={({ field: { value } }) => {
						return (
							<CustomTinyMCEEditor
								id='tiny-description'
								value={value}
								setValue={(val) => setValue('description', val)}
							/>
						);
					}}
				/>
			</Grid>

			<Grid item xs={12} className="my-3 lg:my-5">
				<div className='flex items-center justify-start'>
					<Typography>Is completed?</Typography>
					<Controller
						name="is_completed"
						control={control}
						render={({ field }) => {
							return (
								<Switch
									{...field}
									id="is_completed"
									checked={field.value}
								/>
							);
						}}
					/>
				</div>
			</Grid>
			<Grid item xs={12} className="my-3 lg:my-5">
				<div className='flex items-center justify-start'>
					<Typography>Has Caption?</Typography>
					<Controller
						name="has_caption"
						control={control}
						render={({ field }) => {
							return (
								<Switch
									{...field}
									id="has_caption"
									checked={field.value}
								/>
							);
						}}
					/>
				</div>
			</Grid>
			<Grid item xs={12} className="my-3 lg:my-5">
				<div className='flex items-center justify-start'>
					<Typography>Is Premium?</Typography>
					<Controller
						name="is_premium"
						control={control}
						render={({ field }) => {
							return (
								<Switch
									{...field}
									id="is_premium"
									checked={field.value}
								/>
							);
						}}
					/>
				</div>
			</Grid>

		</Grid>
	)
}

export default BasicInfoTab;
