import Link from "next/link";
import { BlogCardLink } from "@/components/portfolio/blog-card";
import { getBlogs } from "@/lib/blogs";

export async function BlogPreview() {
  const latest = (await getBlogs()).slice(0, 3);

  return (
    <section className="section" id="blog" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <span className="label rv">Blog</span>
            <h2 className="h2 rv rv-d1">
              Notes from the <span className="serif">field</span>.
            </h2>
          </div>
          <Link href="/blog" className="btn btn-white rv rv-d2">
            View all posts <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>
        {latest.length > 0 && (
          <div className="blog-grid" style={{ marginTop: 48 }}>
            {latest.map((blog, i) => (
              <BlogCardLink key={blog.id} blog={blog} className={`rv${i > 0 ? ` rv-d${i}` : ""}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
