// BASE_URL

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// export const BASE_URL = 'https://api.liasms.com';

// TINY_MCE
// export const TINY_MCE_API_KEY = 'a4up6yl907g32qs9r0qusz48nxr1874xk61bnhrhkqlb0hz3'
export const TINY_MCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_APIKEY

// LOGIN
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`
export const CHECK_LOGIN_URL = `${BASE_URL}/user/api/v1/user/check_login/`
export const LOGOUT_URL = `${BASE_URL}/user/api/v1/user/logout/`
export const SIGNIN_URL = `${BASE_URL}/user/api/v1/user/login/`
export const GET_ACCESS_TOKEN_BY_REFRESH_TOKEN = `${BASE_URL}/user/api/v1/user/re_login/`

// AWS
export const GET_AWS_PRESIGNED_URL = `${BASE_URL}/aws/get_presigned_url/`

// DASHBOARD_DATA
export const GET_ADMIN_DASHBOARD_DATA = `${BASE_URL}/dashboard/api/v1/admin_dashboard_data/`
export const GET_EMPLOYEE_DASHBOARD_DATA = `${BASE_URL}/dashboard/api/v1/employee_dashboard_data/`
export const DASHBOARD_DATA = `${BASE_URL}/dashboard/api/v1/dashboard_data/`

// USER
export const GET_USERS_WP = `${BASE_URL}/user/api/v1/user/wp/all/`
export const GET_ALL_USERS = `${BASE_URL}/user/api/v1/user/all/`
export const GET_USER_BY_ID = `${BASE_URL}/user/api/v1/user/`
export const GET_USER_BY_TOKEN = `${BASE_URL}/user/api/v1/user/me/`
export const CREATE_USER = `${BASE_URL}/user/api/v1/user/create/`
export const UPDATE_USER = `${BASE_URL}/user/api/v1/user/update/`
export const DELETE_USER = `${BASE_URL}/user/api/v1/user/delete/`
export const SET_USER_PASSWORD = `${BASE_URL}/user/api/v1/user/set_password/`

// EMPLOYEE
export const GET_EMPLOYEES_WP = `${BASE_URL}/employee/api/v1/employee/wp/all/`
export const GET_ALL_EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`
export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employee/api/v1/employee/`
export const GET_EMPLOYEE_BY_TOKEN = `${BASE_URL}/employee/api/v1/employee/me/`
export const CREATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/create/`
export const UPDATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/update/`
export const DELETE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/delete/`
export const SET_EMPLOYEE_PASSWORD = `${BASE_URL}/employee/api/v1/employee/set_password/`

// PERMISSION
export const GET_USER_PERMISSION = `${BASE_URL}/permission/api/v1/permission/by_user_role/wp/all/`
export const GET_PERMISSIONS = `${BASE_URL}/permission/api/v1/permission/all/`
export const GET_PERMISSIONS_WP = `${BASE_URL}/permission/api/v1/permission/wp/all/`
export const GET_PERMISSIONID = `${BASE_URL}/permission/api/v1/permission/`
export const CREATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/create/`
export const UPDATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/update/`
export const DELETE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/delete/`

// ROLE
export const GET_ROLES_WP = `${BASE_URL}/role/api/v1/role/wp/all/`
export const GET_ROLES = `${BASE_URL}/role/api/v1/role/all/`
export const GET_ROLE_ID = `${BASE_URL}/role/api/v1/role/`
export const CREATE_ROLE = `${BASE_URL}/role/api/v1/role/create/`
export const UPDATE_ROLE = `${BASE_URL}/role/api/v1/role/update/`
export const DELETE_ROLE = `${BASE_URL}/role/api/v1/role/delete/`

// ROLE_MENU
export const GET_ROLEMENUS = `${BASE_URL}/role_menu/api/v1/role_menu/all`
export const GET_ROLEMENU_BY_ID = `${BASE_URL}/role_menu/api/v1/role_menu/`
export const CREATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/create/`
export const UPDATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/update/`
export const DELETE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/delete/`
export const SEARCH_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/search/`

// MENU_ITEM
export const GET_MENU_ITEMS_BY_USER_ROLE = `${BASE_URL}/menu_item/api/v1/menu_item/nested/by_user_role/wp/all/`
export const GET_MENU_ITEMS_ALL_NESTED = `${BASE_URL}/menu_item/api/v1/menu_item/nested/wp/all/`
export const GET_MENU_ITEMS_WP = `${BASE_URL}/menu_item/api/v1/menu_item/wp/all/`
export const GET_MENU_ITEMS_ALL = `${BASE_URL}/menu_item/api/v1/menu_item/all/`
export const GET_MENU_ITEM_BY_ID = `${BASE_URL}/menu_item/api/v1/menu_item/`
export const CREATE_MENU_ITEM = `${BASE_URL}/menu_item/api/v1/menu_item/create/`
export const UPDATE_MENU_ITEM = `${BASE_URL}/menu_item/api/v1/menu_item/update/`
export const DELETE_MENU_ITEM = `${BASE_URL}/menu_item/api/v1/menu_item/delete/`

// ACTIVITY_LOG
export const GET_ACTIVITY_LOGS_WP = `${BASE_URL}/activity_log/api/v1/activity_log/wp/all/`
export const GET_ACTIVITY_LOGS = `${BASE_URL}/activity_log/api/v1/activity_log/all/`
export const GET_ACTIVITY_LOG_BY_ID = `${BASE_URL}/activity_log/api/v1/activity_log/`
export const CREATE_ACTIVITY_LOG = `${BASE_URL}/activity_log/api/v1/activity_log/create/`
export const UPDATE_ACTIVITYLOG = `${BASE_URL}/activity_log/api/v1/activity_log/update/`
export const DELETE_ACTIVITYLOG = `${BASE_URL}/activity_log/api/v1/activity_log/delete/`

// COUNTRY
export const GET_COUNTRYS_WP = `${BASE_URL}/country/api/v1/country/wp/all/`
export const GET_COUNTRYS = `${BASE_URL}/country/api/v1/country/all/`
export const GET_COUNTRY_BY_ID = `${BASE_URL}/country/api/v1/country/`
export const CREATE_COUNTRY = `${BASE_URL}/country/api/v1/country/create/`
export const UPDATE_COUNTRY = `${BASE_URL}/country/api/v1/country/update/`
export const DELETE_COUNTRY = `${BASE_URL}/country/api/v1/country/delete/`

// STATE
export const GET_STATES_WP = `${BASE_URL}/state/api/v1/state/wp/all/`
export const GET_STATES = `${BASE_URL}/state/api/v1/state/all/`
export const GET_STATE_BY_ID = `${BASE_URL}/state/api/v1/state/`
export const CREATE_STATE = `${BASE_URL}/state/api/v1/state/create/`
export const UPDATE_STATE = `${BASE_URL}/state/api/v1/state/update/`
export const DELETE_STATE = `${BASE_URL}/state/api/v1/state/delete/`

// DISTRICT
export const GET_DISTRICTS_WP = `${BASE_URL}/district/api/v1/district/wp/all/`
export const GET_DISTRICTS = `${BASE_URL}/district/api/v1/district/all/`
export const GET_DISTRICT_BY_ID = `${BASE_URL}/district/api/v1/district/`
export const CREATE_DISTRICT = `${BASE_URL}/district/api/v1/district/create/`
export const UPDATE_DISTRICT = `${BASE_URL}/district/api/v1/district/update/`
export const DELETE_DISTRICT = `${BASE_URL}/district/api/v1/district/delete/`

// CITY
export const GET_CITYS_WP = `${BASE_URL}/city/api/v1/city/wp/all/`
export const GET_CITYS = `${BASE_URL}/city/api/v1/city/all/`
export const GET_CITY_BY_ID = `${BASE_URL}/city/api/v1/city/`
export const CREATE_CITY = `${BASE_URL}/city/api/v1/city/create/`
export const UPDATE_CITY = `${BASE_URL}/city/api/v1/city/update/`
export const DELETE_CITY = `${BASE_URL}/city/api/v1/city/delete/`

// AREA
export const GET_AREAS_WP = `${BASE_URL}/area/api/v1/area/wp/all/`
export const GET_AREAS = `${BASE_URL}/area/api/v1/area/all/`
export const GET_AREA_BY_ID = `${BASE_URL}/area/api/v1/area/`
export const CREATE_AREA = `${BASE_URL}/area/api/v1/area/create/`
export const UPDATE_AREA = `${BASE_URL}/area/api/v1/area/update/`
export const DELETE_AREA = `${BASE_URL}/area/api/v1/area/delete/`

// BRANCH
export const GET_BRANCHS_WP = `${BASE_URL}/branch/api/v1/branch/wp/all/`
export const GET_BRANCHS = `${BASE_URL}/branch/api/v1/branch/all/`
export const GET_BRANCH_BY_ID = `${BASE_URL}/branch/api/v1/branch/`
export const CREATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/create/`
export const UPDATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/update/`
export const DELETE_BRANCH = `${BASE_URL}/branch/api/v1/branch/delete/`

// BRAND
export const GET_BRANDS_WP = `${BASE_URL}/brand/api/v1/brand/wp/all/`
export const GET_BRANDS = `${BASE_URL}/brand/api/v1/brand/all/`
export const GET_BRAND_BY_ID = `${BASE_URL}/brand/api/v1/brand/`
export const CREATE_BRAND = `${BASE_URL}/brand/api/v1/brand/create/`
export const UPDATE_BRAND = `${BASE_URL}/brand/api/v1/brand/update/`
export const DELETE_BRAND = `${BASE_URL}/brand/api/v1/brand/delete/`

// MANUFACTURER
export const GET_MANUFACTURERS_WP = `${BASE_URL}/manufacturer/api/v1/manufacturer/wp/all/`
export const GET_MANUFACTURERS = `${BASE_URL}/manufacturer/api/v1/manufacturer/all/`
export const GET_MANUFACTURER_BY_ID = `${BASE_URL}/manufacturer/api/v1/manufacturer/`
export const CREATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/create/`
export const UPDATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/update/`
export const DELETE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/delete/`

