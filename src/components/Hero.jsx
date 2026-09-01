import { useRef } from 'react'
import './Hero.css'
import { usePageIntro } from '../hooks/usePageIntro'

const assetBase = 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images'

export default function Hero() {
  const heroRef = useRef(null)
  usePageIntro(heroRef)

  return <section className="hero-section" ref={heroRef} aria-labelledby="hero-title">
    <div className="page-container hero-container">
      <p className="breadcrumbs">Home</p>
      <p className="hero-greeting js-intro-greeting">Hello, I am <span className="js-wave hero-wave" aria-label="waving hand" role="img">👋</span></p>
      <h1 id="hero-title" className="js-intro-title"><mark>Web</mark> Developer.</h1>
      <div className="hero-visual js-intro-visual">
        <img className="hero-image" src={`${assetBase}/wordpress-589121_1280.jpg`} alt="A hand holding the WordPress logo" />
        <p className="hero-name js-intro-copy">Maria Semenenko</p>
        <div className="hero-clients js-intro-actions"><p>Worked with more than 100 people</p><div className="client-summary"><div className="client-avatars" aria-hidden="true">{[1, 2, 3, 4].map((number) => <img key={number} src={`${assetBase}/clients-img${number}.jpg`} alt="" />)}</div><span className="client-divider" aria-hidden="true" /><strong>30+<br />Clients</strong></div></div>
        <span className="hero-arrow js-arrow" aria-hidden="true">↝</span>
      </div>
    </div>
  </section>
}
