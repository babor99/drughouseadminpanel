import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import { ROLE_MENU_CREATE, ROLE_MENU_DELETE, ROLE_MENU_UPDATE } from 'app/constant/permission/permission';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import FuseLoading from '@fuse/core/FuseLoading';
import PagenotFound from '../../Pagenotfound/PagenotFound';
import reducer from '../store/index';
import { getRoleMenu, newRoleMenu, resetRoleMenu } from '../store/roleMenuSlice';
import NewRoleMenuHeader from './NewRoleMenuHeader';
import RoleMenuForm from './RoleMenuForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	role: yup.string().required('Role is required')
});

const RoleMenu = () => {
	const userPermissions = useSelector(state => state.data.userPermissions);
	const isAdmin = useSelector(state => state.user.is_admin);
	const [renderComponent, setRenderComponent] = useState('LOADING');

	useEffect(() => {
		userPermissions.includes(ROLE_MENU_CREATE) ? setRenderComponent('SHOW') : setRenderComponent('404');
	}, [userPermissions]);

	const dispatch = useDispatch();
	const roleMenu = useSelector(({ roleMenusManagement }) => roleMenusManagement.roleMenu);

	const [noRoleMenu, setNoRoleMenu] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset, getValues } = methods;

	useDeepCompareEffect(() => {
		function updateRoleMenuState() {
			const { roleMenuId } = routeParams;

			if (roleMenuId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newRoleMenu());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getRoleMenu(roleMenuId)).then(action => {
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoRoleMenu(true);
					}
				});
			}
		}

		updateRoleMenuState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!roleMenu) {
			return;
		}
		/**
		 * Reset the form on roleMenu state changes
		 */
		reset({ ...getValues(), ...roleMenu });
	}, [roleMenu, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset RoleMenu on component unload
			 */
			dispatch(resetRoleMenu());
			setNoRoleMenu(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noRoleMenu) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such roleMenu!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/"
					color="inherit"
				>
					Go to RoleMenu Page
				</Button>
			</motion.div>
		);
	}

	const Component = (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<NewRoleMenuHeader />
				}
				content={
					<div className="p-16 sm:p-24  ">
						<RoleMenuForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	)

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
export default withReducer('roleMenusManagement', reducer)(RoleMenu);
