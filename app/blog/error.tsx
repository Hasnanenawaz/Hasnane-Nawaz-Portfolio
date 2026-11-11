'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Blog] page error:', error)
  }, [error])

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 16px 60px',
    }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <h1 className="h2" style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '0 auto 14px' }}>
          Blog temporarily unavailable
        </h1>
        <p className="lede" style={{ margin: '0 auto 32px' }}>
          Something went wrong while loading this page. This is usually a temporary issue.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
