// App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import Spinner from './components/Spinner';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import PinPopup from './components/PinPopup';
import './App.css'; 

function App() {
  const [pins, setPins] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newPinData, setNewPinData] = useState(null);
  const [remark, setRemark] = useState('');
  const [selectedPinIndex, setSelectedPinIndex] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedPins = JSON.parse(localStorage.getItem('pins')) || [];
    setPins(storedPins);
  }, []);

  useEffect(() => {
    localStorage.setItem('pins', JSON.stringify(pins));
  }, [pins]);

  const handleAddPinClick = (pinData) => {
    setNewPinData(pinData);
    setIsPopupOpen(true);
  };

  const handleSubmitPin = () => {
    const remarkText = remark.trim() === '' ? 'No remark' : remark;
    const newPins = [...pins, { ...newPinData, remark: remarkText }];
    setPins(newPins);
    setIsPopupOpen(false);
    setRemark(''); 
  };

  const updatePinRemark = (index, updatedRemark) => {
    const updatedPins = [...pins];
    updatedPins[index].remark = updatedRemark;
    setPins(updatedPins);
  };

  const removePin = (index) => {
    const updatedPins = pins.filter((_, i) => i !== index);
    setPins(updatedPins);
  };

  
  const handleSelectPin = (index) => {
    setSelectedPinIndex(index);
  };

  const fetchAddress = async (lat, lng) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      setLoading(false); // Stop loading
      return data.display_name;
    } catch (error) {
      setLoading(false); 
      alert('Address not found'); 
      return null;
    }
  };

  return (
    <div className="app-container">
      {loading && <Spinner />}
      <Sidebar pins={pins} removePin={removePin} onSelectPin={handleSelectPin} />
      <MapComponent
        pins={pins}
        addPin={handleAddPinClick}
        updatePinRemark={updatePinRemark}
        selectedPinIndex={selectedPinIndex} 
        fetchAddress={fetchAddress}
      />

    {isPopupOpen && (
      <div className="popup">
        <div className="popup-content">
          <h2>Add Pin Remark</h2>
          {newPinData && <p><strong>Address:</strong> {newPinData.address}</p>} 
          <textarea
            placeholder="Enter a remark..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
          <button onClick={handleSubmitPin}>Save Remark</button>
          <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
        </div>
      </div>
    )}

    </div>
  );
}

export default App;
