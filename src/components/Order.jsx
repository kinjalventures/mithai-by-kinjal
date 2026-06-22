import { useState, useRef } from 'react';
import { SWEETS } from './Menu';

const WEB3_KEY = '3bfba655-2c50-49f0-93f3-89a6590b2969';

function fmtW(qty) {
  const g = qty * 500;
  return g >= 1000 ? `${g / 1000}kg` : `${g}g`;
}

export default function Order({ selection, specialReq, onOrderSuccess }) {
  const [mode, setMode] = useState('Pickup');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const selectedItems = SWEETS.filter(s => (selection[s.id] || 0) > 0);
  const total = selectedItems.reduce((t, s) => t + s.price * selection[s.id], 0);
  const hasSelection = selectedItems.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const last = localStorage.getItem('mbk_last_submit');
    const now = Date.now();
    if (last && now - +last < 60000) {
      const wait = Math.ceil((60000 - (now - +last)) / 1000);
      setError(`Please wait ${wait}s before submitting again.`);
      return;
    }

    const form = formRef.current;
    const fd = new FormData(form);
    if (fd.get('botcheck')) return;

    const name = String(fd.get('name') || '');
    const sweetList = selectedItems.map(s => {
      const q = selection[s.id];
      const w = q * 0.5 >= 1 ? `${q * 0.5}kg` : `${q * 500}g`;
      return `${s.name} (${w} - $${s.price * q})`;
    }).join(', ');
    const estimate = total;

    fd.append('access_key', WEB3_KEY);
    fd.append('subject', `New Order Request from ${name}`);
    fd.append('from_name', 'Mithai by Kinjal Website');
    fd.append('Selected Sweets', sweetList || '(none)');
    fd.append('Special Request (menu)', specialReq);
    fd.append('Estimated minimum total', `$${estimate}`);

    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Could not send. Please WhatsApp us.');
      localStorage.setItem('mbk_last_submit', String(now));
      onOrderSuccess(`Thank you, ${name || 'friend'}! 🙏`);
      form.reset();
      setMode('Pickup');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  return (
    <section id="order" className="order-section">
      <div className="order-inner">
        <div className="order-header">
          <p className="section-eyebrow">Place your order</p>
          <h2 className="section-h2">Tell me what you need</h2>
          <p className="order-sub">I'll call or WhatsApp you within a few hours to confirm and share payment details.</p>
        </div>

        {/* Selection Summary */}
        {hasSelection && (
          <div className="sel-summary show">
            <div className="sel-title">Your selection</div>
            <ul>
              {selectedItems.map(s => {
                const q = selection[s.id];
                const w = q * 0.5 >= 1 ? `${q * 0.5}kg` : `${q * 500}g`;
                return (
                  <li key={s.id} className="sel-item">
                    <span>
                      {s.name}{' '}
                      <span className="sel-item-meta">({w} – ${s.price}/500g)</span>
                    </span>
                    <span style={{ fontWeight: 600 }}>${s.price * q}</span>
                  </li>
                );
              })}
            </ul>
            <div className="sel-total">
              <span className="sel-total-lbl">Estimated minimum total</span>
              <span className="sel-total-val">${total}</span>
            </div>
          </div>
        )}

        <form className="order-form" ref={formRef} onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />

          <div>
            <label className="field-lbl" htmlFor="f-name">
              Full Name <span className="req">*</span>
            </label>
            <input id="f-name" name="name" required className="input" placeholder="Kinjal Joshi" />
          </div>

          <div className="form-2col">
            <div>
              <label className="field-lbl" htmlFor="f-phone">
                Phone Number <span className="req">*</span>
              </label>
              <input id="f-phone" name="phone" type="tel" required className="input" placeholder="(813) 555-0100" />
            </div>
            <div>
              <label className="field-lbl" htmlFor="f-email">
                Email <span className="req">*</span>
              </label>
              <input id="f-email" name="email" type="email" required className="input" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <span className="field-lbl">
              Delivery or Pickup <span className="req">*</span>
            </span>
            <div className="radio-row">
              <div
                className={`radio-opt${mode === 'Pickup' ? ' active' : ''}`}
                id="r-pickup"
                onClick={() => setMode('Pickup')}
              >
                🚗 Pickup
              </div>
              <div
                className={`radio-opt${mode === 'Delivery' ? ' active' : ''}`}
                id="r-delivery"
                onClick={() => setMode('Delivery')}
              >
                🛵 Delivery
              </div>
            </div>
            <input type="hidden" name="mode" value={mode} />
          </div>

          {mode === 'Delivery' && (
            <div className="del-field show">
              <label className="field-lbl" htmlFor="f-addr">
                Delivery Address <span className="req">*</span>
              </label>
              <textarea
                id="f-addr"
                name="address"
                rows="2"
                className="input"
                required
                placeholder="Street, City, ZIP — within 15 miles of Wesley Chapel"
              />
            </div>
          )}

          <div>
            <label className="field-lbl" htmlFor="f-date">
              Preferred Date to Receive Order <span className="req">*</span>
            </label>
            <input id="f-date" name="date" type="date" required className="input" min={minDate} />
          </div>

          <div>
            <label className="field-lbl" htmlFor="f-src">How did you hear about us?</label>
            <select id="f-src" name="source" className="input">
              <option value="">Select one…</option>
              <option>WhatsApp group</option>
              <option>Instagram</option>
              <option>Friend</option>
              <option>Facebook</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="field-lbl" htmlFor="f-notes">Special instructions</label>
            <textarea
              id="f-notes"
              name="instructions"
              rows="3"
              className="input"
              placeholder="Sugar-free options, less sugar, no nuts, festival packaging, etc."
            />
          </div>

          {error && <div className="err-box">{error}</div>}

          <button type="submit" id="sub-btn" className="btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Sending…' : 'Submit Order Request'}
          </button>

          <p style={{ fontSize: '.75rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
            No payment now. I'll contact you to confirm and collect via Zelle, Venmo or Cash.
          </p>
        </form>
      </div>
    </section>
  );
}
