import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blogPosts'
import useBlogReveal from '../hooks/useBlogReveal'
import './BlogGrid.css'

function BlogCard({ post, priority, t }) {
  const title = t(post.title)
  return <article className="blog-card js-blog-reveal">
    <a className="blog-card-image" href={`/blog/${post.slug}`} aria-label={t('Read {{title}}', { title })}>
      <img src={post.image} alt={t('{{client}} website preview', { client: title })} loading={priority ? 'eager' : 'lazy'} />
    </a>
    <time dateTime={post.date}>{post.displayDate}</time>
    <div className="blog-card-content">
      <p>{t(post.category)}</p>
      <h2><a href={`/blog/${post.slug}`}>{title}</a></h2>
      <p className="blog-card-excerpt">{t(post.excerpt)}</p>
      <a className="blog-read-more" href={`/blog/${post.slug}`}>{t('Read article')} <span aria-hidden="true">→</span></a>
    </div>
  </article>
}

export default function BlogGrid() {
  const { t } = useTranslation()
  const scope = useRef(null)
  useBlogReveal(scope)

  return <section className="blog-index" ref={scope} aria-labelledby="blog-index-title">
    <div className="page-container">
      <div className="blog-index-heading js-blog-reveal">
        <p>{t('Notes and builds')}</p>
        <h2 id="blog-index-title">{t('Development stories')}</h2>
      </div>
      <div className="blog-grid">{blogPosts.map((post, index) => <BlogCard post={post} priority={index < 2} t={t} key={post.slug} />)}</div>
    </div>
  </section>
}
