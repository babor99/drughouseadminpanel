import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } from 'app/constant/permission/permission';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import FuseLoading from '@fuse/core/FuseLoading';
import PagenotFound from '../../Pagenotfound/PagenotFound';
import reducer from '../store/index';
import { getRole, newRole, resetRole } from '../store/roleSlice';
import NewRoleHeader from './NewRoleHeader';
import RoleForm from './RoleForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.matches(/^[a-zA-Z0-9\s]*$/, 'Name should only contain alphabets, numeric keys, and spaces')
		.matches(/^[^\s]*(\s[^\s]+)*$/, 'Consecutive double spaces between characters are not allowed')
		.required('Name is required'),
	permissions: yup.array().notRequired()
});

const NewRole = () => {
	const userPermissions = useSelector(state => state.data.userPermissions);
	const isAdmin = useSelector(state => state.user.is_admin);
	const [renderComponent, setRenderComponent] = useState('LOADING');

	useEffect(() => {
		userPermissions.includes(ROLE_CREATE) ? setRenderComponent('SHOW') : setRenderComponent('404');
	}, [userPermissions]);

	const dispatch = useDispatch();
	const role = useSelector(({ rolesManagement }) => rolesManagement.role);
	const routeParams = useParams();
	const [noRole, setNoRole] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateRoleState() {
			const { roleId } = routeParams;
			if (roleId === 'new') {
				localStorage.removeItem('deleteRole');
				localStorage.removeItem('updateRole');

				dispatch(newRole());
			} else {
				/**
				 * Get User data
				 */
				dispatch(getRole(routeParams)).then(action => {
					/**
					 * If the requested role is not exist show message
					 */
					if (!action.payload) {
						setNoRole(true);
					}
				});
			}
		}

		updateRoleState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!role) {
			return;
		}
		/**
		 * Reset the form on role state changes
		 */
		reset(role);
	}, [role, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Role on component unload
			 */
			dispatch(resetRole());
			setNoRole(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested Roles is not exists
	 */
	if (noRole) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such role!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/roles-management/roles"
					color="inherit"
				>
					Go to Role Page
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	//  if (_.isEmpty(form) || (employee && routeParams.employeeId !== employee.id && routeParams.employeeId !== 'new')) {
	//     return <FuseLoading />;
	// }

	const Component = (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<NewRoleHeader />}
				content={
					<div className="p-16 sm:p-24  ">
						<RoleForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);

	return isAdmin ? (
		Component
	) : renderComponent === 'LOADING' ? (
		<FuseLoading />
	) : renderComponent === 'SHOW' ? (
		Component
	) : (
		<PagenotFound />
	);
};

export default withReducer('rolesManagement', reducer)(NewRole);
