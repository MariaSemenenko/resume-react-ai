import { useTranslation } from 'react-i18next'

const assetBase = `${import.meta.env.BASE_URL}solutions/`

export default function SolutionCharacter() {
  const { t } = useTranslation()

  return <div className="solution-character" role="img" aria-label={t('A creative developer character, from sketch to color')}>
    <img
      className="solution-character__outline"
      src={`${assetBase}character-outline.avif`}
      alt=""
      width="942"
      height="1218"
      loading="lazy"
      decoding="async"
    />
    <img
      className="solution-character__color"
      src={`${assetBase}character-color.png`}
      alt=""
      width="942"
      height="1218"
      loading="lazy"
      decoding="async"
    />
  </div>
}
