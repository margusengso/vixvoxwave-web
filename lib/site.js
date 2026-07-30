export const SITE_NAME = 'VixVoxWave'
export const SITE_ORIGIN = 'https://vixvoxwave.com'
export const SUPPORT_EMAIL = 'support.vixvoxwave@gmail.com'

export const SITE_DESCRIPTION =
  'VixVoxWave is a local-first audio experience that listens in the foreground, finds a memorable phrase or room event, waits for the moment, and plays it back in your chosen style.'

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_ORIGIN).toString()
}
