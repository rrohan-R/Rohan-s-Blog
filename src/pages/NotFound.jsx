import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page" style={{ textAlign: "center", padding: "120px 24px" }}>
      <div className="eyebrow" style={{ justifyContent: "center" }}>404.notfound</div>
      <h1 className="page__title">Page not found</h1>
      <p className="page__lede" style={{ margin: "0 auto 32px" }}>
        That route doesn't exist — but here are a few that do.
      </p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
