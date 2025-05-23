// Next Imports
import { useParams } from 'next/navigation'

import { useSelector } from 'react-redux'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Component Imports
import HorizontalNav, { Menu, SubMenu, MenuItem } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateHorizontalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ level }) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const params = useParams()

  const isAdmin = useSelector(state => state.user.is_admin)
  const isRPM = useSelector(state => state.user.is_rpm)
  const isStudent = useSelector(state => state.user.is_student)
  const isTeacher = useSelector(state => state.user.is_teacher)

  // Vars
  const { lang: locale } = params
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-paper)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        <MenuItem href={`/${locale}/apps/dashboard`} icon={<i className='tabler-smart-home' />}>
          Dashboard
        </MenuItem>
        {
          isAdmin ?
            (
              <>
                <MenuItem href={`/${locale}/apps/store/orders/new`} icon={<i className='tabler-shopping-cart-plus' />}>
                  New Order
                </MenuItem>
                <MenuItem href={`/${locale}/apps/store/orders`} icon={<i className='tabler-garden-cart' />}>
                  Orders
                </MenuItem>
                <MenuItem href={`/${locale}/apps/store/products`} icon={<i className='tabler-brand-producthunt' />}>
                  Products
                </MenuItem>
                <SubMenu
                  label="Access Control"
                  title="Access Control"
                  icon={<i className='tabler-lock-access' />}

                // suffix={<CustomChip label='1' size='small' color='error' round='true' />}
                >
                  <MenuItem href={`/${locale}/apps/store/employees`} icon={<i className='tabler-users' />}>Employees</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/roles`} icon={<i className='tabler-lock-cog' />}>Roles</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/role-menus`} icon={<i className='tabler-lock-code' />}>Role Menus</MenuItem>
                </SubMenu>
                <SubMenu
                  label="Settings"
                  title="Settings"
                  icon={<i className='tabler-settings' />}

                // suffix={<CustomChip label='1' size='small' color='error' round='true' />}
                >
                  <MenuItem href={`/${locale}/apps/store/product-categories`} icon={<i className='tabler-category' />}>Product Categories</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/product-types`} icon={<i className='tabler-category-2' />}>Product Types</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/manufacturers`} icon={<i className='tabler-users' />}>Manufacturers</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/payment-methods`} icon={<i className='tabler-brand-visa' />}>Payment Methods</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/order-statuses`} icon={<i className='tabler-status-change' />}>Order Statuses</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/discount-types`} icon={<i className='tabler-discount' />}>Discount Types</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/countries`} icon={<i className='tabler-map-pin' />}>Countries</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/states`} icon={<i className='tabler-map-pins' />}>States</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/districts`} icon={<i className='tabler-map-pins' />}>Districts</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/cities`} icon={<i className='tabler-map-pins' />}>Cities</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/areas`} icon={<i className='tabler-map-pins' />}>Areas</MenuItem>
                  <MenuItem href={`/${locale}/apps/store/branches`} icon={<i className='tabler-git-branch' />}>Branches</MenuItem>
                </SubMenu>
              </>
            )
            :
            ''
        }
      </Menu>
      {/* <Menu
          rootStyles={menuRootStyles(theme)}
          renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
          menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          popoutMenuOffset={{
            mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
            alignmentAxis: 0
          }}
          verticalMenuProps={{
            menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
            renderExpandIcon: ({ open }) => (
              <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
            ),
            renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
            menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
          }}
        >
          <GenerateHorizontalMenu menuData={menuData(dictionary)} />
        </Menu> */}
    </HorizontalNav>
  )
}

export default HorizontalMenu
