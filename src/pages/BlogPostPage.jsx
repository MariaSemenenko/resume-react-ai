import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import BlogHero from '../components/BlogHero'
import useBlogReveal from '../hooks/useBlogReveal'
import './BlogPostPage.css'

function SafeExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

function ArticleSection({ section, t }) {
  return <section className="js-blog-reveal">
    <h2>{t(section.heading)}</h2>
    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
    {section.image && <img className="blog-article-image" src={section.image} alt={t(section.imageAlt || '')} loading="lazy" decoding="async" />}
    {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{t(item)}</li>)}</ul>}
    {section.ordered && <ol>{section.ordered.map((item) => <li key={item}>{t(item)}</li>)}</ol>}
    {section.code && <pre><code>{section.code}</code></pre>}
    {section.links && <div className="blog-resource-links">{section.links.map((link) =>
      <SafeExternalLink key={link.href} href={link.href}>{t(link.label)} <span aria-hidden="true">↗</span></SafeExternalLink>
    )}</div>}
  </section>
}

function LinkGroup({ title, links, t }) {
  const id = 'blog-' + title.toLowerCase()
  return <section className="blog-link-group" aria-labelledby={id}>
    <h2 id={id}>{t(title)}</h2>
    <div>{links.map((link) => <SafeExternalLink key={link.label} href={link.href}>{link.label}</SafeExternalLink>)}</div>
  </section>
}

export default function BlogPostPage({ post }) {
  const { t } = useTranslation()
  const scope = useRef(null)
  useBlogReveal(scope)

  if (!post) {
    return <section className="blog-not-found page-container"><p>404</p><h1>{t('Article not found')}</h1><a href="/blog">{t('Return to the blog')}</a></section>
  }

  return <>
    <BlogHero title={post.title} eyebrow={post.category} image={post.image} />
    <article className="blog-article" ref={scope}>
      <div className="page-container blog-article-layout">
        <aside className="blog-article-meta js-blog-reveal" aria-label={t('Article details')}>
          <p>{t('Author')}</p><span>{post.author}</span>
          <p>{t('Published')}</p><time dateTime={post.date}>{post.displayDate}</time>
          <p>{t('Views')}</p><span>{post.views}</span>
          <p>{t('Category')}</p><span>{t(post.category)}</span>
        </aside>
        <div className="blog-article-body">
          <p className="blog-article-lead js-blog-reveal">{t(post.intro)}</p>
          {post.sections.map((section) => <ArticleSection key={section.heading} section={section} t={t} />)}
          <div className="blog-social-grid js-blog-reveal">
            <LinkGroup title="Follow" links={post.socialLinks} t={t} />
            <LinkGroup title="Share" links={post.shareLinks} t={t} />
          </div>
          <div className="blog-article-cta"><p>{t('Have a similar project in mind?')}</p><a href="/contact">{t('Let’s talk')} <span aria-hidden="true">→</span></a></div>
        </div>
      </div>
    </article>
  </>
}