// PRODUCT_CATEGORY
export const GET_PRODUCT_CATEGORYS_WP = `${BASE_URL}/category/api/v1/category/wp/all/`
export const GET_PRODUCT_CATEGORYS = `${BASE_URL}/category/api/v1/category/all/`
export const GET_PRODUCT_CATEGORY_BY_ID = `${BASE_URL}/category/api/v1/category/`
export const CREATE_PRODUCT_CATEGORY = `${BASE_URL}/category/api/v1/category/create/`
export const UPDATE_PRODUCT_CATEGORY = `${BASE_URL}/category/api/v1/category/update/`
export const DELETE_PRODUCT_CATEGORY = `${BASE_URL}/category/api/v1/category/delete/`

// PRODUCT_TYPE
export const GET_PRODUCT_TYPES_WP = `${BASE_URL}/product_type/api/v1/product_type/wp/all/`
export const GET_PRODUCT_TYPES = `${BASE_URL}/product_type/api/v1/product_type/all/`
export const GET_PRODUCT_TYPE_BY_ID = `${BASE_URL}/product_type/api/v1/product_type/`
export const CREATE_PRODUCT_TYPE = `${BASE_URL}/product_type/api/v1/product_type/create/`
export const UPDATE_PRODUCT_TYPE = `${BASE_URL}/product_type/api/v1/product_type/update/`
export const DELETE_PRODUCT_TYPE = `${BASE_URL}/product_type/api/v1/product_type/delete/`

// ATTRIBUTE
export const GET_ATTRIBUTES_WP = `${BASE_URL}/attribute/api/v1/attribute/wp/all/`
export const GET_ATTRIBUTES = `${BASE_URL}/attribute/api/v1/attribute/all/`
export const GET_ATTRIBUTE_BY_ID = `${BASE_URL}/attribute/api/v1/attribute/`
export const CREATE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/create/`
export const UPDATE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/update/`
export const DELETE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/delete/`

// ATTRIBUTE_SET
export const GET_ATTRIBUTE_SETS_WP = `${BASE_URL}/attribute_set/api/v1/attribute_set/wp/all/`
export const GET_ATTRIBUTE_SETS = `${BASE_URL}/attribute_set/api/v1/attribute_set/all/`
export const GET_ATTRIBUTE_SET_BY_ID = `${BASE_URL}/attribute_set/api/v1/attribute_set/`
export const CREATE_ATTRIBUTE_SET = `${BASE_URL}/attribute_set/api/v1/attribute_set/create/`
export const UPDATE_ATTRIBUTE_SET = `${BASE_URL}/attribute_set/api/v1/attribute_set/update/`
export const DELETE_ATTRIBUTE_SET = `${BASE_URL}/attribute_set/api/v1/attribute_set/delete/`

// ATTRIBUTE_VALUE
export const GET_ATTRIBUTE_VALUES_WP = `${BASE_URL}/attribute_value/api/v1/attribute_value/wp/all/`
export const GET_ATTRIBUTE_VALUES = `${BASE_URL}/attribute_value/api/v1/attribute_value/all/`
export const GET_ATTRIBUTE_VALUE_BY_ID = `${BASE_URL}/attribute_value/api/v1/attribute_value/`
export const CREATE_ATTRIBUTE_VALUE = `${BASE_URL}/attribute_value/api/v1/attribute_value/create/`
export const UPDATE_ATTRIBUTE_VALUE = `${BASE_URL}/attribute_value/api/v1/attribute_value/update/`
export const DELETE_ATTRIBUTE_VALUE = `${BASE_URL}/attribute_value/api/v1/attribute_value/delete/`

// PRODUCT
export const GET_PRODUCTS_WP = `${BASE_URL}/product/api/v1/product/wp/all/`
export const GET_PRODUCTS = `${BASE_URL}/product/api/v1/product/all/`
export const GET_LOW_STOCK_PRODUCTS = `${BASE_URL}/product/api/v1/low_stock_product/all/`
export const GET_PRODUCT_BY_ID = `${BASE_URL}/product/api/v1/product/`
export const CREATE_PRODUCT = `${BASE_URL}/product/api/v1/product/create/`
export const UPDATE_PRODUCT = `${BASE_URL}/product/api/v1/product/update/`
export const DELETE_PRODUCT = `${BASE_URL}/product/api/v1/product/delete/`

// DISCOUNT
export const GET_DISCOUNTS_WP = `${BASE_URL}/discount/api/v1/discount/wp/all/`
export const GET_DISCOUNTS = `${BASE_URL}/discount/api/v1/discount/all/`
export const GET_DISCOUNT_BY_ID = `${BASE_URL}/discount/api/v1/discount/`
export const CREATE_DISCOUNT = `${BASE_URL}/discount/api/v1/discount/create/`
export const UPDATE_DISCOUNT = `${BASE_URL}/discount/api/v1/discount/update/`
export const DELETE_DISCOUNT = `${BASE_URL}/discount/api/v1/discount/delete/`

// REVIEW_RATING
export const GET_REVIEW_RATINGS_WP = `${BASE_URL}/review_rating/api/v1/review_rating/wp/all/`
export const GET_REVIEW_RATINGS = `${BASE_URL}/review_rating/api/v1/review_rating/all/`
export const GET_REVIEW_RATING_BY_ID = `${BASE_URL}/review_rating/api/v1/review_rating/`
export const CREATE_REVIEW_RATING = `${BASE_URL}/review_rating/api/v1/review_rating/create/`
export const UPDATE_REVIEW_RATING = `${BASE_URL}/review_rating/api/v1/review_rating/update/`
export const DELETE_REVIEW_RATING = `${BASE_URL}/review_rating/api/v1/review_rating/delete/`

// REVIEW_RATING_IMAGE
export const GET_REVIEW_RATING_IMAGES_WP = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/wp/all/`
export const GET_REVIEW_RATING_IMAGES = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/all/`
export const GET_REVIEW_RATING_IMAGE_BY_ID = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/`
export const CREATE_REVIEW_RATING_IMAGE = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/create/`
export const UPDATE_REVIEW_RATING_IMAGE = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/update/`
export const DELETE_REVIEW_RATING_IMAGE = `${BASE_URL}/review_rating_image/api/v1/review_rating_image/delete/`

