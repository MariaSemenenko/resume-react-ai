import { useRef } from 'react'
import './AboutIntro.css'
import { usePageIntro } from '../hooks/usePageIntro'

const assetBase = 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images'

export default function AboutIntro() {
  const aboutRef = useRef(null)
  usePageIntro(aboutRef)

  return <section className="about-intro" ref={aboutRef} aria-labelledby="about-title">
    <div className="page-container about-container">
      <p className="breadcrumbs"><a href="/">Home</a> / About</p>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-greeting js-intro-greeting">Hello, I am <span className="js-wave about-wave" role="img" aria-label="waving hand">👋</span></p>
          <h1 id="about-title" className="js-intro-title">Maria Semenenko</h1>
          <p className="about-description js-intro-copy">A <span>WordPress Developer</span> and Fullstack <span>based in UA</span>. I strive to build immersive, beautiful sites through carefully crafted, user-centric design.</p>
          <div className="about-actions js-intro-actions"><a className="about-download" href="https://dev-08.semenenko.pp.ua/wp-content/uploads/2026/04/Maria-Semenencko-Full-Stack-Front-end-Developer.pdf" target="_blank" rel="noreferrer">Download CV <span aria-hidden="true">↓</span></a><a className="about-contact" href="#contact">Contact me <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="about-visual js-intro-visual"><img className="about-flower js-spin" src={`${assetBase}/flower.png`} alt="" /><img className="about-image" src={`${assetBase}/aboutM.jpg`} alt="Maria Semenenko" /><span className="about-arrow js-arrow" aria-hidden="true">↝</span></div>
      </div>
    </div>
  </section>
}
