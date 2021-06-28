const API_BASE_URL = "https://api.goalmogul.com"

export function getComments(params: { [index: string]: string }) {
  try {
    return get(`/api/secure/feed/comment`, params)
  } catch (e) {
    throw e
  }
}

export function subToNewsLetter(email: string) {
  try {
    return post(
      `/api/pub/user/user-newsletter`,
      JSON.stringify({ email: email })
    )
  } catch (e) {
    throw e
  }
}

export async function getSubscribersList() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/pub/user/user-newsletter/get-list`
    )
    const respJSON = await response.json()
    return respJSON
  } catch (e) {
    throw e
  }
}

export function getGoalPub(params: { [index: string]: string }) {
  try {
    return get(`/api/pub/goal/${params.publicIdentifier}`, params)
  } catch (e) {
    throw e
  }
}

export function getGoal(params: { [index: string]: string }) {
  try {
    return get(`/api/secure/goal`, params)
  } catch (e) {
    throw e
  }
}

export function enableGoalPublicURL(params: { [index: string]: string }) {
  try {
    const body = JSON.stringify({
      ...params,
      updates: {
        isPublicURLEnabled: true,
      },
    })
    return put(`/api/secure/goal/`, body, params.token)
  } catch (e) {
    throw e
  }
}

export function getGoalUpdates(params: { [index: string]: string }) {
  try {
    return get(`/api/secure/feed/post/${params.goalId}/updates`, params)
  } catch (e) {
    throw e
  }
}

export function getUserGoals(params: { [index: string]: string }) {
  try {
    return get(`/api/secure/goal/user`, params)
  } catch (e) {
    throw e
  }
}

export function accountVerification(inputs: object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/secure/user/account/verification", body)
  } catch (e) {
    throw e
  }
}
export function updateAccount(inputs: object, token: string, section: string) {
  const body = JSON.stringify(inputs)
  try {
    return put(`/api/secure/user/account${section}`, body, token)
  } catch (e) {
    throw e
  }
}

export function getProfile(params: { [index: string]: string }) {
  try {
    return get("/api/secure/user/profile", params)
  } catch (e) {
    throw e
  }
}
/**
 * Get invitor info
 * @param params[inviteCode] Given a invite code, get the invitor's info
 */
export function getInvitor(params: { [index: string]: string }) {
  try {
    return get("/api/pub/user", params)
  } catch (e) {
    throw e
  }
}

/**
 * Verify account email or phone number
 * @param inputs[token] in email verification link or texted to phone number
 * @param inputs[for] email | phone
 */
export function verification(inputs: Object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/pub/user/verification", body)
  } catch (e) {
    throw e
  }
}

/**
 * Sets the password
 * @param inputs[password] new password
 * @param inputs[token] in reset password email link
 */
export function setPassword(inputs: Object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/pub/user/password/reset", body)
  } catch (e) {
    throw e
  }
}

/**
 * Request a pw reset link
 * @param inputs[email] address to recieve pw reset link
 * @param inputs[phone] number to recieve pw reset link
 */
export function pwResetRequest(inputs: Object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/pub/user/password/reset-request", body)
  } catch (e) {
    throw e
  }
}

/**
 * Login
 * @param inputs[email] address to login with
 * @param inputs[phone] number to login with
 * @param inputs[password] user pw
 */
export function login(inputs: Object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/pub/user/authenticate", body)
  } catch (e) {
    throw e
  }
}

/**
 * Register an account
 * @param inputs[name] user's name
 * @param inputs[email] user's email
 * @param inputs[phone] user's phone number. Optional.
 * @param inputs[password] user's password
 * @param inputs[inviteCode] inviteCode stored in local storage. Optional.
 */
export function register(inputs: Object) {
  const body = JSON.stringify(inputs)
  try {
    return post("/api/pub/user/", body)
  } catch (e) {
    throw e
  }
}

export async function post(path: string, body: string) {
  try {
    const resp = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
    const respJson = await resp.json()
    if (!resp.ok) {
      throw respJson.message
    }
    return respJson
  } catch (e) {
    throw e
  }
}

export async function get(path: string, params: { [index: string]: string }) {
  const url = new URL(`${API_BASE_URL}${path}`)
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )
  try {
    const resp = await fetch(url.toString(), { method: "GET" })
    const respJson = await resp.json()
    if (!resp.ok) {
      throw respJson.message
    }
    return respJson
  } catch (e) {
    throw e
  }
}

export async function put(path: string, body: string, token: string) {
  try {
    const resp = await fetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: body,
    })
    const respJson = await resp.json()
    if (!resp.ok) {
      throw respJson.message
    }
    return respJson
  } catch (e) {
    throw e
  }
}