// PRODUCT_TAG
export const GET_PRODUCT_TAGS_WP = `${BASE_URL}/product_tag/api/v1/product_tag/wp/all/`
export const GET_PRODUCT_TAGS = `${BASE_URL}/product_tag/api/v1/product_tag/all/`
export const GET_PRODUCT_TAG_BY_ID = `${BASE_URL}/product_tag/api/v1/product_tag/`
export const CREATE_PRODUCT_TAG = `${BASE_URL}/product_tag/api/v1/product_tag/create/`
export const UPDATE_PRODUCT_TAG = `${BASE_URL}/product_tag/api/v1/product_tag/update/`
export const DELETE_PRODUCT_TAG = `${BASE_URL}/product_tag/api/v1/product_tag/delete/`

// COLOR
export const GET_COLORS_WP = `${BASE_URL}/color/api/v1/color/wp/all/`
export const GET_COLORS = `${BASE_URL}/color/api/v1/color/all/`
export const GET_COLOR_BY_ID = `${BASE_URL}/color/api/v1/color/`
export const CREATE_COLOR = `${BASE_URL}/color/api/v1/color/create/`
export const UPDATE_COLOR = `${BASE_URL}/color/api/v1/color/update/`
export const DELETE_COLOR = `${BASE_URL}/color/api/v1/color/delete/`

// SIZE
export const GET_SIZES_WP = `${BASE_URL}/size/api/v1/size/wp/all/`
export const GET_SIZES = `${BASE_URL}/size/api/v1/size/all/`
export const GET_SIZE_BY_ID = `${BASE_URL}/size/api/v1/size/`
export const CREATE_SIZE = `${BASE_URL}/size/api/v1/size/create/`
export const UPDATE_SIZE = `${BASE_URL}/size/api/v1/size/update/`
export const DELETE_SIZE = `${BASE_URL}/size/api/v1/size/delete/`

// PRODUCT_SIZE
export const GET_PRODUCT_SIZES_WP = `${BASE_URL}/product_size/api/v1/product_size/wp/all/`
export const GET_PRODUCT_SIZES = `${BASE_URL}/product_size/api/v1/product_size/all/`
export const GET_PRODUCT_SIZE_BY_ID = `${BASE_URL}/product_size/api/v1/product_size/`
export const CREATE_PRODUCT_SIZE = `${BASE_URL}/product_size/api/v1/product_size/create/`
export const UPDATE_PRODUCT_SIZE = `${BASE_URL}/product_size/api/v1/product_size/update/`
export const DELETE_PRODUCT_SIZE = `${BASE_URL}/product_size/api/v1/product_size/delete/`

// PAYMENT_METHOD
export const GET_PAYMENT_METHODS_WP = `${BASE_URL}/payment_method/api/v1/payment_method/wp/all/`
export const GET_PAYMENT_METHODS = `${BASE_URL}/payment_method/api/v1/payment_method/all/`
export const GET_PAYMENT_METHOD_BY_ID = `${BASE_URL}/payment_method/api/v1/payment_method/`
export const CREATE_PAYMENT_METHOD = `${BASE_URL}/payment_method/api/v1/payment_method/create/`
export const UPDATE_PAYMENT_METHOD = `${BASE_URL}/payment_method/api/v1/payment_method/update/`
export const DELETE_PAYMENT_METHOD = `${BASE_URL}/payment_method/api/v1/payment_method/delete/`

// ORDER_STATUS
export const GET_ORDER_STATUSS_WP = `${BASE_URL}/order_status/api/v1/order_status/wp/all/`
export const GET_ORDER_STATUSS = `${BASE_URL}/order_status/api/v1/order_status/all/`
export const GET_ORDER_STATUS_BY_ID = `${BASE_URL}/order_status/api/v1/order_status/`
export const CREATE_ORDER_STATUS = `${BASE_URL}/order_status/api/v1/order_status/create/`
export const UPDATE_ORDER_STATUS = `${BASE_URL}/order_status/api/v1/order_status/update/`
export const DELETE_ORDER_STATUS = `${BASE_URL}/order_status/api/v1/order_status/delete/`

// DISCOUNT_TYPE
export const GET_DISCOUNT_TYPES_WP = `${BASE_URL}/discount_type/api/v1/discount_type/wp/all/`
export const GET_DISCOUNT_TYPES = `${BASE_URL}/discount_type/api/v1/discount_type/all/`
export const GET_DISCOUNT_TYPE_BY_ID = `${BASE_URL}/discount_type/api/v1/discount_type/`
export const CREATE_DISCOUNT_TYPE = `${BASE_URL}/discount_type/api/v1/discount_type/create/`
export const UPDATE_DISCOUNT_TYPE = `${BASE_URL}/discount_type/api/v1/discount_type/update/`
export const DELETE_DISCOUNT_TYPE = `${BASE_URL}/discount_type/api/v1/discount_type/delete/`

// ORDER
export const GET_ORDERS_WP = `${BASE_URL}/order/api/v1/order/wp/all/`
export const GET_ORDERS = `${BASE_URL}/order/api/v1/order/all/`
export const GET_ORDER_BY_ID = `${BASE_URL}/order/api/v1/order/`
export const CREATE_ORDER = `${BASE_URL}/order/api/v1/order/create/`
export const UPDATE_ORDER = `${BASE_URL}/order/api/v1/order/update/`
export const DELETE_ORDER = `${BASE_URL}/order/api/v1/order/delete/`

// ORDER_ITME
export const GET_ORDER_ITMES_WP = `${BASE_URL}/order_item/api/v1/order_item/wp/all/`
export const GET_ORDER_ITMES = `${BASE_URL}/order_item/api/v1/order_item/all/`
export const GET_ORDER_ITME_BY_ID = `${BASE_URL}/order_item/api/v1/order_item/`
export const CREATE_ORDER_ITME = `${BASE_URL}/order_item/api/v1/order_item/create/`
export const UPDATE_ORDER_ITME = `${BASE_URL}/order_item/api/v1/order_item/update/`
export const DELETE_ORDER_ITME = `${BASE_URL}/order_item/api/v1/order_item/delete/`

