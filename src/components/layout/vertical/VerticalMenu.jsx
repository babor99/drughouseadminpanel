// Next Imports
import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  const isAdmin = useSelector(state => state.user.is_admin)
  const isRPM = useSelector(state => state.user.is_rpm)
  const isStudent = useSelector(state => state.user.is_student)
  const isTeacher = useSelector(state => state.user.is_teacher)
  const isInstructor = useSelector(state => state.user.is_instructor)

  // Vars
  const { lang: locale } = params
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/apps/dashboard`} icon={<i className='tabler-layout-dashboard' />}>
          Dashboard
        </MenuItem>
        {
          isAdmin ?
            (
              <>
                <MenuItem href={`/${locale}/apps/admin/orders`} icon={<i className='tabler-garden-cart' />}>
                  Orders
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/products`} icon={<i className='tabler-brand-producthunt' />}>
                  Products
                </MenuItem>
                <SubMenu
                  label="Access Control"
                  title="Access Control"
                  icon={<i className='tabler-lock-access' />}

                // suffix={<CustomChip label='1' size='small' color='error' round='true' />}
                >
                  <MenuItem href={`/${locale}/apps/admin/employees`} icon={<i className='tabler-users' />}>Employees</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/roles`} icon={<i className='tabler-lock-cog' />}>Roles</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/role-menus`} icon={<i className='tabler-lock-code' />}>Role Menus</MenuItem>
                </SubMenu>
                <SubMenu
                  label="Settings"
                  title="Settings"
                  icon={<i className='tabler-settings' />}

                // suffix={<CustomChip label='1' size='small' color='error' round='true' />}
                >
                  <MenuItem href={`/${locale}/apps/admin/product-categories`} icon={<i className='tabler-category' />}>Product Categories</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/product-types`} icon={<i className='tabler-category-2' />}>Product Types</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/manufacturers`} icon={<i className='tabler-users' />}>Manufacturers</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/payment-methods`} icon={<i className='tabler-brand-visa' />}>Payment Methods</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/order-statuses`} icon={<i className='tabler-status-change' />}>Order Statuses</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/discount-types`} icon={<i className='tabler-discount' />}>Discount Types</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/countries`} icon={<i className='tabler-map-pin' />}>Countries</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/states`} icon={<i className='tabler-map-pins' />}>States</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/districts`} icon={<i className='tabler-map-pins' />}>Districts</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/cities`} icon={<i className='tabler-map-pins' />}>Cities</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/areas`} icon={<i className='tabler-map-pins' />}>Areas</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/branches`} icon={<i className='tabler-git-branch' />}>Branches</MenuItem>
                </SubMenu>
              </>
            )
            :
            ''
        }

        {/* <MenuItem href={`/${locale}/apps/student/course-details`} icon={<i className='tabler-chart-pie-2' />}>
          Course Details
        </MenuItem> */}
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
