export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <h2 className="contact-h2">Let's talk sweets</h2>
        <p className="contact-p">
          All orders are made fresh. Minimum order $20. Delivery within 15 miles of Wesley Chapel, FL.
        </p>
        <div className="contact-btns">
          <a
            href="https://wa.me/15104023608"
            target="_blank"
            rel="noreferrer"
            className="btn-wa"
          >
            💬 WhatsApp us
          </a>
          <a
            href="https://instagram.com/yourhandle"
            target="_blank"
            rel="noreferrer"
            className="btn-ig"
          >
            📸 Instagram
          </a>
        </div>
        <p className="contact-foot">
          © {year} Mithai by Kinjal · Wesley Chapel, Florida · Made with 🧡
        </p>
      </div>
    </section>
  );
}
