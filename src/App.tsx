import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CropAdvisor from "./pages/CropAdvisor";
import DiseaseDetection from "./pages/DiseaseDetection";
import WeatherDashboard from "./pages/WeatherDashboard";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import ChatAssistant from "./pages/ChatAssistant";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import StubbleSetu from "./pages/StubbleSetu";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crop-advisor" element={<CropAdvisor />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="weather" element={<WeatherDashboard />} />
          <Route path="fertilizer" element={<FertilizerRecommendation />} />
          <Route path="chat" element={<ChatAssistant />} />
          <Route path="schemes" element={<GovernmentSchemes />} />
          <Route path="stubble-setu" element={<StubbleSetu />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
