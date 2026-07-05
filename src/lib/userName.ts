export const DEFAULT_USER_NAME = '匿名地球人'
export const USER_NAME_STORAGE_KEY = 'karen_user_name'
export const MAX_USER_NAME_LENGTH = 12

export function limitUserNameInput(value: string) {
  const allowedOnly = value.replace(/[^\p{Script=Han}a-zA-Z0-9]/gu, '')
  return Array.from(allowedOnly).slice(0, MAX_USER_NAME_LENGTH).join('')
}

export function normalizeUserName(value: string) {
  const normalized = limitUserNameInput(value.trim())
  return normalized || DEFAULT_USER_NAME
}

export function readStoredUserName() {
  try {
    return normalizeUserName(localStorage.getItem(USER_NAME_STORAGE_KEY) || DEFAULT_USER_NAME)
  } catch {
    return DEFAULT_USER_NAME
  }
}

export function storeUserName(value: string) {
  const normalized = normalizeUserName(value)
  try { localStorage.setItem(USER_NAME_STORAGE_KEY, normalized) } catch { /* localStorage may be unavailable */ }
  return normalized
}
