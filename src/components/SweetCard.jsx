function fmtW(qty) {
  const g = qty * 500;
  return g >= 1000 ? `${g / 1000}kg` : `${g}g`;
}

export default function SweetCard({ sweet, qty, onUpdate }) {
  const isSelected = qty > 0;

  return (
    <div className={`sweet-card${isSelected ? ' selected' : ''}`} id={`card-${sweet.id}`}>
      <div className="sweet-img-wrap">
        <img
          className="sweet-img"
          src={sweet.img}
          alt={sweet.name}
          loading="lazy"
          width="512"
          height="512"
        />
      </div>

      <div className="sweet-body">
        <div>
          <div className="sweet-top">
            <div>
              <div className="sweet-name">{sweet.name}</div>
              <div className="sweet-desc">{sweet.desc}</div>
              <div className="sweet-ingredients">
                <b>Ingredients:</b> {sweet.ingr}
              </div>
            </div>
            <div className="sweet-price">${sweet.price * (qty || 1)}</div>
          </div>
        </div>

        <div className="sweet-footer">
          <span className="sweet-weight">
            {isSelected ? `for ${fmtW(qty)}` : 'per 500g'}
          </span>

          {isSelected ? (
            <div className="qty-ctrl">
              <button
                className="qty-btn"
                onClick={() => onUpdate(sweet.id, qty - 1)}
                aria-label="Decrease"
              >
                −
              </button>
              <span className="qty-label">{fmtW(qty)}</span>
              <button
                className="qty-btn"
                onClick={() => onUpdate(sweet.id, qty + 1)}
                aria-label="Increase"
              >
                +
              </button>
            </div>
          ) : (
            <button className="btn-add" onClick={() => onUpdate(sweet.id, 1)}>
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
