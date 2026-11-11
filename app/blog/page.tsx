import Link from 'next/link'
import { supabaseAdmin as supabase, type Blog } from '@/lib/supabase'
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

type BlogCard = Pick<Blog, 'id' | 'title' | 'slug' | 'excerpt' | 'cover_image' | 'created_at'>

async function getBlogs(): Promise<BlogCard[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) return []
    return data ?? []
  } catch {
    return []
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).toUpperCase()
}

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
      <main style={{ background: 'var(--canvas)', minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="wrap">

          {/* ── Header ── */}
          <div className="rv" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="eyebrow show" style={{ justifyContent: 'center' }}>Writing</span>
            <h1
              className="title"
              style={{ margin: '0 auto', textAlign: 'center', maxWidth: 'none', fontSize: 'clamp(2.6rem,6vw,4.2rem)' }}
            >
              The <em>Blog</em>
            </h1>
            <p className="lede" style={{ textAlign: 'center', margin: '18px auto 0' }}>
              Social media insights, marketing tips &amp; real talk.
            </p>
          </div>

          {/* ── Empty state ── */}
          {blogs.length === 0 && (
            <div className="rv" style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--ink-soft)', fontSize: '1.1rem' }}>No posts yet — check back soon.</p>
            </div>
          )}

          {/* ── Card grid ── */}
          <div className="blog-grid">
            {blogs.map((blog, i) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className={`rv${i < 3 ? ` rv-d${i + 1}` : ''}`}
                style={{ display: 'block' }}
              >
                <article className="blog-card">
                  {blog.cover_image ? (
                    <div className="blog-card__img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={blog.cover_image} alt={blog.title} />
                    </div>
                  ) : (
                    <div className="blog-card__placeholder" />
                  )}
                  <div className="blog-card__body">
                    <p className="blog-card__date">{formatDate(blog.created_at)}</p>
                    <h2 className="blog-card__title">{blog.title}</h2>
                    {blog.excerpt && (
                      <p className="blog-card__excerpt">{blog.excerpt}</p>
                    )}
                    <span className="blog-card__cta">Read more →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </>
  )
}