// PAYMENT_METHOD_DETAIL
export const GET_PAYMENT_METHOD_DETAILS_WP = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/wp/all/`
export const GET_PAYMENT_METHOD_DETAILS = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/all/`
export const GET_PAYMENT_METHOD_DETAIL_BY_ID = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/`
export const CREATE_PAYMENT_METHOD_DETAIL = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/create/`
export const UPDATE_PAYMENT_METHOD_DETAIL = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/update/`
export const DELETE_PAYMENT_METHOD_DETAIL = `${BASE_URL}/payment_method_detail/api/v1/payment_method_detail/delete/`

// CUSTOMER_PAYMENT_METHOD
export const GET_CUSTOMER_PAYMENT_METHODS_WP = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/wp/all/`
export const GET_CUSTOMER_PAYMENT_METHODS = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/all/`
export const GET_CUSTOMER_PAYMENT_METHOD_BY_ID = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/`
export const CREATE_CUSTOMER_PAYMENT_METHOD = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/create/`
export const UPDATE_CUSTOMER_PAYMENT_METHOD = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/update/`
export const DELETE_CUSTOMER_PAYMENT_METHOD = `${BASE_URL}/customer_payment_method/api/v1/customer_payment_method/delete/`

// SHIPPING_ADDRESS
export const GET_SHIPPING_ADDRESSS_WP = `${BASE_URL}/shipping_address/api/v1/shipping_address/wp/all/`
export const GET_SHIPPING_ADDRESSS = `${BASE_URL}/shipping_address/api/v1/shipping_address/all/`
export const GET_SHIPPING_ADDRESS_BY_ID = `${BASE_URL}/shipping_address/api/v1/shipping_address/`
export const CREATE_SHIPPING_ADDRESS = `${BASE_URL}/shipping_address/api/v1/shipping_address/create/`
export const UPDATE_SHIPPING_ADDRESS = `${BASE_URL}/shipping_address/api/v1/shipping_address/update/`
export const DELETE_SHIPPING_ADDRESS = `${BASE_URL}/shipping_address/api/v1/shipping_address/delete/`

// BILLING_ADDRESS
export const GET_BILLING_ADDRESSS_WP = `${BASE_URL}/billing_address/api/v1/billing_address/wp/all/`
export const GET_BILLING_ADDRESSS = `${BASE_URL}/billing_address/api/v1/billing_address/all/`
export const GET_BILLING_ADDRESS_BY_ID = `${BASE_URL}/billing_address/api/v1/billing_address/`
export const CREATE_BILLING_ADDRESS = `${BASE_URL}/billing_address/api/v1/billing_address/create/`
export const UPDATE_BILLING_ADDRESS = `${BASE_URL}/billing_address/api/v1/billing_address/update/`
export const DELETE_BILLING_ADDRESS = `${BASE_URL}/billing_address/api/v1/billing_address/delete/`

// COMPETITION
export const GET_COMPETITIONS_WP = `${BASE_URL}/competition/api/v1/competition/wp/all/`
export const GET_COMPETITIONS = `${BASE_URL}/competition/api/v1/competition/all/`
export const GET_COMPETITION_BY_ID = `${BASE_URL}/competition/api/v1/competition/`
export const CREATE_COMPETITION = `${BASE_URL}/competition/api/v1/competition/create/`
export const UPDATE_COMPETITION = `${BASE_URL}/competition/api/v1/competition/update/`
export const DELETE_COMPETITION = `${BASE_URL}/competition/api/v1/competition/delete/`

// for student
export const GET_STUDENT_COMPETITIONS = `${BASE_URL}/competition/api/v1/student_competition/all/`

// COMPETITION_ENROLLMENT
export const GET_COMPETITION_ENROLLMENTS_WP = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/wp/all/`
export const GET_COMPETITION_ENROLLMENTS_BY_STUDENT_WP = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment_by_student/wp/all/`
export const GET_COMPETITION_ENROLLMENTS = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/all/`
export const GET_ALL_COMPETITION_PARTICIPANT_BY_COMPETITION_ID = `${BASE_URL}/competition_enrollment/api/v1/get_all_participants_by_competition_id/`
export const DOWNLOAD_COMPETITION_PARTICIPANT_BY_COMPETITION_ID = `${BASE_URL}/competition_enrollment/api/v1/download_participants_csv_by_competition_id/`
export const GET_COMPETITION_ENROLLMENT_BY_ID = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/`
export const CREATE_COMPETITION_ENROLLMENT = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/create/`
export const UPDATE_COMPETITION_ENROLLMENT = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/update/`
export const DELETE_COMPETITION_ENROLLMENT = `${BASE_URL}/competition_enrollment/api/v1/competition_enrollment/delete/`

// EVENT
export const GET_EVENTS_WP = `${BASE_URL}/event/api/v1/event/wp/all/`
export const GET_EVENTS = `${BASE_URL}/event/api/v1/event/all/`
export const GET_EVENT_BY_ID = `${BASE_URL}/event/api/v1/event/`
export const CREATE_EVENT = `${BASE_URL}/event/api/v1/event/create/`
export const UPDATE_EVENT = `${BASE_URL}/event/api/v1/event/update/`
export const DELETE_EVENT = `${BASE_URL}/event/api/v1/event/delete/`

// for student
export const GET_STUDENT_EVENTS = `${BASE_URL}/event/api/v1/student_event/all/`

