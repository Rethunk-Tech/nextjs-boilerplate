import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/utils'

const createEmotionCache = (): EmotionCache => {
  return createCache({ key: 'css' })
}

export default createEmotionCache
