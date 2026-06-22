const REVIEWS = [
  {
    id: 1,
    stars: '★★★★★',
    text: '"The kaju katli melts in your mouth — tastes exactly like the one my mum makes back in Ahmedabad. Will order every Diwali!"',
    name: '— Anjali Patel',
  },
  {
    id: 2,
    stars: '★★★★★',
    text: '"Ordered ladoo and gulab jamun for my son\'s birthday. Everyone asked who made them. Truly homemade quality."',
    name: '— Rohan Mehta',
  },
  {
    id: 3,
    stars: '★★★★★',
    text: '"Fresh, not too sweet, and beautifully packed. Kinjal even remembered my husband\'s diabetes-friendly request. 10/10."',
    name: '— Deepika Iyer',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-header">
        <p className="section-eyebrow">Kind words</p>
        <h2 className="section-h2">Loved by our neighbours</h2>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map(r => (
          <div key={r.id} className="review-card">
            <div className="review-stars">{r.stars}</div>
            <p className="review-text">{r.text}</p>
            <p className="review-name">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