// EVENT_ENROLLMENT
export const GET_EVENT_ENROLLMENTS_WP = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/wp/all/`
export const GET_EVENT_ENROLLMENTS_BY_STUDENT_WP = `${BASE_URL}/event_enrollment/api/v1/event_enrollment_by_student/wp/all/`
export const GET_EVENT_ENROLLMENTS = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/all/`
export const GET_ALL_EVENT_PARTICIPANT_BY_EVENT_ID = `${BASE_URL}/event_enrollment/api/v1/get_all_participants_by_event_id/`
export const DOWNLOAD_EVENT_PARTICIPANT_BY_EVENT_ID = `${BASE_URL}/event_enrollment/api/v1/download_participants_csv_by_event_id/`
export const GET_EVENT_ENROLLMENT_BY_ID = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/`
export const CREATE_EVENT_ENROLLMENT = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/create/`
export const UPDATE_EVENT_ENROLLMENT = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/update/`
export const DELETE_EVENT_ENROLLMENT = `${BASE_URL}/event_enrollment/api/v1/event_enrollment/delete/`

// PARENT
export const GET_PARENTS_WP = `${BASE_URL}/parent/api/v1/parent/wp/all/`
export const GET_PARENTS = `${BASE_URL}/parent/api/v1/parent/all/`
export const GET_PARENT_BY_ID = `${BASE_URL}/parent/api/v1/parent/`
export const CREATE_PARENT = `${BASE_URL}/parent/api/v1/parent/create/`
export const UPDATE_PARENT = `${BASE_URL}/parent/api/v1/parent/update/`
export const DELETE_PARENT = `${BASE_URL}/parent/api/v1/parent/delete/`

// RPM
export const GET_RPM_DASHBOARD_DATA = `${BASE_URL}/rpm/api/v1/rpm/dashboard_data/`

export const GET_RPMS_WP = `${BASE_URL}/rpm/api/v1/rpm/wp/all/`
export const GET_RPMS = `${BASE_URL}/rpm/api/v1/rpm/all/`
export const GET_RPM_BY_ID = `${BASE_URL}/rpm/api/v1/rpm/`
export const CREATE_RPM = `${BASE_URL}/rpm/api/v1/rpm/create/`
export const UPDATE_RPM = `${BASE_URL}/rpm/api/v1/rpm/update/`
export const DELETE_RPM = `${BASE_URL}/rpm/api/v1/rpm/delete/`
export const SET_RPM_PASSWORD = `${BASE_URL}/rpm/api/v1/rpm/set_password/`

// SCHOOL_ADMIN
export const GET_SCHOOL_ADMINS_WP = `${BASE_URL}/school_admin/api/v1/school_admin/wp/all/`
export const GET_SCHOOL_ADMINS = `${BASE_URL}/school_admin/api/v1/school_admin/all/`
export const GET_SCHOOL_ADMIN_BY_ID = `${BASE_URL}/school_admin/api/v1/school_admin/`
export const CREATE_SCHOOL_ADMIN = `${BASE_URL}/school_admin/api/v1/school_admin/create/`
export const UPDATE_SCHOOL_ADMIN = `${BASE_URL}/school_admin/api/v1/school_admin/update/`
export const DELETE_SCHOOL_ADMIN = `${BASE_URL}/school_admin/api/v1/school_admin/delete/`

// SCHOOL
export const GET_SCHOOLS_WP = `${BASE_URL}/school/api/v1/school/wp/all/`
export const GET_SCHOOLS = `${BASE_URL}/school/api/v1/school/all/`
export const GET_SCHOOL_BY_ID = `${BASE_URL}/school/api/v1/school/`
export const CREATE_SCHOOL = `${BASE_URL}/school/api/v1/school/create/`
export const UPDATE_SCHOOL = `${BASE_URL}/school/api/v1/school/update/`
export const DELETE_SCHOOL = `${BASE_URL}/school/api/v1/school/delete/`

// school endpoints for teacher
export const GET_TEACHER_SCHOOLS_WP = `${BASE_URL}/school/api/v1/teacher_school/wp/all/`

// school endpoints for rpm
export const GET_RPM_SCHOOLS_WP = `${BASE_URL}/school/api/v1/rpm_school/wp/all/`
export const GET_RPM_SCHOOLS = `${BASE_URL}/school/api/v1/rpm_school/all/`
export const GET_RPM_SCHOOL_BY_ID = `${BASE_URL}/school/api/v1/rpm_school/`
export const CREATE_RPM_SCHOOL = `${BASE_URL}/school/api/v1/rpm_school/create/`
export const UPDATE_RPM_SCHOOL = `${BASE_URL}/school/api/v1/rpm_school/update/`
export const DELETE_RPM_SCHOOL = `${BASE_URL}/school/api/v1/rpm_school/delete/`

// SECTION
export const GET_SECTIONS_WP = `${BASE_URL}/section/api/v1/section/wp/all/`
export const GET_RPM_SECTIONS_WP = `${BASE_URL}/section/api/v1/rpm_section/wp/all/`
export const GET_TEACHER_SECTIONS_WP = `${BASE_URL}/section/api/v1/teacher_section/wp/all/`
export const GET_SECTIONS_WP2 = `${BASE_URL}/section/api/v1/section/wp2/all/`
export const GET_SECTIONS = `${BASE_URL}/section/api/v1/section/all/`
export const GET_SECTIONS_SCHOOL_ID = `${BASE_URL}/section/api/v1/section/get_all_by_school_id/`
export const GET_SECTION_BY_ID = `${BASE_URL}/section/api/v1/section/`
export const CREATE_SECTION = `${BASE_URL}/section/api/v1/section/create/`
export const UPDATE_SECTION = `${BASE_URL}/section/api/v1/section/update/`
export const DELETE_SECTION = `${BASE_URL}/section/api/v1/section/delete/`

// SERVICE_HOUR
export const GET_SERVICE_HOURS_WP = `${BASE_URL}/service_hour/api/v1/service_hour/wp/all/`
export const GET_SERVICE_HOURS = `${BASE_URL}/service_hour/api/v1/service_hour/all/`
export const GET_SERVICE_HOUR_BY_ID = `${BASE_URL}/service_hour/api/v1/service_hour/`
export const CREATE_SERVICE_HOUR = `${BASE_URL}/service_hour/api/v1/service_hour/create/`
export const UPDATE_SERVICE_HOUR = `${BASE_URL}/service_hour/api/v1/service_hour/update/`
export const DELETE_SERVICE_HOUR = `${BASE_URL}/service_hour/api/v1/service_hour/delete/`

// REGION
export const GET_REGIONS_WP = `${BASE_URL}/region/api/v1/region/wp/all/`
export const GET_RPM_REGIONS_WP = `${BASE_URL}/region/api/v1/rpm_region/wp/all/`
export const GET_REGIONS = `${BASE_URL}/region/api/v1/region/all/`
export const GET_REGION_BY_ID = `${BASE_URL}/region/api/v1/region/`
export const CREATE_REGION = `${BASE_URL}/region/api/v1/region/create/`
export const UPDATE_REGION = `${BASE_URL}/region/api/v1/region/update/`
export const DELETE_REGION = `${BASE_URL}/region/api/v1/region/delete/`

// STUDENT
export const GET_STUDENT_DASHBOARD_DATA = `${BASE_URL}/student/api/v1/student/dashboard_data/`

export const GET_STUDENTS_WP = `${BASE_URL}/student/api/v1/student/wp/all/`
export const GET_STUDENTS = `${BASE_URL}/student/api/v1/student/all/`
export const GET_STUDENT_BY_ID = `${BASE_URL}/student/api/v1/student/`
export const SIGNUP_STUDENT = `${BASE_URL}/student/api/v1/student/signup/`
export const CREATE_STUDENT = `${BASE_URL}/student/api/v1/student/create/`
export const UPDATE_STUDENT = `${BASE_URL}/student/api/v1/student/update/`
export const DELETE_STUDENT = `${BASE_URL}/student/api/v1/student/delete/`
export const SET_STUDENT_PASSWORD = `${BASE_URL}/student/api/v1/student/set_password/`

// student endpoints for admin
export const GET_ADMIN_STUDENTS_WP = `${BASE_URL}/student/api/v1/admin_student/wp/all/`
export const GET_ADMIN_STUDENTS = `${BASE_URL}/student/api/v1/admin_student/all/`
export const GET_ADMIN_STUDENT_BY_ID = `${BASE_URL}/student/api/v1/admin_student/`
export const CREATE_ADMIN_STUDENT = `${BASE_URL}/student/api/v1/admin_student/create/`
export const UPDATE_ADMIN_STUDENT = `${BASE_URL}/student/api/v1/admin_student/update/`
export const DELETE_ADMIN_STUDENT = `${BASE_URL}/student/api/v1/admin_student/delete/`
export const SET_ADMIN_STUDENT_PASSWORD = `${BASE_URL}/student/api/v1/admin_student/set_password/`

// student endpoints for rpm
export const GET_RPM_STUDENTS_WP = `${BASE_URL}/student/api/v1/rpm_student/wp/all/`
export const GET_RPM_STUDENTS = `${BASE_URL}/student/api/v1/rpm_student/all/`
export const GET_RPM_STUDENT_BY_ID = `${BASE_URL}/student/api/v1/rpm_student/`
export const CREATE_RPM_STUDENT = `${BASE_URL}/student/api/v1/rpm_student/create/`
export const UPDATE_RPM_STUDENT = `${BASE_URL}/student/api/v1/rpm_student/update/`
export const DELETE_RPM_STUDENT = `${BASE_URL}/student/api/v1/rpm_student/delete/`
export const SET_RPM_STUDENT_PASSWORD = `${BASE_URL}/student/api/v1/rpm_student/set_password/`

// student endpoints for teacher
export const GET_TEACHER_STUDENTS_WP = `${BASE_URL}/student/api/v1/teacher_student/wp/all/`
export const GET_TEACHER_STUDENTS = `${BASE_URL}/student/api/v1/teacher_student/all/`
export const GET_TEACHER_STUDENT_BY_ID = `${BASE_URL}/student/api/v1/teacher_student/`
export const CREATE_TEACHER_STUDENT = `${BASE_URL}/student/api/v1/teacher_student/create/`
export const UPDATE_TEACHER_STUDENT = `${BASE_URL}/student/api/v1/teacher_student/update/`
export const DELETE_TEACHER_STUDENT = `${BASE_URL}/student/api/v1/teacher_student/delete/`
export const SET_TEACHER_STUDENT_PASSWORD = `${BASE_URL}/student/api/v1/teacher_student/set_password/`

// TEACHER
export const GET_TEACHER_DASHBOARD_DATA = `${BASE_URL}/teacher/api/v1/teacher/dashboard_data/`

export const GET_TEACHERS_WP = `${BASE_URL}/teacher/api/v1/teacher/wp/all/`
export const GET_TEACHERS_WP2 = `${BASE_URL}/teacher/api/v1/teacher/wp2/all/`
export const GET_TEACHERS = `${BASE_URL}/teacher/api/v1/teacher/all/`
export const GET_RPM_TEACHERS = `${BASE_URL}/teacher/api/v1/rpm_teacher/all/`
export const GET_TEACHER_BY_ID = `${BASE_URL}/teacher/api/v1/teacher/`
export const CREATE_TEACHER = `${BASE_URL}/teacher/api/v1/teacher/create/`
export const UPDATE_TEACHER = `${BASE_URL}/teacher/api/v1/teacher/update/`
export const DELETE_TEACHER = `${BASE_URL}/teacher/api/v1/teacher/delete/`
export const SET_TEACHER_PASSWORD = `${BASE_URL}/teacher/api/v1/teacher/set_password/`

// teacher endpoints for rpm
export const GET_RPM_TEACHERS_WP = `${BASE_URL}/teacher/api/v1/rpm_teacher/wp/all/`
export const GET_RPM_RPM_TEACHERS = `${BASE_URL}/teacher/api/v1/rpm_teacher/all/`
export const GET_RPM_TEACHER_BY_ID = `${BASE_URL}/teacher/api/v1/rpm_teacher/`
export const CREATE_RPM_TEACHER = `${BASE_URL}/teacher/api/v1/rpm_teacher/create/`
export const UPDATE_RPM_TEACHER = `${BASE_URL}/teacher/api/v1/rpm_teacher/update/`
export const DELETE_RPM_TEACHER = `${BASE_URL}/teacher/api/v1/rpm_teacher/delete/`
export const SET_RPM_TEACHER_PASSWORD = `${BASE_URL}/teacher/api/v1/rpm_teacher/set_password/`

// INSTRUCTOR
export const GET_INSTRUCTOR_DASHBOARD_DATA = `${BASE_URL}/instructor/api/v1/instructor/dashboard_data/`

export const GET_INSTRUCTORS_WP = `${BASE_URL}/instructor/api/v1/instructor/wp/all/`
export const GET_INSTRUCTORS = `${BASE_URL}/instructor/api/v1/instructor/all/`
export const GET_INSTRUCTOR_BY_ID = `${BASE_URL}/instructor/api/v1/instructor/`
export const CREATE_INSTRUCTOR = `${BASE_URL}/instructor/api/v1/instructor/create/`
export const UPDATE_INSTRUCTOR = `${BASE_URL}/instructor/api/v1/instructor/update/`
export const DELETE_INSTRUCTOR = `${BASE_URL}/instructor/api/v1/instructor/delete/`
export const SET_INSTRUCTOR_PASSWORD = `${BASE_URL}/instructor/api/v1/instructor/set_password/`

// LMS-APP'S-ENDPOINTS
// COURSE_CATEGORY
export const GET_COURSE_CATEGORYS_WP = `${BASE_URL}/course_category/api/v1/course_category/wp/all/`
export const GET_COURSE_CATEGORYS = `${BASE_URL}/course_category/api/v1/course_category/all/`
export const GET_COURSE_CATEGORY_BY_ID = `${BASE_URL}/course_category/api/v1/course_category/`
export const CREATE_COURSE_CATEGORY = `${BASE_URL}/course_category/api/v1/course_category/create/`
export const UPDATE_COURSE_CATEGORY = `${BASE_URL}/course_category/api/v1/course_category/update/`
export const DELETE_COURSE_CATEGORY = `${BASE_URL}/course_category/api/v1/course_category/delete/`

// COURSE
export const GET_COURSES_WP = `${BASE_URL}/course/api/v1/course/wp/all/`
export const GET_COURSES = `${BASE_URL}/course/api/v1/course/all/`
export const GET_COURSE_BY_ID = `${BASE_URL}/course/api/v1/course/`
export const CREATE_COURSE = `${BASE_URL}/course/api/v1/course/create/`
export const UPDATE_COURSE = `${BASE_URL}/course/api/v1/course/update/`
export const DELETE_COURSE = `${BASE_URL}/course/api/v1/course/delete/`

// exceptional endpoints
export const GET_PREMIUM_COURSES = `${BASE_URL}/course/api/v1/course/premium/all/`
export const GET_BEST_RATED_COURSES = `${BASE_URL}/course/api/v1/course/best_rated/all/`
export const GET_COURSE_AND_SECTIONS_BY_COURSE_ID = `${BASE_URL}/course/api/v1/course_and_sections_by_course_id/`
export const PUBLISH_OR_UNPUBLISH_COURSE_BY_ADMIN_BY_ID = `${BASE_URL}/course/api/v1/course/publish_unpublish/`
export const MAKE_COURSE_MICROCREDENTIAL_BY_ADMIN_BY_ID = `${BASE_URL}/course/api/v1/course/make_microcredential/`

// course endpoints for instructor
export const GET_INSTRUCTOR_COURSES_WP = `${BASE_URL}/course/api/v1/instructor_course/wp/all/`
export const GET_INSTRUCTOR_COURSES = `${BASE_URL}/course/api/v1/instructor_course/all/`
export const GET_INSTRUCTOR_COURSE_BY_ID = `${BASE_URL}/course/api/v1/instructor_course/`
export const CREATE_INSTRUCTOR_COURSE = `${BASE_URL}/course/api/v1/instructor_course/create/`
export const UPDATE_INSTRUCTOR_COURSE = `${BASE_URL}/course/api/v1/instructor_course/update/`
export const DELETE_INSTRUCTOR_COURSE = `${BASE_URL}/course/api/v1/instructor_course/delete/`

// COURSE_COMMENT
export const GET_COURSE_COMMENTS_WP = `${BASE_URL}/course_comment/api/v1/course_comment/wp/all/`
export const GET_COURSE_COMMENTS = `${BASE_URL}/course_comment/api/v1/course_comment/all/`
export const GET_COURSE_COMMENT_BY_ID = `${BASE_URL}/course_comment/api/v1/course_comment/`
export const CREATE_COURSE_COMMENT = `${BASE_URL}/course_comment/api/v1/course_comment/create/`
export const UPDATE_COURSE_COMMENT = `${BASE_URL}/course_comment/api/v1/course_comment/update/`
export const DELETE_COURSE_COMMENT = `${BASE_URL}/course_comment/api/v1/course_comment/delete/`

// ENROLLMENT
export const GET_COURSE_COMPLETION_CERTIFICATE_DATA = `${BASE_URL}/enrollment/api/v1/enrollment/certificate_data/`
export const DOWNLOAD_COURSE_COMPLETION_CERTIFICATE = `${BASE_URL}/enrollment/api/v1/enrollment/download_certificate/`
export const GET_ENROLLMENTS_WP = `${BASE_URL}/enrollment/api/v1/enrollment/wp/all/`
export const GET_ENROLLMENTS = `${BASE_URL}/enrollment/api/v1/enrollment/all/`
export const GET_ENROLLMENTS_BY_STUDENT = `${BASE_URL}/enrollment/api/v1/enrollment/by_student/wp/all/`
export const INCREASE_LECTURES_COUNT_ON_ENROLLMENT = `${BASE_URL}/enrollment/api/v1/enrollment/increase_lectures_count_on_enrollment/`
export const GET_ENROLLMENT_LECTURES_BY_STUDENT_COURSE_ID = `${BASE_URL}/enrollment/api/v1/enrollment_and_lectures/by_student_and_course_id/`
export const GET_ENROLLMENT_BY_ID = `${BASE_URL}/enrollment/api/v1/enrollment/`
export const CREATE_ENROLLMENT = `${BASE_URL}/enrollment/api/v1/enrollment/create/`
export const UPDATE_ENROLLMENT = `${BASE_URL}/enrollment/api/v1/enrollment/update/`
export const DELETE_ENROLLMENT = `${BASE_URL}/enrollment/api/v1/enrollment/delete/`

// ASSIGNMENT
export const GET_ASSIGNMENTS_WP = `${BASE_URL}/assignment/api/v1/assignment/wp/all/`
export const GET_ASSIGNMENTS = `${BASE_URL}/assignment/api/v1/assignment/all/`
export const GET_ASSIGNMENT_BY_ID = `${BASE_URL}/assignment/api/v1/assignment/`
export const CREATE_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/assignment/create/`
export const UPDATE_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/assignment/update/`
export const DELETE_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/assignment/delete/`

