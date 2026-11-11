import { BlogCardLink } from '@/components/portfolio/blog-card'
import { getBlogs } from '@/lib/blogs'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Blog | Hasnane Nawaz',
  description: 'Social media marketing insights, community growth tips, and real talk from Hasnane Nawaz.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Blog | Hasnane Nawaz',
    description: 'Social media marketing insights, community growth tips, and real talk from Hasnane Nawaz.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    locale: 'en_IN',
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const blogs = await getBlogs()

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteConfig.url}/blog#blog`,
    name: 'Hasnane Nawaz Blog',
    description: 'Social media marketing insights, community growth tips, and real talk.',
    url: `${siteConfig.url}/blog`,
    inLanguage: 'en-IN',
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: 'Hasnane Nawaz',
      url: siteConfig.url,
    },
    blogPost: blogs.map(b => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `${siteConfig.url}/blog/${b.slug}`,
      datePublished: b.created_at,
      description: b.excerpt ?? undefined,
      image: b.cover_image ?? undefined,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="blog-index">
        <div className="wrap">
          <span className="label rv">Writing</span>
          <h1 className="h2 rv rv-d1">
            The <span className="serif">Blog</span>
          </h1>
          <p className="lede rv rv-d2">Social media insights, marketing tips &amp; real talk.</p>

          {blogs.length === 0 && (
            <p className="blog-empty rv">No posts yet — check back soon.</p>
          )}

          <div className="blog-grid">
            {blogs.map((blog, i) => (
              <BlogCardLink
                key={blog.id}
                blog={blog}
                showImage
                titleAs="h2"
                className={`rv${i % 3 ? ` rv-d${i % 3}` : ''}`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
