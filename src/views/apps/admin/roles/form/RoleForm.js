import _ from '@lodash';
import { Checkbox, FormControlLabel } from '@material-ui/core';
// import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveRole, updateRole } from '../store/roleSlice';

const RoleForm = props => {
	const dispatch = useDispatch();
	//const thanas = useSelector(state => state.data.thanas);
	const methods = useFormContext();
	const { control, watch, formState, reset, getValues, setError } = methods;
	const image = watch('image', []);
	const { errors, isValid, dirtyField } = formState;
	const permissions = useSelector(state => state.data.permissions);

	const routeParams = useParams();
	const history = useHistory();
	const handleDelete = localStorage.getItem('updateRole');

	const name = watch('name');
	const permissionss = watch('permissions');

	function handleSaveRole() {
		dispatch(saveRole(getValues())).then(res => {
			if (res.payload.data?.id) {
				localStorage.setItem('roleAlertPermission', 'saveRoleSuccessfully');
				history.push('/apps/roles-management/roles');
			} else if (res.payload.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
			}
		});
	}

	function handleUpdateRole() {
		dispatch(updateRole(getValues())).then(res => {
			if (res.payload.data?.id) {
				localStorage.setItem('roleAlert', 'updateRole');
				history.push('/apps/roles-management/roles');
			} else if (res.payload.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
			}
		});
	}

	const handleSubmitOnKeyDownEnter = ev => {
		if (ev.key === 'Enter') {
			if (routeParams.roleId === 'new' && !(!name || _.isEmpty(permissionss))) {
				handleSaveRole();
			} else if (handleDelete == 'updateRole') {
				handleUpdateRole();
			}
		}
	};

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name || !field.value}
						autoFocus
						helperText={errors?.name?.message}
						label="Name"
						id="name"
						variant="outlined"
						fullWidth
						required
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						onKeyDown={handleSubmitOnKeyDownEnter}
					/>
				)}
			/>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Controller
					name={`all`}
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label={`ALL`}
								control={
									<Checkbox
										{...field}
										color="primary"
										required={false}
										onChange={event => {
											field.onChange(event);

											let uniqPermissinsIds = _.uniq(getValues()?.permissions);

											if (event.target.checked) {
												permissions?.map((permission, indx) => {
													uniqPermissinsIds.push(permission.id);
												});
												reset({ ...getValues(), permissions: _.uniq(uniqPermissinsIds) });
											} else {
												reset({ ...getValues(), permissions: [] });
											}
										}}
										checked={field.value ? field.value : false}
									/>
								}
							/>
						</FormControl>
					)}
				/>

				{permissions.map(permission => {
					return (
						<Controller
							key={permission?.id}
							name={`permission${permission?.id}`}
							control={control}
							render={({ field }) => (
								<FormControl>
									<FormControlLabel
										label={`${permission.name}`}
										control={
											<Checkbox
												{...field}
												required={false}
												color="primary"
												// onChange={(event) => handleOnChange(event)}
												checked={
													getValues()?.permissions?.find(id => id == permission?.id) || false
												}
												onChange={event => {
													if (event.target.checked) {
														const unicPermissionIds = _.uniq(getValues()?.permissions);
														reset({
															...getValues(),
															permissions: [...unicPermissionIds, permission?.id]
														});
													} else {
														let removableId = getValues()?.permissions?.indexOf(
															permission?.id
														);
														let permissionIdAll = _.uniq(getValues()?.permissions);
														permissionIdAll.splice(removableId, 1);
														reset({ ...getValues(), permissions: permissionIdAll });
													}
												}}
											/>
										}
									/>
								</FormControl>
							)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RoleForm;
