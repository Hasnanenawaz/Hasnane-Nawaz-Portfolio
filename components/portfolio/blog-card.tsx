import Link from "next/link";
import type { BlogCard } from "@/lib/blogs";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function BlogCardLink({
  blog,
  className,
  showImage = false,
  titleAs: Title = "h3",
}: {
  blog: BlogCard;
  className?: string;
  showImage?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <Link href={`/blog/${blog.slug}`} className={className}>
      <article className="blog-card">
        {showImage && blog.cover_image && (
          <div className="blog-card__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.cover_image} alt={blog.title} />
          </div>
        )}
        <div className="blog-card__body">
          <p className="blog-card__date">{formatDate(blog.created_at)}</p>
          <Title className="blog-card__title">{blog.title}</Title>
          {blog.excerpt && <p className="blog-card__excerpt">{blog.excerpt}</p>}
          <span className="blog-card__cta">
            Read post <span className="arr" aria-hidden="true">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
