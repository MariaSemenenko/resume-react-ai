import { useTranslation } from 'react-i18next'
import CodeSampleIllustration from './CodeSampleIllustration'

export default function SolutionCharacter() {
  const { t } = useTranslation()

  return <div className="solution-character" role="img" aria-label={t('A code sample in a browser window, from outline to color')}>
    <CodeSampleIllustration className="solution-character__outline" />
    <CodeSampleIllustration className="solution-character__color" />
  </div>
}
