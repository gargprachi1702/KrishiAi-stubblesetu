# KrishiAI – Smart Farming Platform

KrishiAI is an AI-powered platform helping farmers to increase their income, reduce pollution, and optimize yields with cutting-edge technology.

## Features

- **AI Crop Advisor**: Personalized crop recommendations.
- **Disease Detection**: Identify crop diseases from photos.
- **Weather Dashboard**: Real-time weather alerts and forecasts.
- **Fertilizer Recommendation**: Nutrient optimization.
- **AI Chat Assistant**: 24/7 agricultural support.
- **Stubble Setu Marketplace**: Smart demand-based marketplace for crop residue.
  - **Farmer Flow**: View prices, select industries, submit sell requests.
  - **Industry Flow**: Dashboard to manage incoming requests (Accept/Reject).

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Framer Motion.
- **Backend**: Node.js, Express.
- **AI**: Google Gemini API.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the App

To start both the backend server and the frontend (via Vite middleware):

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## API Routes

- `GET /api/prices`: Fetch current stubble prices.
- `GET /api/industries`: Fetch nearby industries.
- `GET /api/stubble-requests`: Fetch all sell requests.
- `POST /api/stubble-requests`: Submit a new sell request.
- `PATCH /api/stubble-requests/:id`: Update request status (accepted/rejected).
