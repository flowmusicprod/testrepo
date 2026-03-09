import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { collaborations } from "@/lib/data";

export default async function CollaborationPage({ searchParams }) {
  const params = await searchParams;
  const submitted = params?.sent === "1";

  return (
    <div className="shell scene-shell">
      <div className="scene-content">
        <Reveal>
          <p className="eyebrow">Collaboration</p>
          <h1>Build the Next Capsule with DE&apos;JERI</h1>
          <p>Apply as a model, creative partner, or brand collaborator through the intake form below.</p>
        </Reveal>

        <section className="section">
          <Reveal>
            <h2>Recent Collaborations</h2>
          </Reveal>
          <div className="grid cols-3" style={{ marginTop: "1rem" }}>
            {collaborations.map((collab, index) => (
              <Reveal key={collab.name} delay={index * 0.08}>
                <article className="panel">
                  <h3>{collab.name}</h3>
                  <p>{collab.summary}</p>
                  <p className="eyebrow">{collab.release}</p>
                </article>
              </Reveal>
            ))}
            <article className="panel">
              <h3>Linked Collab Catalog</h3>
              <p>Each approved collaboration can be tied to a dedicated catalog release in admin.</p>
              <Link className="btn" href="/catalog">
                open catalog
              </Link>
            </article>
          </div>
        </section>

        <section className="section">
          <Reveal>
            <h2>Collaboration Signup</h2>
          </Reveal>
          <article className="panel" style={{ marginTop: "0.8rem" }}>
            {submitted ? <p className="eyebrow">application sent. The team will review and reach out.</p> : null}
            <form method="post" action="/api/collaboration">
              <input name="fullName" placeholder="Full name" required />
              <input type="email" name="email" placeholder="Email address" required />
              <select name="interestType" defaultValue="model">
                <option value="model">Modeling</option>
                <option value="brand">Brand Collaboration</option>
                <option value="creative">Creative Partnership</option>
              </select>
              <input name="portfolioLink" placeholder="Portfolio or social link" />
              <textarea name="notes" placeholder="Tell us about your concept and availability." required />
              <button className="btn primary" type="submit">
                submit application
              </button>
            </form>
          </article>
        </section>
      </div>
    </div>
  );
}
