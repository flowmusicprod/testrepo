import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

function cards() {
  return [
    { title: "Catalog Manager", detail: "Update products, stock levels, pricing, and media." },
    { title: "Purchase Tracker", detail: "Track checkout status and fulfillment state." },
    { title: "CTA Builder", detail: "Create homepage and page-level calls-to-action." },
    { title: "Social Hub", detail: "Manage embeds, posting notes, and profile links." },
    { title: "AI Mockup Studio", detail: "Generate and store concept visuals from prompts." },
  ];
}

export default async function AtelierDashboardPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("dejeri_admin")?.value;

  if (adminSession !== "authorized") {
    return (
      <div className="shell scene-shell">
        <div className="scene-content section">
          <p className="eyebrow">Restricted</p>
          <h1>Admin Access Required</h1>
          <Link className="btn primary" href="/atelier/login">
            go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell scene-shell">
      <div className="scene-content section">
        <p className="eyebrow">DE&apos;JERI Admin</p>
        <h1>Atelier Dashboard</h1>
        <p>
          This is the private workspace for managing catalog changes, campaign CTAs, social embeds,
          checkout flow, and AI mockup outputs.
        </p>

        <div className="grid cols-3" style={{ marginTop: "1.2rem" }}>
          {cards().map((card) => (
            <article className="panel" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>

        <form method="post" action="/api/admin/logout" style={{ marginTop: "1rem", maxWidth: "200px" }}>
          <button type="submit" className="btn">
            sign out
          </button>
        </form>
      </div>
    </div>
  );
}
