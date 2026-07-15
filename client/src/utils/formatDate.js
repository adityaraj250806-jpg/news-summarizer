export function formatDate(isoString) {
  if (!isoString) return 'Unknown date'
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 1) {
    const mins = Math.floor(diffMs / (1000 * 60))
    return mins <= 1 ? 'Just now' : `${mins} minutes ago`
  }
  if (diffHours < 24) {
    const hrs = Math.floor(diffHours)
    return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
  }

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
}

export function truncateText(text, maxLength = 150) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}

export function cacheKey(type, value) {
  return `news_cache_${type}_${value}`
}
