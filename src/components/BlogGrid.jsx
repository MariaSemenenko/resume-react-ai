import { blogPosts } from '../data/blogPosts'
import './BlogGrid.css'

function BlogCard({ post, priority }) {
  return <article className="blog-card">
    <a className="blog-card-image" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
      <img src={post.image} alt={`${post.title} preview`} loading={priority ? 'eager' : 'lazy'} />
    </a>
    <time dateTime={post.date}>{post.displayDate}</time>
    <div className="blog-card-content">
      <p>{post.category}</p>
      <h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
      <p className="blog-card-excerpt">{post.excerpt}</p>
      <a className="blog-read-more" href={`/blog/${post.slug}`}>Read article <span aria-hidden="true">→</span></a>
    </div>
  </article>
}

export default function BlogGrid() {
  return <section className="blog-index" aria-labelledby="blog-index-title">
    <div className="page-container">
      <div className="blog-index-heading">
        <p>Notes and builds</p>
        <h2 id="blog-index-title">Development stories</h2>
      </div>
      <div className="blog-grid">{blogPosts.map((post, index) => <BlogCard post={post} priority={index < 2} key={post.slug} />)}</div>
    </div>
  </section>
}
