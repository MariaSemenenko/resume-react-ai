import { useRef } from 'react'
import BlogHero from '../components/BlogHero'
import useBlogReveal from '../hooks/useBlogReveal'
import './BlogPostPage.css'

function SafeExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

function ArticleSection({ section }) {
  return <section className="js-blog-reveal">
    <h2>{section.heading}</h2>
    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    {section.image && <img className="blog-article-image" src={section.image} alt={section.imageAlt || ''} loading="lazy" decoding="async" />}
    {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
    {section.ordered && <ol>{section.ordered.map((item) => <li key={item}>{item}</li>)}</ol>}
    {section.code && <pre><code>{section.code}</code></pre>}
    {section.links && <div className="blog-resource-links">{section.links.map((link) =>
      <SafeExternalLink key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></SafeExternalLink>
    )}</div>}
  </section>
}

function LinkGroup({ title, links }) {
  return <section className="blog-link-group" aria-labelledby={'blog-' + title.toLowerCase()}>
    <h2 id={'blog-' + title.toLowerCase()}>{title}</h2>
    <div>{links.map((link) => <SafeExternalLink key={link.label} href={link.href}>{link.label}</SafeExternalLink>)}</div>
  </section>
}

function Comments({ comments = [] }) {
  if (!comments.length) return null
  return <section className="blog-comments" aria-labelledby="blog-comments-title">
    <h2 id="blog-comments-title">Comments</h2>
    <div className="blog-comments-list">{comments.map((comment) =>
      <article key={comment.author + comment.date}>
        <div className="blog-comment-avatar" aria-hidden="true">{comment.author.charAt(0).toUpperCase()}</div>
        <div><h3>{comment.author}</h3><time dateTime={comment.date}>{comment.displayDate}</time><p>{comment.text}</p></div>
      </article>
    )}</div>
  </section>
}

export default function BlogPostPage({ post }) {
  const scope = useRef(null)
  useBlogReveal(scope)

  if (!post) {
    return <section className="blog-not-found page-container"><p>404</p><h1>Article not found</h1><a href="/blog">Return to the blog</a></section>
  }

  return <>
    <BlogHero title={post.title} eyebrow={post.category} image={post.image} />
    <article className="blog-article" ref={scope}>
      <div className="page-container blog-article-layout">
        <aside className="blog-article-meta js-blog-reveal" aria-label="Article details">
          <p>Author</p><span>{post.author}</span>
          <p>Published</p><time dateTime={post.date}>{post.displayDate}</time>
          <p>Views</p><span>{post.views}</span>
          <p>Category</p><span>{post.category}</span>
        </aside>
        <div className="blog-article-body">
          <p className="blog-article-lead js-blog-reveal">{post.intro}</p>
          {post.sections.map((section) => <ArticleSection key={section.heading} section={section} />)}
          <div className="blog-social-grid js-blog-reveal">
            <LinkGroup title="Follow" links={post.socialLinks} />
            <LinkGroup title="Share" links={post.shareLinks} />
          </div>
          <Comments comments={post.comments} />
          <div className="blog-article-cta"><p>Have a similar project in mind?</p><a href="/contact">Let’s talk <span aria-hidden="true">→</span></a></div>
        </div>
      </div>
    </article>
  </>
}
