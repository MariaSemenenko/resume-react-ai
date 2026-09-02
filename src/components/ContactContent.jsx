import { useState } from 'react'
import './ContactContent.css'

const details = [
  { type: 'phone', label: '(+380) 67 153 73 06', href: 'tel:+380671537306' },
  { type: 'email', label: 'Mashyni92@gmail.com', href: 'mailto:Mashyni92@gmail.com' },
  { type: 'location', label: 'Cherkasy region, Ukraine, UA' },
]

function ContactIcon({ type }) {
  if (type === 'phone') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.8 8.4 3l2 5-2.2 1.5a15.3 15.3 0 0 0 6.3 6.3l1.5-2.2 5 2-.8 3.2c-.3 1.2-1.4 2-2.6 1.9A15.9 15.9 0 0 1 3.3 6.4c-.1-1.2.7-2.3 1.9-2.6Z" /></svg>
  if (type === 'email') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M15.5 9.5v4.2c0 1.2 1.8 1.4 2.5.4M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

function Field({ label, name, type = 'text', placeholder, required = false, maxLength = 200 }) {
  return <label className="contact-field"><span>{label}{required && <b aria-hidden="true">*</b>}</span><input name={name} type={type} placeholder={placeholder} autoComplete={name} required={required} maxLength={maxLength} /></label>
}

export default function ContactContent() {
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); setSent(true) }

  return <section className="contact-content" aria-label="Contact form and details">
    <div className="page-container contact-layout">
      <form className="contact-form" onSubmit={submit}>
        <div className="contact-field-grid">
          <Field label="Name" name="name" placeholder="Your name" required maxLength={100} />
          <Field label="Email" name="email" type="email" placeholder="Your email" required maxLength={254} />
          <Field label="Phone" name="tel" type="tel" placeholder="Your phone" maxLength={30} />
          <Field label="Subject" name="subject" placeholder="Your subject" required />
        </div>
        <label className="contact-field contact-message"><span>Your message (optional)</span><textarea name="message" rows="5" placeholder="Your message" maxLength={2000} /></label>
        <button className="contact-submit" type="submit">Submit</button>
        <p className="contact-status" role="status">{sent ? 'Thanks! Your message is ready to be sent.' : ''}</p>
      </form>
      <aside className="contact-card">
        <h2>Get In Touch</h2>
        <p>Thanks to its flexibility, WordPress has become the heart of millions of websites around the world.</p>
        <address>
          {details.map((item) => <div className="contact-detail" key={item.type}><ContactIcon type={item.type} />{item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}</div>)}
        </address>
      </aside>
    </div>
  </section>
}
