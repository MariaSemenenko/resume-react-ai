import { useTranslation } from 'react-i18next'
import InThoughtIllustration from './InThoughtIllustration'

export default function SolutionCharacter() {
  const { t } = useTranslation()

  return <div className="solution-character" role="img" aria-label={t('A person in thought, from outline to color')}>
    <InThoughtIllustration className="solution-character__outline" />
    <InThoughtIllustration className="solution-character__color" />
  </div>
}
