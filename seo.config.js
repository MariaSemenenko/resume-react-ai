import { blogPosts } from './src/data/blogPosts.js'

const siteUrl = 'https://cv-s.vercel.app'
const siteName = 'Mariia Semenenko'
const defaultImage = '/images/aboutM.jpg'

const pages = {
  '/': {
    title: 'Mariia Semenenko | CV & Fullstack Developer',
    description: 'View the CV and portfolio of Maria Semenenko, Fullstack Developer. Explore WordPress, WooCommerce, React, Laravel and Framer projects.',
  },
  '/about': {
    title: 'About Mariia Semenenko | CV ',
    description: 'Meet Maria Semenenko, CV & Fullstack Developer creating immersive, carefully crafted websites. Learn about her work and download her CV.',
  },
  '/contact': {
    title: 'Contact Mariia Semenenko | CV & Fullstack Developer',
    description: 'Contact Maria Semenenko CV to discuss your next website, WordPress, or ecommerce project. Based in Ukraine and working with clients worldwide.',
  },
  '/portfolio': {
    title: 'Portfolio | Mariia Semenenko CV ',
    description: 'Explore CV & selected WordPress, WooCommerce, Framer, and product websites by Maria Semenenko, built around real business goals.',
  },
  '/solutions': {
    title: 'Fullstack Developer Solutions | Mariia Semenenko',
    description: 'Discover web solutions by Mariia Semenenko, including Seleqt, ClearCRM, and Joss Home, built with Framer, WordPress, and WooCommerce.',
  },
  '/blog': {
    title: 'WordPress Development Blog | CV & Mariia Semenenko',
    description: 'Read WordPress development notes, custom plugin tutorials, and WooCommerce builds by Maria Semenenko.',
  },
  ...Object.fromEntries(blogPosts.map((post) => [`/blog/${post.slug}`, {
    title: `${post.title} | ${siteName}`,
    description: post.excerpt,
    image: post.image,
    imageAlt: post.title,
    published: post.date,
  }])),
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character])

function withSeo(html, pathname) {
  const page = Object.hasOwn(pages, pathname) ? pages[pathname] : null
  const title = page?.title ?? `Page not found | ${siteName}`
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="author" content="${siteName}" />`,
    `<meta name="robots" content="${page ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
  ]

  
  if (page) {
    const canonical = new URL(pathname, siteUrl).href
    const image = new URL(
      page.image ?? defaultImage,
      siteUrl
    ).href

    const imageAlt = escapeHtml(page.imageAlt ?? siteName)
    const description = escapeHtml(page.description)

    tags.push(
      `<meta name="description" content="${description}" />`,
      `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:type" content="${page.published ? 'article' : 'website'}" />`,
      `<meta property="og:site_name" content="${siteName}" />`,
      '<meta property="og:locale" content="en_US" />',
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:alt" content="${imageAlt}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${image}" />`,
      `<meta name="twitter:image:alt" content="${imageAlt}" />`,
    )

    if (page.published) {
      tags.push(
        `<meta property="article:published_time" content="${escapeHtml(page.published)}" />`
      )
    }
  }


  return html.replace(
  /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
  `<!-- seo:start -->
    ${tags.join('\n    ')}
    <!-- seo:end -->`
)
}

// Emit route-specific heads while keeping the existing React body and assets.
export default function seo() {
  return {
    name: 'portfolio-seo',
    enforce: 'post',
    transformIndexHtml(html, context) {
      const pathname = new URL(context.originalUrl ?? context.path, siteUrl).pathname
        .replace(/\/index\.html$/, '').replace(/\/$/, '') || '/'
      return withSeo(html, pathname)
    },
    configurePreviewServer(server) {
      // Match Vercel's directory indexes before Vite falls back to the home page.
      server.middlewares.use((request, _response, next) => {
        const pathname = new URL(request.url, siteUrl).pathname.replace(/\/$/, '') || '/'
        if (request.method === 'GET' || request.method === 'HEAD') {
          if (Object.hasOwn(pages, pathname)) {
            request.url = pathname === '/' ? '/index.html' : `${pathname}/index.html`
          } else if (!pathname.split('/').at(-1).includes('.')) {
            request.url = '/404.html'
          }
        }
        next()
      })
    },
    generateBundle(_, bundle) {
      const html = bundle['index.html'].source
      for (const pathname of Object.keys(pages)) {
        if (pathname === '/') continue
        this.emitFile({
          type: 'asset',
          fileName: `${pathname.slice(1)}/index.html`,
          source: withSeo(html, pathname),
        })
      }
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: withSeo(html, '/404'),
      })
    },
  }
}
