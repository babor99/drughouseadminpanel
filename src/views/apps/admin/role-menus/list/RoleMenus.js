import FusePageCarded from '@fuse/core/FusePageCarded';
import { ROLE_MENU_LIST } from 'app/constant/permission/permission';
import { getUserPermissionsWP } from 'app/store/dataSlice';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import PagenotFound from '../../Pagenotfound/PagenotFound';
import reducer from '../store/index';
import RoleMenusHeader from './RoleMenusHeader';
import RoleMenusTable from './RoleMenusTable';


const RoleMenus = () => {
	const userPermissions = useSelector(state => state.data.userPermissions);
	const isAdmin = useSelector(state => state.user.is_admin);
	const [renderComponent, setRenderComponent] = useState('LOADING');

	useEffect(() => {
		userPermissions.includes(ROLE_MENU_LIST) ? setRenderComponent('SHOW') : setRenderComponent('404');
	}, [userPermissions]);

	const Component = (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<RoleMenusHeader />}
			content={<RoleMenusTable />}
			innerScroll
		/>
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

export default withReducer('roleMenusManagement', reducer)(RoleMenus);
