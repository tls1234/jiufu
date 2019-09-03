export const MAX_TIME_OUT = 5000

export const ERR_OK = 0

export const KEY_USER_INFO = 'userInfo'

export const KEY_SESSION_INFO = 'userSessionInfo'

export const DEV = process.env.NODE_ENV !== 'production'

export let HOST

if (window.location.href.match('localhost') || window.location.href.match('192.168.1') || window.location.href.match('10.1.2.54') || window.location.href.match('121.35.249.12')) {
  HOST = 'http://10.1.2.54:9003/'
} else {
  HOST = 'https://sns.9fstock.com'
}
