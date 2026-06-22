import SweetCard from './SweetCard';

export const SWEETS = [
  { id: 'mohan-thal',  name: 'Mohan Thal',              desc: 'Traditional Gujarati golden-brown gram flour fudge garnished with almonds and pistachios.', price: 16, img: 'assets/sweets/mohan-thal.png',  ingr: 'Gram flour (besan), pure ghee, sugar, milk, cardamom, nutmeg, almonds, pistachios' },
  { id: 'kaju-katli',  name: 'Kaju Katli',               desc: 'Silky cashew diamonds with edible silver leaf.',                                            price: 18, img: 'assets/sweets/kaju-katli.png',  ingr: 'Premium cashews, sugar, water, pure ghee, edible silver leaf (vark)' },
  { id: 'gulab-jamun', name: 'Gulab Jamun',              desc: 'Warm milk dumplings soaked in cardamom-rose syrup.',                                         price: 14, img: 'assets/sweets/gulab-jamun.jpg', ingr: 'Khoya (milk solids), paneer, all-purpose flour, sugar, cardamom, rose water, ghee' },
  { id: 'ladoo',       name: 'Ladoo (Besan / Motichoor)', desc: 'Golden gram flour or pearl ladoo with ghee & nuts.',                                         price: 14, img: 'assets/sweets/ladoo.jpg',        ingr: 'Gram flour, pure ghee, sugar, cardamom, melon seeds, almonds, pistachios' },
  { id: 'barfi',       name: 'Barfi (Milk / Coconut)',   desc: 'Slow-cooked khoya or coconut barfi, melt-in-mouth.',                                          price: 16, img: 'assets/sweets/barfi.jpg',        ingr: 'Khoya / shredded coconut, sugar, pure ghee, cardamom, pistachios' },
  { id: 'jalebi',      name: 'Jalebi',                   desc: 'Crisp saffron spirals dipped in warm sugar syrup.',                                           price: 12, img: 'assets/sweets/jalebi.jpg',       ingr: 'All-purpose flour, cornflour, yogurt, sugar, saffron, cardamom, lemon juice, pure ghee' },
  { id: 'halwa',       name: 'Halwa (Gajar / Suji)',     desc: 'Carrot or semolina halwa, rich with ghee and dry fruits.',                                    price: 13, img: 'assets/sweets/halwa.jpg',        ingr: 'Fresh carrots/semolina, whole milk, sugar, pure ghee, cardamom, cashews, raisins, almonds' },
];

export default function Menu({ selection, onUpdate, specialReq, onSpecialReqChange }) {
  return (
    <section id="menu" className="menu-section">
      <div className="menu-header">
        <p className="section-eyebrow">The Menu</p>
        <h2 className="section-h2">Pick your favourites</h2>
        <p className="menu-sub">Prices per 500g • Tick what you'd like, then fill the form below.</p>
        <div className="sf-badge">🍃 Sugar-free options available on request</div>
      </div>

      <div className="sweets-grid">
        {SWEETS.map(sweet => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            qty={selection[sweet.id] || 0}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      <div className="special-box">
        <label>
          <span className="special-title">Special request</span>
          <span className="special-sub">
            Something not on the menu? Tell me — kheer, peda, mysore pak, festival platters…
          </span>
          <textarea
            id="special-req"
            className="input"
            rows="3"
            placeholder="e.g. 1kg sugar-free Mohan Thal, or less sugar option..."
            value={specialReq}
            onChange={e => onSpecialReqChange(e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
