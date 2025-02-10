import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ROLE_MENU_CREATE } from 'app/constant/permission/permission';
import { getUserPermissionsWP } from 'app/store/dataSlice';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRoleMenusSearchText } from '../store/roleMenusSlice';

const useStyles = makeStyles(theme => ({
	alert: props => ({
		width: '20%',
		height: '35px',
		position: 'fixed',
		right: '30px',
		paddingTop: '0px',
		fontSize: '15px',
		borderRadius: '15px',
		transitionTimingFunction: 'ease-out',
		zIndex: props ? '1' : '-1',
		transition: props ? '0s' : '1s',
		opacity: props ? 1 : 0
	})
}));

const RoleMenusHeader = () => {
	const userPermissions = useSelector(state => state.data.userPermissions);
	const isAdmin = useSelector(state => state.user.is_admin);

	const dispatch = useDispatch();

	const mainTheme = useSelector(selectMainTheme);
	const searchText = useSelector(({ roleMenusManagement }) => roleMenusManagement.roleMenus.searchText);

	useEffect(() => {
		dispatch(setRoleMenusSearchText(''))
		dispatch(getUserPermissionsWP());
	}, []);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Icon
					component={motion.span}
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.2 } }}
					className="text-24 md:text-32"
				>
					person
				</Icon>
				<Typography
					component={motion.span}
					initial={{ x: -10 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
				>
					Role Menu
				</Typography>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Search by role"
							className="flex flex-1 mx-8"
							disableUnderline
							fullWidth
							inputProps={{
								'aria-label': 'Search'
							}}
							onKeyDown={ev => {
								if (ev.key === 'Enter') {
									dispatch(setRoleMenusSearchText(ev?.target.value));
								} else if (ev.key === 'Backspace' && ev.target.value?.length === 1) {
									dispatch(setRoleMenusSearchText(''));
								}
							}}
						/>
					</Paper>
				</ThemeProvider>
			</div>
			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				{(isAdmin || userPermissions.includes(ROLE_MENU_CREATE)) && (
					<Button
						component={Link}
						to="/apps/roleMenu-management/new"
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
					>
						<span className="hidden sm:flex">Add New</span> <span className="flex sm:hidden">New</span>
					</Button>
				)}
			</motion.div>
		</div>
	);
};

export default RoleMenusHeader;