// assignment endpoints for instructor
export const GET_INSTRUCTOR_ASSIGNMENTS_WP = `${BASE_URL}/assignment/api/v1/instructor_assignment/wp/all/`
export const GET_INSTRUCTOR_ASSIGNMENTS = `${BASE_URL}/assignment/api/v1/instructor_assignment/all/`
export const GET_INSTRUCTOR_ASSIGNMENT_BY_ID = `${BASE_URL}/assignment/api/v1/instructor_assignment/`
export const CREATE_INSTRUCTOR_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/instructor_assignment/create/`
export const UPDATE_INSTRUCTOR_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/instructor_assignment/update/`
export const DELETE_INSTRUCTOR_ASSIGNMENT = `${BASE_URL}/assignment/api/v1/instructor_assignment/delete/`

// ASSIGNMENT_SUBMISSION
export const GET_SUBMITTED_ASSIGNMENTS_BY_STUDENT = `${BASE_URL}/assignment_submission/api/v1/submitted_assignments_by_student/`
export const GET_ASSIGNMENT_SUBMISSIONS_WP = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/wp/all/`
export const GET_ASSIGNMENT_SUBMISSIONS = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/all/`
export const GET_ASSIGNMENT_SUBMISSION_BY_ID = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/`
export const CREATE_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/create/`
export const CREATE_OR_UPDATE_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/create_or_update/`
export const UPDATE_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/update/`
export const DELETE_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/assignment_submission/delete/`

// assignment-submission endpoints for instructor
export const GET_INSTRUCTOR_ASSIGNMENT_SUBMISSIONS_WP = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/wp/all/`
export const GET_INSTRUCTOR_ASSIGNMENT_SUBMISSIONS = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/all/`
export const GET_INSTRUCTOR_ASSIGNMENT_SUBMISSION_BY_ID = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/`
export const GET_INSTRUCTOR_ASSIGNMENT_SUBMISSIONS_BY_ASSIGNMENT_ID = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission_by_assignment_id/all/`
export const CREATE_INSTRUCTOR_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/create/`
export const UPDATE_INSTRUCTOR_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/update/`
export const DELETE_INSTRUCTOR_ASSIGNMENT_SUBMISSION = `${BASE_URL}/assignment_submission/api/v1/instructor_assignment_submission/delete/`

// LECTURE_SECTION
export const GET_LECTURE_SECTIONS_WP = `${BASE_URL}/lecture_section/api/v1/lecture_section/wp/all/`
export const GET_LECTURE_SECTIONS = `${BASE_URL}/lecture_section/api/v1/lecture_section/all/`
export const GET_LECTURE_SECTION_BY_ID = `${BASE_URL}/lecture_section/api/v1/lecture_section/`
export const CREATE_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/lecture_section/create/`
export const UPDATE_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/lecture_section/update/`
export const DELETE_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/lecture_section/delete/`

