import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ScrollProjectCard({ project, position }) {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)

  return <figure className="scroll-project-card" style={{
    '--card-x': `${position.x}%`,
    '--card-y': `${position.y}%`,
    '--card-mobile-x': `${position.mobileX}%`,
    '--card-mobile-y': `${position.mobileY}%`,
  }}>
    <figcaption>{project.client}</figcaption>
    {failed
      ? <div className="scroll-project-card__fallback">{project.title}</div>
      : <img
          src={project.image}
          alt={t('{{client}} website preview', { client: project.client })}
          width="480"
          height="320"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />}
  </figure>
}
