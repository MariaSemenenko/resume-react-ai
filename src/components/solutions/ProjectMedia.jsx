import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Add a local video URL to a project's data to replace its screenshot with a clip.
// The screenshot remains the poster; playback stays under the visitor's control.
export default function ProjectMedia({ project, decorative = false }) {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)
  const alt = decorative ? '' : t('{{client}} website preview', { client: project.client })

  if (failed) {
    return <div className="solution-media-fallback">
      <span>{project.client}</span>
      {!decorative && <p>{t('Preview unavailable. Use the project link to explore the website.')}</p>}
    </div>
  }

  if (project.video && !decorative) {
    return <video
      className="solution-media"
      src={project.video}
      poster={project.image}
      controls
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      onError={() => setFailed(true)}
    />
  }

  return <img
    className="solution-media"
    src={project.image}
    alt={alt}
    decoding="async"
    loading={decorative ? 'lazy' : 'eager'}
    onError={() => setFailed(true)}
  />
}
