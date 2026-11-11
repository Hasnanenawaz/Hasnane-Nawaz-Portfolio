import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Link href="/#contact" className="foot-big">
          Hire <span className="serif">me</span>
          <span className="arr" aria-hidden="true">→</span>
        </Link>
        <div className="foot-row">
          <p>Hasnane Nawaz · Growth &amp; AI-powered marketing · Durg, Chhattisgarh</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
