// Sidebar.js
import React from 'react';
import './styles/Sidebar.css';

const Sidebar = ({ pins, removePin, onSelectPin }) => {
  return (
    <div className="sidebar">
      <h3>Saved Pins</h3>
      {pins.length === 0 ? (
        <p className="no-pins">No pins added yet.</p>
      ) : (
        <ul className="pin-list">
          {pins.map((pin, index) => (
            <li key={index} className="pin-item">
              <div className="pin-info" onClick={() => onSelectPin(index)}>
                <strong>Address:</strong> {pin.address || 'Fetching...'}<br />
                <strong>Remark:</strong> {pin.remark || 'No remarks'}
              </div>
              <button
                className="cancel-btn"
                onClick={() => removePin(index)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
