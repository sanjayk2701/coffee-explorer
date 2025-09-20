import React, { useMemo } from "react";
import "./CoffeeCard.scss";

const CoffeeCard = ({ coffee, onEdit, onDelete }) => {
  // Pick a random background color ONCE per card render
  const backgroundColors = ["#0f5132", "#9c6f44", "#a94c4c"];
  const randomBg = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    [] // ensures consistent color after first render
  );

  

  return (
    <div className="coffee-card" style={{ backgroundColor: randomBg }}>
      {coffee.image ? (
        <img src={coffee.image} alt={coffee.title || "Coffee"} />
      ) : (
    <div className="no-image">Image coming soon ☕</div>
      )}
      <div className="coffee-content">
        <h3>{coffee.title || "Coffee Delight"}</h3>
        <p className="description">
          {coffee.description
            ? coffee.description.length > 60
              ? coffee.description.slice(0, 60) + "..."
              : coffee.description
            : "No description."}
        </p>
        <div className="card-actions">
          <button className="editButton" onClick={() => onEdit(coffee)}>Edit</button>
          <button className="deleteButton" onClick={() => onDelete(coffee)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
