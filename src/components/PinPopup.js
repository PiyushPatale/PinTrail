import React, { useState } from 'react';
import { Popup } from 'react-leaflet';
import './styles/PinPopup.css';

const PinPopup = ({ pin, onSaveRemark }) => {
  const [remark, setRemark] = useState(pin.remark);

  const handleSave = () => {
    onSaveRemark(remark);
    
  };

  return (
    <Popup>
      <div>
        <p><strong>Address :</strong> {pin.address}</p>
        <textarea
          rows="2"
          placeholder="Enter remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <button onClick={handleSave}>Save Remark</button>
      </div>
    </Popup>
  );
};

export default PinPopup;
