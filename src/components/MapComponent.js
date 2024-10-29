// MapComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import PinPopup from './PinPopup';
import './styles/MapComponent.css';

const MapComponent = ({ pins, addPin, updatePinRemark, selectedPinIndex }) => {
  const markerRefs = useRef([]);
  const [notification, setNotification] = useState({
    isActive: false,
    message: ''
  });

  const showNotification = (message) => {
    setNotification({ isActive: true, message });
    setTimeout(() => {
      setNotification({ isActive: false, message: '' });
    }, 2000);
  };

  const handleMapClick = async (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const address = await fetchAddress(lat, lng);
  
    if (address === "Address not found") {
      alert("Could not find an address for this location. Try selecting a nearby land area.");
      return;
    }
  
    addPin({ lat, lng, address, remark: '' });
  };


  const fetchAddress = async (lat, lng) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout in 10 seconds
  
      const response = await Promise.race([
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, { signal: controller.signal }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000))
      ]);
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
  
      const data = await response.json();
  
      return data.display_name || "Address not found";
    } catch (error) {
      if (error.name === 'AbortError' || error.message === "Timeout") {
        alert("Address not found: The request took too long.");
        return "Address not found";
      }
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };
  
  
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  useEffect(() => {
    if (selectedPinIndex !== null && markerRefs.current[selectedPinIndex]) {
      markerRefs.current[selectedPinIndex].openPopup();
    }
  }, [selectedPinIndex]);

  return (
    <MapContainer center={[19.9909439, 73.801918]} zoom={8} style={{ height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin, index) => {
        const isSelected = selectedPinIndex === index;
        const icon = L.icon({
          iconUrl: isSelected
            ? 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png'
            : 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        return (
          <Marker
            key={index}
            position={[pin.lat, pin.lng]}
            icon={icon}
            ref={(el) => (markerRefs.current[index] = el)}
          >
            <PinPopup pin={pin} onSaveRemark={(remark) => updatePinRemark(index, remark)} />
          </Marker>
        );
      })}
      <MapEvents />
      <MapCenterControl selectedPinIndex={selectedPinIndex} pins={pins} />
    </MapContainer>
  );
};

// MapCenterControl to center map on the selected pin with optional offset
const MapCenterControl = ({ selectedPinIndex, pins }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPinIndex !== null && pins[selectedPinIndex]) {
      const selectedPin = pins[selectedPinIndex];

      // Optionally adjust the latitude or longitude slightly to center with an offset
      const offsetLat = selectedPin.lat + 0.0005; // Adjust for popup visibility if needed

      // Use panTo for smooth centering
      map.panTo([offsetLat, selectedPin.lng]);
    }
  }, [selectedPinIndex, pins, map]);

  return null;
};

export default MapComponent;
