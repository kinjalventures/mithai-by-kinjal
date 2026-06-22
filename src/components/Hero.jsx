export default function Hero({ scrollTo, showThankYou, thankYouName }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          {showThankYou && (
            <div className="ty-banner show">
              <h2>{thankYouName}</h2>
              <p>
                Your order request is received. I'll call/WhatsApp you within a few hours to confirm
                and share payment details (Zelle / Venmo / Cash).
              </p>
            </div>
          )}

          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Now taking orders in Wesley Chapel
          </span>

          <h1 className="hero-h1">
            Authentic Homemade <span>Indian Mithai</span> —
            Made Fresh in Wesley Chapel, FL
          </h1>

          <p className="hero-p">
            Recipes from my grandmother's kitchen, made fresh on your order date with pure ghee,
            real khoya, and zero shortcuts.
          </p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('order')}>Order Now →</button>
            <button className="btn-outline" onClick={() => scrollTo('menu')}>See the menu</button>
          </div>

          <div className="hero-trust">
            <span>🏠 100% homemade</span>
            <span>🧈 Pure ghee</span>
            <span>🍃 Sugar-free options</span>
            <span>💰 Min order $20</span>
          </div>
        </div>

        <div className="hero-img-col">
          <div className="hero-img-glow" />
          <img
            className="hero-img"
            src="assets/hero-mithai.jpg"
            alt="Assorted homemade Indian mithai on a brass thali"
            width="1600"
            height="1024"
          />
        </div>
      </div>
    </section>
  );
}
