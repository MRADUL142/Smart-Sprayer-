# Smart Sprayer 3D - React Frontend

A modern, interactive 3D web interface for plant disease detection and pesticide recommendation with React and Three.js.

## Features

✨ **3D Interactive Plant Visualization**
- Real-time 3D plant models with disease visualization
- Drag to rotate, scroll to zoom
- Color-coded disease indicators (green=healthy, red=diseased)

🌧️ **Spray Simulation**
- Animated pesticide spray with particle effects
- Real-time physics simulation
- Visual feedback during application

📱 **Fully Responsive Design**
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly controls
- Optimized for all screen sizes

🎯 **Smart Recommendations**
- Upload plant images for disease detection
- AI-powered disease identification
- Customized pesticide recommendations
- Real-time analysis

## Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D visualization
- **Axios** - API communication
- **React Hot Toast** - Notifications
- **CSS3** - Modern responsive styling

## Installation

### Prerequisites
- Node.js 16+ and npm
- FastAPI backend running on http://localhost:8000

### Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Configure API connection:**
Edit `.env` and set:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

3. **Start development server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Detecting Plant Diseases

1. Click the upload area or drag-and-drop an image
2. The 3D plant model will update with disease visualization
3. View recommended pesticides in the right panel

### Controlling the 3D View

- **Rotate:** Click and drag the plant
- **Zoom:** Scroll mouse wheel
- **Spray:** Click "Start Spraying" to see pesticide application

### Understanding the Visualization

- **Green leaves** = Healthy plant tissue
- **Red leaves** = Disease-affected areas
- **Spray particles** = Pesticide application simulation

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── PlantScene.jsx      # Main 3D scene
│   │   │   ├── PlantModel.js       # 3D plant geometry
│   │   │   └── SpraySimulation.js  # Particle system
│   │   └── ui/
│   │       ├── ImageUpload.jsx     # File upload
│   │       ├── ControlPanel.jsx    # Controls & info
│   │       └── ResultsPanel.jsx    # Recommendations
│   ├── services/
│   │   └── apiService.js           # API calls
│   ├── styles/
│   │   ├── index.css               # Global styles
│   │   ├── App.css                 # Layout
│   │   ├── ImageUpload.css
│   │   ├── ControlPanel.css
│   │   └── ResultsPanel.css
│   ├── App.jsx                     # Main app
│   └── index.js                    # Entry point
├── .env                            # Environment config
├── .gitignore
└── package.json
```

## API Integration

### Detect Disease
```
POST /api/detect-disease
Content-Type: multipart/form-data

Response: {
  "disease_id": 1,
  "confidence": 0.95,
  "disease_name": "Powdery Mildew"
}
```

### Get Pesticides
```
GET /api/pesticides

Response: [{
  "id": 1,
  "name": "Sulfur Powder",
  "type": "Fungicide",
  "description": "...",
  "dosage": "5kg/acre"
}]
```

## Scripts

```bash
# Development
npm start

# Production build
npm run build

# Run production build
npm run serve

# Testing
npm test
```

## Troubleshooting

### CORS Errors
Ensure backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API Not Connecting
- Check `.env` file has correct `REACT_APP_API_URL`
- Verify backend is running on port 8000
- Check browser console for error messages

### Performance Issues on Mobile
- Reduce 3D model complexity in `PlantModel.js`
- Lower particle count in `SpraySimulation.js`
- Use `will-change` CSS for animations

## Future Enhancements

- [ ] Multiple plant species
- [ ] AR mode for mobile
- [ ] Historical data tracking
- [ ] Weather integration
- [ ] Multi-plant field simulation
- [ ] Custom pesticide formulation
- [ ] Export analysis reports

## License

MIT

## Support

For issues or questions, check the main [Smart Sprayer README](../README.md)
