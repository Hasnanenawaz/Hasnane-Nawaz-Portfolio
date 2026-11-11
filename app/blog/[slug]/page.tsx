import { supabaseAdmin as supabase, type Blog } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 60

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const { data } = await supabase
      .from('blogs')
      .select('title, excerpt, meta_title, meta_description, cover_image, created_at, updated_at')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (!data) return { title: 'Not Found' }

    return {
      title: data.meta_title ?? data.title,
      description: data.meta_description ?? data.excerpt,
      openGraph: {
        title: data.meta_title ?? data.title,
        description: data.meta_description ?? data.excerpt ?? undefined,
        images: data.cover_image ? [data.cover_image] : [],
        type: 'article',
        locale: 'en_IN',
        publishedTime: data.created_at ?? undefined,
        modifiedTime: data.updated_at ?? undefined,
        authors: [siteConfig.url],
      },
      twitter: {
        card: 'summary_large_image',
        title: data.meta_title ?? data.title,
        description: data.meta_description ?? data.excerpt ?? undefined,
        images: data.cover_image ? [data.cover_image] : [],
      },
      alternates: {
        canonical: `${siteConfig.url}/blog/${slug}`,
      },
    }
  } catch {
    return { title: 'Blog' }
  }
}

export async function generateStaticParams() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug')
    .eq('published', true)
  return (blogs ?? []).filter(b => b.slug.length <= 200).map(b => ({ slug: b.slug }))
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return error ? null : data
  } catch {
    return null
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function isBuilderHTML(content: string) {
  return content.includes('hn-article')
}

function renderContent(content: string) {
  if (isBuilderHTML(content)) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
  if (paragraphs.length <= 1) {
    return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    )
  }
  return (
    <div>
      {paragraphs.map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j, arr) =>
            j < arr.length - 1 ? [line, <br key={j} />] : line
          )}
        </p>
      ))}
    </div>
  )
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  const wordCount = blog.content ? blog.content.split(/\s+/).filter(Boolean).length : undefined
  const articleBody = blog.content
    ? blog.content.slice(0, 500) + (blog.content.length > 500 ? '…' : '')
    : undefined

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/blog/${blog.slug}#article`,
    headline: blog.title,
    description: blog.excerpt ?? undefined,
    articleBody,
    image: blog.cover_image ?? undefined,
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    inLanguage: 'en-IN',
    wordCount,
    url: `${siteConfig.url}/blog/${blog.slug}`,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: 'Hasnane Nawaz',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: 'Hasnane Nawaz',
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${blog.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: `${siteConfig.url}/blog/${blog.slug}` },
    ],
  }

  const builderPost = !!(blog.content && isBuilderHTML(blog.content))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="post">
        <div className="wrap post-wrap">

          {/* Back link */}
          <Link href="/blog" className="blog-back">
            ← All posts
          </Link>

          {builderPost ? (
            /* Builder HTML — already contains its own header, title, byline, content */
            <div className="post-body">
              {blog.content ? renderContent(blog.content) : null}
            </div>
          ) : (
            /* Plain text post */
            <article>
              <p className="post-date">{formatDate(blog.created_at)}</p>

              <h1 className="post-title">{blog.title}</h1>

              {blog.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="post-cover" src={blog.cover_image} alt={blog.title} />
              )}

              {blog.excerpt && <p className="post-excerpt">{blog.excerpt}</p>}

              <div className="post-body">
                {blog.content ? renderContent(blog.content) : null}
              </div>
            </article>
          )}

          {/* Footer nav */}
          <div className="post-foot">
            <Link href="/blog" className="btn btn-ghost">
              ← All Posts
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
