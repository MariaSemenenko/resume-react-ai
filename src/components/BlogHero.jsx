import './BlogHero.css'

export default function BlogHero({ title = 'Latest Blog', eyebrow = 'Blog', image = 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2024/12/drink-1839134_1280.jpg' }) {
  return <section className="blog-hero" aria-labelledby="blog-hero-title">
    <img className="blog-hero-image" src={image} alt="" />
    <div className="blog-hero-overlay" />
    <div className="page-container blog-hero-content">
      <p>{eyebrow}</p>
      <h1 id="blog-hero-title">{title}</h1>
      <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true"> / </span>
        {title === 'Latest Blog' ? <span>Blog</span> : <><a href="/blog">Blog</a><span aria-hidden="true"> / </span><span>{title}</span></>}
      </nav>
    </div>
  </section>
}
