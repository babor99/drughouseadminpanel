import { createSlice } from '@reduxjs/toolkit'

import {
  GET_USERS_WP,
  GET_ROLES_WP,
  GET_PERMISSIONS_WP,
  GET_USER_PERMISSION,
  GET_MENU_ITEMS_WP,
  GET_MENU_ITEMS_ALL_NESTED,
  GET_STATES_WP,
  GET_REGIONS_WP,
  GET_SCHOOLS_WP,
  GET_SECTIONS_WP2,
  GET_TEACHERS_WP2,
  GET_COURSE_CATEGORYS_WP
} from '@/constants/constants'

export const getUsersWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_USERS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setUsers(data.users)))
    .catch(() => { })
}

export const getRolesWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_ROLES_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setRoles(data.roles)))
    .catch(() => { })
}

export const getPermissionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_PERMISSIONS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setPermissions(data.permissions)))
    .catch(() => { })
}

export const getUserPermissionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_USER_PERMISSION, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setUserPermissions(data?.user_permissions)))
    .catch(() => { })
}

export const getParentMenus = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_MENU_ITEMS_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setParentMenus(data.menu_items))
    })
    .catch(() => { })
}

export const getAllMenuNestedWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_MENU_ITEMS_ALL_NESTED, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setAllMenuNested(data?.menu_items))
    })
    .catch(() => { })
}

export const getStatesWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_STATES_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setStates(data.states)))
    .catch(() => { })
}

export const getRegionsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_REGIONS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setRegions(data.regions)))
    .catch(() => { })
}

export const getSchoolsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_SCHOOLS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setSchools(data.schools)))
    .catch(() => { })
}

export const getSectionsWP2 = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_SECTIONS_WP2, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setSections2(data.sections)))
    .catch(() => { })
}

export const getTeachersWP2 = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_TEACHERS_WP2, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setTeachers2(data.teachers)))
    .catch(() => { })
}

export const getCourseCategorysWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_COURSE_CATEGORYS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setCourseCategorys(data.categories)))
    .catch(() => { })
}

const dataSlice = createSlice({
  name: 'liaSms/data',

  initialState: {
    users: [],
    roles: [],
    permissions: [],
    userPermissions: [],
    parentMenus: [],
    nestedMenus: [],
    states: [],
    regions: [],
    schools: [],
    sections2: [],
    teachers2: [],
    courseCategorys: [],
  },

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload ? action.payload : []
    },
    setRoles: (state, action) => {
      state.roles = action.payload ? action.payload : []
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload ? action.payload : []
    },
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload ? action.payload : []
    },
    setPermissionGroups: (state, action) => {
      state.permissionGroups = action.payload ? action.payload : []
    },
    setParentMenus: (state, action) => {
      state.parentMenus = action.payload ? action.payload : []
    },
    setAllMenuNested: (state, action) => {
      state.nestedMenus = action.payload ? action.payload : []
    },
    setStates: (state, action) => {
      state.states = action.payload ? action.payload : []
    },
    setRegions: (state, action) => {
      state.regions = action.payload ? action.payload : []
    },
    setSchools: (state, action) => {
      state.schools = action.payload ? action.payload : []
    },
    setSections2: (state, action) => {
      state.sections2 = action.payload ? action.payload : []
    },
    setTeachers2: (state, action) => {
      state.teachers2 = action.payload ? action.payload : []
    },
    setCourseCategorys: (state, action) => {
      state.courseCategorys = action.payload ? action.payload : []
    }
  }
})

const {
  setUsers,
  setRoles,
  setPermissions,
  setUserPermissions,
  setParentMenus,
  setAllMenuNested,
  setStates,
  setRegions,
  setSchools,
  setSections2,
  setTeachers2,
  setCourseCategorys
} = dataSlice.actions

export default dataSlice.reducer
