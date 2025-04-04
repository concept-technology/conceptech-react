import Cookies from "js-cookie"
export const SITE_DOMAIN = import.meta.env.VITE_API_URL
export const RECAPTCHA_SITE_KEY  = import.meta.env.VITE_RECAPTCHA_SITE_KEY
export const token = Cookies.get('accessToken')
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
