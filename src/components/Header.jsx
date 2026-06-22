import { useState, useEffect, useRef } from 'react';

export default function Header({ scrollTo }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function mobileGo(id) {
    setOpen(false);
    setTimeout(() => scrollTo(id), 50);
  }

  return (
    <header ref={headerRef}>
      <div className="nav-bar">
        <div className="nav-logo">
          <span className="nav-logo-icon">🪔</span>
          <span className="nav-logo-text">Mithai by Kinjal</span>
        </div>

        <nav className="nav-links">
          <button onClick={() => scrollTo('menu')}>Menu</button>
          <button onClick={() => scrollTo('order')}>Order</button>
          <button onClick={() => scrollTo('reviews')}>Reviews</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-drawer${open ? ' open' : ''}`}>
        <button onClick={() => mobileGo('menu')}>Menu</button>
        <button onClick={() => mobileGo('order')}>Order</button>
        <button onClick={() => mobileGo('reviews')}>Reviews</button>
        <button onClick={() => mobileGo('contact')}>Contact</button>
      </div>
    </header>
  );
}
