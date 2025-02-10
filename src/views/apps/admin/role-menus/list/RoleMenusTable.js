import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import { rowsPerPageOptions } from 'app/@data/data';
import { SEARCH_ROLEMENU } from 'app/constant/constants';
import { ROLE_MENU_DELETE, ROLE_MENU_UPDATE } from 'app/constant/permission/permission';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoleMenus, selectRoleMenus } from '../store/roleMenusSlice';
import RoleMenusTableHead from './RoleMenusTableHead';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		overflow: 'auto',
		minHeight: '35px'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	}
}));

const RoleMenusTable = props => {
	const userPermissions = useSelector(state => state.data.userPermissions);
	const isAdmin = useSelector(state => state.user.is_admin);
	const dispatch = useDispatch();
	const classes = useStyles();
	const roleMenus = useSelector(selectRoleMenus);
	const searchText = useSelector(({ roleMenusManagement }) => roleMenusManagement.roleMenus.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(100);
	const [parameters, setParameters] = useState({ page: 1, size: 100 });

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	let serialNumber = 1;
	const totalPages = sessionStorage.getItem('total_roleMenus_pages');
	const totalElements = sessionStorage.getItem('total_roleMenus_elements');

	useEffect(() => {
		dispatch(getRoleMenus({ ...parameters, keyword: searchText })).then(() => setLoading(false));
	}, [dispatch, searchText, page, rowsPerPage, parameters?.page, parameters?.size]);

	// useEffect(() => {
	// 	searchText ? getSearchRoleMenu() : setSearchRoleMenu([]);
	// }, [searchText]);

	// const getSearchRoleMenu = () => {
	// 	const authTOKEN = {
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 			Authorization: localStorage.getItem('jwt_access_token')
	// 		}
	// 	};
	// 	setLoading(true);
	// 	fetch(`${SEARCH_ROLEMENU}?key=${searchText}`, authTOKEN)
	// 		.then(response => response.json())
	// 		.then(searchedRoleMenuData => {
	// 			setSearchRoleMenu(searchedRoleMenuData?.role_menus);
	// 			setLoading(false);
	// 		})
	// 		.catch(() => setSearchRoleMenu([]));
	// };

	function handleRequestSort(roleMenuEvent, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(roleMenuEvent) {
		if (roleMenuEvent.target.checked) {
			setSelected(roleMenus.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateRoleMenu(item) {
		localStorage.removeItem('roleMenuEvent');
		props.history.push(`/apps/roleMenu-management/roleMenus/${item.id}/${item.role}`);
	}

	function handleDeleteRoleMenu(item, roleMenuEvent) {
		localStorage.removeItem('roleMenuEvent');
		localStorage.setItem('roleMenuEvent', roleMenuEvent);
		props.history.push(`/apps/roleMenu-management/roleMenus/${item.id}/${item.role}`);
	}

	function handleCheck(roleMenuEvent, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	//pagination
	const handlePagination = (e, handlePage) => {
		setParameters({ ...parameters, page: handlePage });
		setPage(handlePage - 1);
		// dispatch(getRoleMenus({ ...parameters, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setParameters({ ...parameters, page: value + 1 });
		// dispatch(getRoleMenus({ ...parameters, page: value + 1 }));
	}

	function handleChangeRowsPerPage(roleMenuEvent) {
		setRowsPerPage(roleMenuEvent.target.value);
		setParameters({ ...parameters, size: roleMenuEvent.target.value });
		// dispatch(getRoleMenus({ ...parameters, size: roleMenuEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (roleMenus?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					No role menus found!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<RoleMenusTableHead
						selectedRoleMenuIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={roleMenus.length}
						onMenuItemClick={handleDeselect}
					/>
					<TableBody>
						{_.orderBy(
							roleMenus,
							[
								o => {
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						).map(n => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="h-10 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
								>
									{/* <TableCell className="w-40 md:w-64 text-center" padding="none">
										<Checkbox
											checked={isSelected}
											onClick={roleMenuEvent => roleMenuEvent.stopPropagation()}
											onChange={roleMenuEvent => handleCheck(roleMenuEvent, n.id)}
										/>
									</TableCell> */}

									<TableCell className="w-40  md:w-64" component="th" scope="row">
										{parameters.page * parameters.size - parameters.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 w-1/3 md:p-12" component="th" scope="row">
										{n.role}
									</TableCell>

									<TableCell className="p-4 w-1/3 md:p-12" align="center" component="th" scope="row">
										<div>
											{(isAdmin || userPermissions.includes(ROLE_MENU_UPDATE)) && (
												<EditIcon
													onClick={roleMenuEvent => handleUpdateRoleMenu(n)}
													className="cursor-pointer custom-edit-icon-style"
												/>
											)}
											{(isAdmin || userPermissions.includes(ROLE_MENU_DELETE)) && (
												<DeleteIcon
													onClick={event => handleDeleteRoleMenu(n, 'Delete')}
													className="cursor-pointer custom-delete-icon-style"
												/>
											)}
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div className={classes.root} id="pagiContainer">
				<Pagination
					classes={{ ul: 'flex-nowrap' }}
					count={totalPages}
					page={page + 1}
					defaultPage={1}
					color="primary"
					showFirstButton
					showLastButton
					variant="outlined"
					shape="rounded"
					onChange={handlePagination}
				/>

				<TablePagination
					classes={{ root: 'overflow-visible' }}
					rowsPerPageOptions={rowsPerPageOptions}
					component="div"
					count={totalElements}
					rowsPerPage={rowsPerPage}
					page={page}
					className={classes.toolbar}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
						className: 'py-0'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
						className: 'py-0'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
};

export default withRouter(RoleMenusTable);
