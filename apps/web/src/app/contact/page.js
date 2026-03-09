import { Reveal } from "@/components/reveal";
import { brandContact } from "@/lib/data";

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const sent = params?.sent === "1";

  return (
    <div className="shell section">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1>Connect with DE&apos;JERI</h1>
      </Reveal>

      <div className="grid cols-3" style={{ marginTop: "1.4rem" }}>
        <article className="panel">
          <h3>Email</h3>
          <p>{brandContact.email}</p>
        </article>
        <article className="panel">
          <h3>Phone</h3>
          <p>{brandContact.phone}</p>
        </article>
        <article className="panel">
          <h3>Address</h3>
          <p>{brandContact.address}</p>
        </article>
      </div>

      <section className="section">
        <Reveal>
          <h2>Send a Message</h2>
        </Reveal>
        <article className="panel" style={{ marginTop: "0.8rem" }}>
          {sent ? <p className="eyebrow">Message sent successfully.</p> : null}
          <form method="post" action="/api/contact">
            <input name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Email address" required />
            <input name="subject" placeholder="Subject" required />
            <textarea name="message" placeholder="Tell us what you need." required />
            <button className="btn primary" type="submit">
              Send Message
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
