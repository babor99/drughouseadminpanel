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
                <MenuItem href={`/${locale}/apps/admin/employees`} icon={<i className='tabler-users' />}>
                  Employees
                </MenuItem>
                {/* <MenuItem href={`/${locale}/apps/admin/rpms`} icon={<i className='tabler-book-2' />}>
                  RPMs
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/teachers`} icon={<i className='tabler-user' />}>
                  Teachers
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/instructors`} icon={<i className='tabler-user' />}>
                  Instructors
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/students`} icon={<i className='tabler-users' />}>
                  Students
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/schools`} icon={<i className='tabler-school' />}>
                  Schools
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/events`} icon={<i className='tabler-calendar-event' />}>
                  Events
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/competitions`} icon={<i className='tabler-calendar-event' />}>
                  Competitions
                </MenuItem>
                <MenuItem href={`/${locale}/apps/admin/courses`} icon={<i className='tabler-school' />}>
                  Courses & Micro-creds
                </MenuItem> */}
                <SubMenu
                  label="Settings"
                  title="Settings"
                  icon={<i className='tabler-settings' />}

                // suffix={<CustomChip label='1' size='small' color='error' round='true' />}
                >
                  <MenuItem href={`/${locale}/apps/admin/product-categories`}>Product Categories</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/product-types`}>Product Types</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/manufacturers`}>Manufacturers</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/order-statuses`}>Order Statuses</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/districts`}>Districts</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/cities`}>Cities</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/areas`}>Areas</MenuItem>
                  <MenuItem href={`/${locale}/apps/admin/branches`}>Branches</MenuItem>
                </SubMenu>
              </>
            )
            :
            isRPM ?
              (
                <>
                  <MenuItem href={`/${locale}/apps/rpm/schools`} icon={<i className='tabler-school' />}>
                    Schools
                  </MenuItem>
                  <MenuItem href={`/${locale}/apps/rpm/teachers`} icon={<i className='tabler-users' />}>
                    Teachers
                  </MenuItem>
                  <MenuItem href={`/${locale}/apps/rpm/students`} icon={<i className='tabler-users' />}>
                    Students
                  </MenuItem>
                  <MenuItem href={`/${locale}/apps/rpm/events`} icon={<i className='tabler-calendar-event' />}>
                    Events
                  </MenuItem>
                  <MenuItem href={`/${locale}/apps/rpm/competitions`} icon={<i className='tabler-calendar-event' />}>
                    Competitions
                  </MenuItem>
                  <SubMenu
                    label="Marketing Materials"
                    title="Marketing Materials"
                    icon={<i className='tabler-atom' />}

                  // suffix={<CustomChip label='5' size='small' color='error' round='true' />}
                  >
                    <MenuItem target="_blank" href="https://drive.google.com/drive/folders/1YFGJ39jZBf_mkalsZWQ-OP5SFqwjQX6H?usp=sharing">All Resources</MenuItem>
                    <MenuItem target="_blank" href="https://drive.google.com/drive/folders/1gVMeQzDukm10jHKlXucxLbngBDZSbKKQ?usp=drive_link">Theme Logo</MenuItem>
                    <MenuItem target="_blank" href="https://drive.google.com/drive/folders/1YOyTc-OfAV_gwgMzLnuXpio5f26uzuCE?usp=drive_link">Posters</MenuItem>
                  </SubMenu>
                </>
              )
              :
              isTeacher ?
                (
                  <>
                    <MenuItem href={`/${locale}/apps/teacher/schools`} icon={<i className='tabler-school' />}>
                      Schools
                    </MenuItem>
                    <MenuItem href={`/${locale}/apps/teacher/students`} icon={<i className='tabler-users' />}>
                      Students
                    </MenuItem>
                    <MenuItem href={`/${locale}/apps/teacher/events`} icon={<i className='tabler-calendar-event' />}>
                      Event Registrations
                    </MenuItem>
                    <MenuItem href={`/${locale}/apps/teacher/competitions`} icon={<i className='tabler-calendar-event' />}>
                      Competition Registrations
                    </MenuItem>
                  </>
                )
                :
                isInstructor ?
                  (
                    <>
                      <MenuItem href={`/${locale}/apps/instructor/courses`} icon={<i className='tabler-book' />}>
                        Course Manager
                      </MenuItem>
                    </>
                  )
                  :
                  isStudent ?
                    (
                      <>
                        <MenuItem href={`/${locale}/apps/student/courses`} icon={<i className='tabler-school' />}>
                          Courses
                        </MenuItem>
                        <MenuItem href={`/${locale}/apps/student/my-courses`} icon={<i className='tabler-book' />}>
                          My Courses
                        </MenuItem>
                        <MenuItem href={`/${locale}/apps/student/events`} icon={<i className='tabler-calendar-event' />}>
                          Events
                        </MenuItem>
                        <MenuItem href={`/${locale}/apps/student/competitions`} icon={<i className='tabler-calendar-event' />}>
                          Competitions
                        </MenuItem>
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
