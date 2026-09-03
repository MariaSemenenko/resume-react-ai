import { useState } from 'react'
import './ContactContent.css'
import { useTranslation } from 'react-i18next'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim()

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
  const { t } = useTranslation()
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const isSubmitting = status.type === 'submitting'

  const submit = async (event) => {
    event.preventDefault()

    if (!WEB3FORMS_KEY) {
      setStatus({ type: 'error', message: t('The contact form is temporarily unavailable. Please email me directly.') })
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('access_key', WEB3FORMS_KEY)
    formData.set('from_name', 'Maria Semenenko Portfolio')

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12000)
    setStatus({ type: 'submitting', message: t('Sending your message...') })

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error('Submission failed')
      }

      form.reset()
      setStatus({ type: 'success', message: t('Thanks! Your message has been sent.') })
    } catch {
      setStatus({
        type: 'error',
        message: t('Your message could not be sent. Please try again or email me directly.'),
      })
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return <section className="contact-content" aria-label={t('Contact form and details')}>
    <div className="page-container contact-layout">
      <form className="contact-form" onSubmit={submit}>
        <input className="contact-botcheck" type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <div className="contact-field-grid">
          <Field label={t('Name')} name="name" placeholder={t('Your name')} required maxLength={100} />
          <Field label={t('Email')} name="email" type="email" placeholder={t('Your email')} required maxLength={254} />
          <Field label={t('Phone')} name="tel" type="tel" placeholder={t('Your phone')} maxLength={30} />
          <Field label={t('Subject')} name="subject" placeholder={t('Your subject')} required />
        </div>
        <label className="contact-field contact-message"><span>{t('Your message (optional)')}</span><textarea name="message" rows="5" placeholder={t('Your message')} maxLength={2000} /></label>
        <button className="contact-submit" type="submit" disabled={isSubmitting}>{t(isSubmitting ? 'Sending...' : 'Submit')}</button>
        <p className={`contact-status is-${status.type}`} role="status" aria-live="polite">{status.message}</p>
      </form>
      <aside className="contact-card">
        <h2>{t('Get In Touch')}</h2>
        <p>{t('Thanks to its flexibility, WordPress has become the heart of millions of websites around the world.')}</p>
        <address>
          {details.map((item) => <div className="contact-detail" key={item.type}><ContactIcon type={item.type} />{item.href ? <a href={item.href}>{item.label}</a> : <span>{t(item.label)}</span>}</div>)}
        </address>
      </aside>
    </div>
  </section>
}
