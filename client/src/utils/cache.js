const CACHE_TTL_MS = 5 * 60 * 1000

export function getCache(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

export function setCache(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data: value, timestamp: Date.now() }))
  } catch {
    console.warn('sessionStorage write failed')
  }
}

export function clearCache(key) {
  try {
    sessionStorage.removeItem(key)
  } catch {
  }
}
