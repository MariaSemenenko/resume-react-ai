import './ContactHero.css'

export default function ContactHero() {
  return <section className="contact-hero" aria-labelledby="contact-title">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span>Contact</span></nav>
      <p className="contact-eyebrow">Contact me</p>
      <h1 id="contact-title">Let's make something<br />awesome together!</h1>
    </div>
  </section>
}
