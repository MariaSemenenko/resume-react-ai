const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/semenenkomaria/' },
  { label: 'GitHub', href: 'https://github.com/MariySemenenko/' },
]

const shareLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'X / Twitter', href: 'https://twitter.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/semenenkomaria/' },
]

export const blogPosts = [
  {
    slug: 'custom-plugin-football-matches-api',
    title: 'Custom Plugin: Football Matches API',
    date: '2025-05-16',
    displayDate: '16 May 2025',
    author: 'admin',
    views: 0,
    category: 'WordPress Development',
    image: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2025/05/fotbool.png',
    excerpt: 'Display football matches from football-data.org with league selection, a configurable date range, and an optional image.',
    intro: 'This plugin allows you to display football matches using the football-data.org API. It lets you select a league and specify a date range to display matches. There is also an option to upload an image that will be displayed on the page.',
    sections: [
      {
        heading: 'Features',
        bullets: [
          'Displays WooCommerce products in a slider.',
          'Select a league.',
          'Select a date range.',
          'Upload an image for the matches.',
          'Connects to the API to retrieve match data.',
        ],
      },
      {
        heading: 'Download and install',
        links: [{ label: 'Download the plugin ZIP from GitHub', href: 'https://github.com/MariySemenenko/Football-matches' }],
        ordered: [
          'Download the plugin.',
          'Activate it through the WordPress admin area.',
          'Enter your API key from football-data.org.',
          'Add the plugin shortcode to the page where the matches should appear.',
        ],
      },
      {
        heading: 'Settings and documentation',
        paragraphs: ['Configure the league, date range, API key, and optional image in the plugin settings.'],
        image: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2025/05/settings-api.png',
        imageAlt: 'Football Matches plugin API settings',
        links: [{ label: 'football-data.org quickstart documentation', href: 'https://www.football-data.org/documentation/quickstart' }],
      },
    ],
    socialLinks,
    shareLinks,
  },
  {
    slug: 'custom-plugin-flormar-slider',
    title: 'Custom Plugin: Flormar Slider',
    date: '2025-05-14',
    displayDate: '14 May 2025',
    author: 'admin',
    views: 0,
    category: 'WooCommerce',
    image: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2025/05/slider-woo.png',
    excerpt: 'A responsive WooCommerce product slider that presents best-selling products in a clean carousel.',
    intro: 'Flormar Slider is a simple WooCommerce product slider plugin that displays the best-selling products in a beautiful carousel format.',
    sections: [
      {
        heading: 'Features',
        bullets: [
          'Displays WooCommerce products in a slider.',
          'Supports filtering by minimum and maximum price.',
          'Uses Slick Carousel.',
          'Fully responsive.',
        ],
      },
      {
        heading: 'Installation',
        links: [{ label: 'Download the plugin ZIP from GitHub', href: 'https://github.com/MariySemenenko/flormar-slider' }],
        ordered: [
          'Download the ZIP archive from GitHub.',
          'Upload it to /wp-content/plugins/ via FTP or the WordPress Plugin Manager.',
          'Activate the plugin through the Plugins menu.',
          'Add the shortcode where the slider should appear.',
        ],
        code: "echo do_shortcode('[flormar-test-slider]');",
      },
    ],
    socialLinks,
    shareLinks,
  },
  {
    slug: 'wpb-plugin-tutorial',
    title: 'Custom Plugin: WPB Tutorial',
    date: '2024-12-11',
    displayDate: '11 Dec 2024',
    author: 'admin',
    views: 0,
    category: 'Tutorial',
    image: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2024/12/drink-1839134_1280.jpg',
    articleImage: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2024/12/follow.png',
    excerpt: 'A practical plugin that adds a social-profile message to the end of every WordPress post.',
    intro: 'This plugin adds a special message at the end of each post, encouraging readers to follow your social media profiles on Twitter, Facebook, GitHub, and more.',
    sections: [
      {
        heading: 'Plugin preview',
        image: 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2024/12/follow.png',
        imageAlt: 'Follow Us message created by the WPB tutorial plugin',
      },
      {
        heading: 'Installation',
        links: [{ label: 'Download the plugin ZIP from GitHub', href: 'https://github.com/MariaSemenenko/wpb-plugin-tutorial' }],
        ordered: [
          'Upload the plugin folder to /wp-content/plugins/.',
          'Activate the plugin through the Plugins menu in WordPress.',
          'Visit any post to see the Follow Us message.',
        ],
      },
    ],
    socialLinks,
    shareLinks,
  },
]

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}
