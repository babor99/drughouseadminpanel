'use client'

// Third-party Imports
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

import { CHECK_LOGIN_URL } from '@/constants/constants'

import {
  getRolesWP,
  getPermissionsWP,
  getUsersWP,
  getUserPermissionsWP,
  getNestedMenuItemsWp,
  getMenuItemsWp,
  getRegionsWP,
  getCountrysWP,
  getStatesWP,
  getDistrictsWP,
  getCitysWP,
  getAreasWP,
  getBranchsWP,
  getProductsWP,
  getProductCategorysWP,
  getProductTypesWp,
  getDiscountsWp,
  getManufacturersWp,
  getOrderStatussWP,
  getPaymentMethodsWp,
} from '@/redux-store/slices/data'

import { setLoginSuccess, setLoginFailed } from '@/redux-store/slices/authentication'
import { setUser } from '@/redux-store/slices/user'

export default function AuthGuard({ children, locale }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
  const accessToken = useSelector(state => state.authentication.accessToken)

  useEffect(() => {
    if (!isAuthenticated) {
      const authHeaders = {
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      fetch(`${CHECK_LOGIN_URL}`, authHeaders)
        .then(response => response.json())
        .then(resData => {
          const data = resData?.data

          if (data?.is_authenticated) {
            dispatch(setUser(data))
            dispatch(setLoginSuccess({ isAuthenticated: data?.is_authenticated, accessToken: data?.access, csrfToken: data?.csrftoken }))

            // This is For Dynamic Sidebar
            dispatch(getRolesWP(data?.access, data?.csrftoken))
            dispatch(getPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getUserPermissionsWP(data?.access, data?.csrftoken))
            dispatch(getNestedMenuItemsWp(data?.access, data?.csrftoken))
            dispatch(getCountrysWP(data?.access, data?.csrftoken))
            dispatch(getStatesWP(data?.access, data?.csrftoken))
            dispatch(getDistrictsWP(data?.access, data?.csrftoken))
            dispatch(getCitysWP(data?.access, data?.csrftoken))
            dispatch(getAreasWP(data?.access, data?.csrftoken))
            dispatch(getBranchsWP(data?.access, data?.csrftoken))
            
            dispatch(getProductsWP(data?.access, data?.csrftoken))
            dispatch(getProductCategorysWP(data?.access, data?.csrftoken))
            dispatch(getProductTypesWp(data?.access, data?.csrftoken))
            dispatch(getDiscountsWp(data?.access, data?.csrftoken))
            dispatch(getManufacturersWp(data?.access, data?.csrftoken))
            dispatch(getOrderStatussWP(data?.access, data?.csrftoken))
            dispatch(getPaymentMethodsWp(data?.access, data?.csrftoken))
            
            // dispatch(getUsersWP(data?.access, data?.csrftoken))
            // dispatch(getMenuItemsWp(data?.access, data?.csrftoken))
          } else {
            dispatch(setLoginFailed())

            setLoading(false)

            return <AuthRedirect lang={locale} />
          }

          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          dispatch(setLoginFailed())

          return <AuthRedirect lang={locale} />
        })
    } else {
      setLoading(false)
    }
  }, [])

  return <>{loading ? '' : isAuthenticated ? children : <AuthRedirect lang={locale} />}</>
}
