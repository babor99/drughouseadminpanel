import { createSlice } from '@reduxjs/toolkit'

import {
  GET_USERS_WP,
  GET_ROLES_WP,
  GET_PERMISSIONS_WP,
  GET_USER_PERMISSION,
  GET_MENU_ITEMS_WP,
  GET_NESTED_MENU_ITEMS_WP,
  GET_COUNTRYS_WP,
  GET_STATES_WP,
  GET_DISTRICTS_WP,
  GET_CITYS_WP,
  GET_AREAS_WP,
  GET_BRANCHS_WP,
  GET_PRODUCT_CATEGORYS_WP,
  GET_PRODUCT_TYPES_WP,
  GET_DISCOUNTS_WP,
  GET_MANUFACTURERS_WP,
  GET_ORDER_STATUSS_WP,
  GET_PAYMENT_METHODS_WP,
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

export const getMenuItemsWp = (accessToken, csrfToken) => dispatch => {
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
      dispatch(setMenuItems(data.menu_items))
    })
    .catch(() => { })
}

export const getNestedMenuItemsWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_NESTED_MENU_ITEMS_WP, authHeaders)
    .then(response => response.json())
    .then(data => {
      dispatch(setNestedMenuItems(data?.menu_items))
    })
    .catch(() => { })
}

export const getCountrysWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_COUNTRYS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setCountrys(data.countries)))
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

export const getDistrictsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_DISTRICTS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setDistricts(data.districts)))
    .catch(() => { })
}

export const getCitysWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_CITYS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setCitys(data.cities)))
    .catch(() => { })
}

export const getAreasWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_AREAS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setAreas(data.areas)))
    .catch(() => { })
}

export const getBranchsWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_BRANCHS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setBranchs(data.branches)))
    .catch(() => { })
}

export const getProductCategorysWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_PRODUCT_CATEGORYS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setProductCategorys(data.categories || [])))
    .catch(() => { })
}

export const getProductTypesWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_PRODUCT_TYPES_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setProductTypes(data.product_types || [])))
    .catch(() => { })
}

export const getDiscountsWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_DISCOUNTS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setDiscounts(data.discounts || [])))
    .catch(() => { })
}

export const getManufacturersWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_MANUFACTURERS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setManufacturers(data.manufacturers || [])))
    .catch(() => { })
}

export const getOrderStatussWP = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_ORDER_STATUSS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setOrderStatuss(data.order_statuses || [])))
    .catch(() => { })
}

export const getPaymentMethodsWp = (accessToken, csrfToken) => dispatch => {
  const authHeaders = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    }
  }

  fetch(GET_PAYMENT_METHODS_WP, authHeaders)
    .then(response => response.json())
    .then(data => dispatch(setPaymentMethods(data.payment_methods || [])))
    .catch(() => { })
}

const dataSlice = createSlice({
  name: 'liaSms/data',

  initialState: {
    users: [],
    roles: [],
    permissions: [],
    userPermissions: [],
    menuItems: [],
    nestedMenuItems: [],
    countrys: [],
    states: [],
    districts: [],
    citys: [],
    areas: [],
    branchs: [],
    productCategorys: [],
    productTypes: [],
    discounts: [],
    manufacturers: [],
    orderStatuss: [],
    paymentMethods: [],
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
    setMenuItems: (state, action) => {
      state.menuItems = action.payload ? action.payload : []
    },
    setNestedMenuItems: (state, action) => {
      state.nestedMenuItems = action.payload ? action.payload : []
    },
    setCountrys: (state, action) => {
      state.countrys = action.payload ? action.payload : []
    },
    setStates: (state, action) => {
      state.states = action.payload ? action.payload : []
    },
    setDistricts: (state, action) => {
      state.districts = action.payload ? action.payload : []
    },
    setCitys: (state, action) => {
      state.citys = action.payload ? action.payload : []
    },
    setAreas: (state, action) => {
      state.areas = action.payload ? action.payload : []
    },
    setBranchs: (state, action) => {
      state.branchs = action.payload ? action.payload : []
    },
    setProductCategorys: (state, action) => {
      state.productCategorys = action.payload ? action.payload : []
    },
    setProductTypes: (state, action) => {
      state.productTypes = action.payload ? action.payload : []
    },
    setDiscounts: (state, action) => {
      state.discounts = action.payload ? action.payload : []
    },
    setManufacturers: (state, action) => {
      state.manufacturers = action.payload ? action.payload : []
    },
    setOrderStatuss: (state, action) => {
      state.orderStatuss = action.payload ? action.payload : []
    },
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload ? action.payload : []
    }
  }
})

const {
  setUsers,
  setRoles,
  setPermissions,
  setUserPermissions,
  setMenuItems,
  setNestedMenuItems,
  setCountrys,
  setStates,
  setDistricts,
  setCitys,
  setAreas,
  setBranchs,
  setProductCategorys,
  setProductTypes,
  setDiscounts,
  setManufacturers,
  setOrderStatuss,
  setPaymentMethods
} = dataSlice.actions

export default dataSlice.reducer
