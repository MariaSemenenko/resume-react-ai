import { APIProvider, Map } from '@vis.gl/react-google-maps'
import './ContactMap.css'
import { useTranslation } from 'react-i18next'

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
const CHERKASY_REGION = { lat: 49.44, lng: 32.06 }

export default function ContactMap() {
  const { t } = useTranslation()
  return <section className="contact-map-section" aria-labelledby="contact-map-title">
    <div className="page-container">
      <div className="contact-map-heading">
        <p>{t('Location')}</p>
        <h2 id="contact-map-title">{t('Based in Ukraine, working worldwide.')}</h2>
      </div>
      <div className="contact-map-frame">
        {GOOGLE_MAPS_KEY ? <APIProvider apiKey={GOOGLE_MAPS_KEY}>
          <Map
            defaultCenter={CHERKASY_REGION}
            defaultZoom={7}
            gestureHandling="cooperative"
            mapTypeControl
            fullscreenControl
            streetViewControl={false}
            zoomControl
            reuseMaps
            aria-label={t('Map showing the Cherkasy region of Ukraine')}
          />
        </APIProvider> : <div className="contact-map-fallback" role="status">{t('The map is temporarily unavailable.')}</div>}
      </div>
    </div>
  </section>
}
