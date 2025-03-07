import Cookies from "js-cookie"
export const SITE_DOMAIN = 'http://localhost:8000'
export const RECAPTCHA_SITE_KEY  = import.meta.env.VITE_RECAPTCHA_SITE_KEY
export const token = Cookies.get('accessToken')

