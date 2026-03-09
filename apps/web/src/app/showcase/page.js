import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { releases, socialLinks } from "@/lib/data";

const youtubeVideo = "https://www.youtube.com/embed/aqz-KE-bpKQ";

export default function ShowcasePage() {
  return (
    <div className="shell scene-shell">
      <div className="scene-content">
        <Reveal>
          <p className="eyebrow">Showcase</p>
          <h1>Past, Current, and Future Drops</h1>
        </Reveal>

        <div className="grid cols-3" style={{ marginTop: "1.5rem" }}>
          {releases.map((release, index) => (
            <Reveal key={release.title} delay={index * 0.08}>
              <article className="tile">
                <Image src={release.image} alt={release.title} width={500} height={600} />
                <div className="tile-copy">
                  <p className="eyebrow">
                    {release.season} {release.year}
                  </p>
                  <h3>{release.title}</h3>
                  <p>{release.notes}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="section">
          <Reveal>
            <h2>Video Showcase</h2>
            <p>Watch the latest visual release moments and campaign cuts.</p>
          </Reveal>
          <div className="panel" style={{ padding: "0.6rem", marginTop: "0.8rem" }}>
            <iframe
              className="social-embed"
              src={youtubeVideo}
              title="DE'JERI YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div style={{ marginTop: "0.8rem" }}>
              <Link className="btn" href={socialLinks.youtube} target="_blank" rel="noreferrer">
                open youtube channel
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
