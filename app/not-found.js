import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center" }}>
        <h1>Page not found</h1>
        <p className="lead" style={{ margin: "0 auto 28px" }}>The page you're looking for has moved or doesn't exist.</p>
        <Link href="/" className="btn">Go to homepage</Link>
      </div>
    </section>
  );
}