// lecture-section endpoints for instructor
export const GET_INSTRUCTOR_LECTURE_SECTIONS_WP = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/wp/all/`
export const GET_INSTRUCTOR_LECTURE_SECTIONS_BY_COURSE_ID_WP = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_sections_by_course_id/`
export const GET_INSTRUCTOR_LECTURE_SECTIONS = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/all/`
export const GET_INSTRUCTOR_LECTURE_SECTION_BY_ID = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/`
export const CREATE_INSTRUCTOR_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/create/`
export const UPDATE_INSTRUCTOR_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/update/`
export const UPDATE_INSTRUCTOR_LECTURE_SECTION_SORTING = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/update_sorting/`
export const DELETE_INSTRUCTOR_LECTURE_SECTION = `${BASE_URL}/lecture_section/api/v1/instructor_lecture_section/delete/`

// LECTURE
export const GET_LECTURES_WP = `${BASE_URL}/lecture/api/v1/lecture/wp/all/`
export const GET_LECTURES = `${BASE_URL}/lecture/api/v1/lecture/all/`
export const GET_LECTURE_BY_ID = `${BASE_URL}/lecture/api/v1/lecture/`
export const CREATE_LECTURE = `${BASE_URL}/lecture/api/v1/lecture/create/`
export const UPDATE_LECTURE = `${BASE_URL}/lecture/api/v1/lecture/update/`
export const DELETE_LECTURE = `${BASE_URL}/lecture/api/v1/lecture/delete/`

// lecture endpoints for instructor
export const GET_INSTRUCTOR_LECTURES_WP = `${BASE_URL}/lecture/api/v1/instructor_lecture/wp/all/`
export const GET_INSTRUCTOR_LECTURES = `${BASE_URL}/lecture/api/v1/instructor_lecture/all/`
export const GET_INSTRUCTOR_LECTURE_BY_ID = `${BASE_URL}/lecture/api/v1/instructor_lecture/`
export const CREATE_INSTRUCTOR_LECTURE = `${BASE_URL}/lecture/api/v1/instructor_lecture/create/`
export const UPDATE_INSTRUCTOR_LECTURE = `${BASE_URL}/lecture/api/v1/instructor_lecture/update/`
export const UPDATE_INSTRUCTOR_LECTURE_SORTING = `${BASE_URL}/lecture/api/v1/instructor_lecture/update_sorting/`
export const DELETE_INSTRUCTOR_LECTURE = `${BASE_URL}/lecture/api/v1/instructor_lecture/delete/`

// LECTURE_RESOURCE
export const GET_LECTURE_RESOURCES_WP = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/wp/all/`
export const GET_LECTURE_RESOURCES = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/all/`
export const GET_LECTURE_RESOURCE_BY_ID = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/`
export const CREATE_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/create/`
export const UPDATE_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/update/`
export const DELETE_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/lecture_resource/delete/`

// lecture_resource endpoints for instructor
export const GET_INSTRUCTOR_LECTURE_RESOURCES_WP = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/wp/all/`
export const GET_INSTRUCTOR_LECTURE_RESOURCES = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/all/`
export const GET_INSTRUCTOR_LECTURE_RESOURCE_BY_ID = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/`
export const GET_INSTRUCTOR_LECTURE_RESOURCE_BY_LECTURE_ID = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource_by_lecture_id/`
export const CREATE_INSTRUCTOR_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/create/`
export const UPDATE_INSTRUCTOR_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/update/`
export const DELETE_INSTRUCTOR_LECTURE_RESOURCE = `${BASE_URL}/lecture_resource/api/v1/instructor_lecture_resource/delete/`

// QUIZ
export const GET_QUIZS_WP = `${BASE_URL}/quiz/api/v1/quiz/wp/all/`
export const GET_QUIZS = `${BASE_URL}/quiz/api/v1/quiz/all/`
export const GET_QUIZ_BY_ID = `${BASE_URL}/quiz/api/v1/quiz/`
export const CREATE_QUIZ = `${BASE_URL}/quiz/api/v1/quiz/create/`
export const UPDATE_QUIZ = `${BASE_URL}/quiz/api/v1/quiz/update/`
export const DELETE_QUIZ = `${BASE_URL}/quiz/api/v1/quiz/delete/`

// quiz endpoints for instructor
export const GET_INSTRUCTOR_QUIZS_WP = `${BASE_URL}/quiz/api/v1/instructor_quiz/wp/all/`
export const GET_INSTRUCTOR_QUIZS = `${BASE_URL}/quiz/api/v1/instructor_quiz/all/`
export const GET_INSTRUCTOR_QUIZ_BY_ID = `${BASE_URL}/quiz/api/v1/instructor_quiz/`
export const CREATE_INSTRUCTOR_QUIZ = `${BASE_URL}/quiz/api/v1/instructor_quiz/create/`
export const UPDATE_INSTRUCTOR_QUIZ = `${BASE_URL}/quiz/api/v1/instructor_quiz/update/`
export const DELETE_INSTRUCTOR_QUIZ = `${BASE_URL}/quiz/api/v1/instructor_quiz/delete/`

// LECTURE_DURATION_GUIDE
export const GET_LECTURE_DURATION_GUIDES_WP = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/wp/all/`
export const GET_LECTURE_DURATION_GUIDES = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/all/`
export const GET_LECTURE_DURATION_GUIDE_BY_ID = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/`
export const CREATE_LECTURE_DURATION_GUIDE = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/create/`
export const UPDATE_LECTURE_DURATION_GUIDE = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/update/`
export const DELETE_LECTURE_DURATION_GUIDE = `${BASE_URL}/lecture_duration_guide/api/v1/lecture_duration_guide/delete/`

