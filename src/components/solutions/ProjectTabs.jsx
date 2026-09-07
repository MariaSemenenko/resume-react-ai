import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function CheckIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path d="m4.5 8 2.25 2.25 4.75-4.5" fill="none" stroke="var(--color-on-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export default function ProjectTabs({ projects, renderPreview, children }) {
  const { t } = useTranslation()
  const id = useId()
  const tabs = useRef([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  function handleKeyDown(event, index) {
    let nextIndex

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % projects.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + projects.length) % projects.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = projects.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    setSelectedIndex(nextIndex)
    tabs.current[nextIndex]?.focus()
  }

  const tabList = <div className="solution-tabs" role="tablist" aria-label={t('Select a portfolio project')}>
    {projects.map((project, index) => <button
      key={project.client}
      ref={(element) => { tabs.current[index] = element }}
      id={`${id}-tab-${index}`}
      type="button"
      role="tab"
      aria-selected={selectedIndex === index}
      aria-controls={`${id}-panel-${index}`}
      tabIndex={selectedIndex === index ? 0 : -1}
      onClick={() => setSelectedIndex(index)}
      onKeyDown={(event) => handleKeyDown(event, index)}
    >
      {selectedIndex === index && <CheckIcon />}
      {project.client}
    </button>)}
  </div>

  const panels = projects.map((project, index) => <div
    key={project.client}
    id={`${id}-panel-${index}`}
    role="tabpanel"
    aria-labelledby={`${id}-tab-${index}`}
    tabIndex={0}
    hidden={selectedIndex !== index}
    className="solution-panel"
  >
    {selectedIndex === index && renderPreview(project, index)}
  </div>)

  return children({ project: projects[selectedIndex], tabList, panels })
}
