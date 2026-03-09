import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { socialLinks } from "@/lib/data";

const instagramEmbed = "https://www.instagram.com/dejeri/embed";
const tiktokEmbed = "https://www.tiktok.com/@dejeri";

export default function SocialPage() {
  return (
    <div className="shell scene-shell">
      <div className="scene-content">
        <Reveal>
          <p className="eyebrow">Social</p>
          <h1>Instagram + TikTok Feed Wall</h1>
          <p>
            This tab keeps social content inside the brand experience while still linking users to the
            official profiles.
          </p>
        </Reveal>

        <section className="section">
          <div className="grid cols-3">
            <article className="panel" style={{ gridColumn: "span 2" }}>
              <h3>Instagram</h3>
              <iframe title="DE'JERI Instagram" className="social-embed" src={instagramEmbed} />
              <div style={{ marginTop: "0.8rem" }}>
                <Link className="btn" href={socialLinks.instagram} target="_blank" rel="noreferrer">
                  open instagram
                </Link>
              </div>
            </article>
            <article className="panel" style={{ gridColumn: "span 1" }}>
              <h3>TikTok</h3>
              <iframe title="DE'JERI TikTok" className="social-embed" src={tiktokEmbed} />
              <div style={{ marginTop: "0.8rem" }}>
                <Link className="btn" href={socialLinks.tiktok} target="_blank" rel="noreferrer">
                  open tiktok
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
