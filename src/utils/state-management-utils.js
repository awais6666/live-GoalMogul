const INVITE_CODE_KEY = "invite_code"
const USER_SESSION_KEY = "user_session"
const POST_AUTH_REDIRECT_URL = "postAuthenticateRedirectURL"

export function checkAuthenticated(callback) {
  let session = localStorage.getItem(USER_SESSION_KEY)
  if (!session) {
    let res = [false, null]
    callback && callback(res)
    return res
  }
  session = JSON.parse(session)
  // session expires in one day
  let expiry = new Date(session.startTime)
  expiry.setDate(expiry.getDate() + 1)
  let res = [expiry > new Date(), session.token]
  callback && callback.apply(undefined, res)
  return res
}
export function createAuthenticatedSession(sessionData) {
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData))
}
export function removeAuthenticatedSession(sessionData) {
  localStorage.removeItem(USER_SESSION_KEY)
}

export function postAuthRedirOrFailover(failOverPath) {
  let redirURL = sessionStorage.getItem(POST_AUTH_REDIRECT_URL)
  if (redirURL) {
    sessionStorage.removeItem(POST_AUTH_REDIRECT_URL)
    window.location.href = redirURL
  } else {
    window.location.href = failOverPath
  }
}
export function getPostAuthRedirURL() {
  return sessionStorage.getItem(POST_AUTH_REDIRECT_URL)
}

export function setPostAuthRedirURL(path) {
  return sessionStorage.setItem(POST_AUTH_REDIRECT_URL, path)
}

export function getInviteCode() {
  return sessionStorage.getItem(INVITE_CODE_KEY)
}
export function storeInviteCode(code) {
  return sessionStorage.setItem(INVITE_CODE_KEY, code)
}
