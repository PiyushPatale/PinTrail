# Interactive Map Application

An interactive map application built with React and Leaflet, allowing users to add pins with associated remarks to a map, view them in a sidebar, and navigate easily. The app features geolocation capabilities to fetch addresses for pin locations.

## Features

- **Add Pins**: Click anywhere on the map to add a pin. The application fetches the address of the pin location using a reverse geocoding API.
- **Pin Remarks**: Each pin can have an associated remark that users can edit.
- **Sidebar Navigation**: A sidebar that lists all pins, allowing users to select and highlight a specific pin on the map.
- **Persistent Storage**: Pins are saved in local storage, so they persist across sessions.
- **User-Friendly Popups**: Interactive popups for adding and editing remarks.
- **Error Handling**: Notifications for address fetching failures or when clicking on areas without a valid address.
- **Globe View**: A globe visualization when zoomed out fully, providing a realistic map experience.

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Leaflet**: A JavaScript library for interactive maps.
- **OpenStreetMap**: For map tiles and geolocation services.
- **CSS**: For styling the application components.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