// STUDENT_LECTURE_PROGRESS
export const GET_STUDENT_LECTURE_PROGRESSES_WP = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/wp/all/`
export const GET_STUDENT_LECTURE_PROGRESSES_BY_STUDENT_WP = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/by_student/wp/all/`
export const GET_STUDENT_LECTURE_PROGRESSES = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/all/`
export const GET_STUDENT_LECTURE_PROGRESS_BY_ID = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/`
export const CREATE_STUDENT_LECTURE_PROGRESS = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/create/`
export const UPDATE_OR_CREATE_STUDENT_LECTURE_PROGRESS = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/update_or_create/`
export const UPDATE_STUDENT_LECTURE_PROGRESS = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/update/`
export const DELETE_STUDENT_LECTURE_PROGRESS = `${BASE_URL}/student_lecture_progress/api/v1/student_lecture_progress/delete/`

// QUIZ_QUESTION
export const GET_QUIZ_QUESTIONS_WP = `${BASE_URL}/quiz_question/api/v1/quiz_question/wp/all/`
export const GET_QUIZ_QUESTIONS = `${BASE_URL}/quiz_question/api/v1/quiz_question/all/`
export const GET_QUIZ_QUESTION_BY_COURSE_ID_QUIZ_ID = `${BASE_URL}/quiz_question/api/v1/quiz_question_by_course_id_quiz_id/`
export const GET_QUIZ_QUESTION_BY_ID = `${BASE_URL}/quiz_question/api/v1/quiz_question/`
export const CREATE_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/quiz_question/create/`
export const UPDATE_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/quiz_question/update/`
export const DELETE_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/quiz_question/delete/`

// quiz_question endpoints for instructor
export const GET_INSTRUCTOR_QUIZ_QUESTIONS_WP = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/wp/all/`
export const GET_INSTRUCTOR_QUIZ_QUESTIONS = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/all/`
export const GET_INSTRUCTOR_QUIZ_QUESTION_BY_ID = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/`
export const GET_INSTRUCTOR_QUIZ_QUESTION_BY_QUIZ_ID = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question_by_quiz_id/`
export const CREATE_INSTRUCTOR_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/create/`
export const UPDATE_INSTRUCTOR_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/update/`
export const DELETE_INSTRUCTOR_QUIZ_QUESTION = `${BASE_URL}/quiz_question/api/v1/instructor_quiz_question/delete/`

// QUIZ_SUBMISSION
export const GET_QUIZ_SUBMISSIONS_WP = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/wp/all/`
export const GET_QUIZ_SUBMISSIONS = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/all/`
export const GET_STUDENT_QUIZ_SUBMISSIONS_COUNT_LIST_BY_STUDENT = `${BASE_URL}/quiz_submission/api/v1/student_quiz_submissions_count_list_by_student/`
export const CREATE_STUDENT_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/student_quiz_submission_create/`
export const UPDATE_STUDENT_QUIZ_SUBMISSION_AND_CREATE_ANSWERS = `${BASE_URL}/quiz_submission/api/v1/student_quiz_submission_update_and_create_answers/`
export const GET_QUIZ_SUBMISSION_BY_ID = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/`
export const CREATE_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/create/`
export const UPDATE_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/update/`
export const DELETE_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/quiz_submission/delete/`

// quiz_submission endpoints for instructor
export const GET_INSTRUCTOR_QUIZ_SUBMISSIONS_WP = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/wp/all/`
export const GET_INSTRUCTOR_QUIZ_SUBMISSIONS = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/all/`
export const GET_INSTRUCTOR_QUIZ_SUBMISSION_BY_ID = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/`
export const GET_INSTRUCTOR_QUIZ_SUBMISSION_BY_STUDENT_ID_COURSE_ID = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission_by_student_id_course_id/`
export const CREATE_INSTRUCTOR_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/create/`
export const UPDATE_INSTRUCTOR_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/update/`
export const DELETE_INSTRUCTOR_QUIZ_SUBMISSION = `${BASE_URL}/quiz_submission/api/v1/instructor_quiz_submission/delete/`

