import { useMemo, useRef } from 'react'

export default function MediaEmbed({ src }: { src: string }): JSX.Element {
  const useIframe = useRef(false)

  const url = useMemo(() => {
    if (src.includes('youtube')) {
      const videoId = src.split('v=')[1]
      useIframe.current = true
      return `https://www.youtube.com/embed/${videoId}`
    }
  }, [src])

  if (useIframe.current) return <iframe
    allowFullScreen
    frameBorder="0"
    src={url + '?autoplay=1&mute=1&controls=0&loop=1&cc_load_policy=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&autohide=1&color=white&disablekb=1'}
    style={{
      display:   'block',
      minHeight: '310px',
      objectFit: 'cover',
      width:     '100%',
      margin:    'auto',
    }}
  />

  return <video
    controls
    src={url}
    style={{
      display: 'block',
      width:   '100%',
    }}
  />
}
