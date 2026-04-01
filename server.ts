import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

// Mock Database
let stubbleRequests: any[] = [];
const industries = [
  { id: "1", name: "BioFuel India", type: "Biofuel", location: "Ludhiana", contact: "+91 98765 43210" },
  { id: "2", name: "Green Paper Mills", type: "Paper", location: "Amritsar", contact: "+91 98765 43211" },
  { id: "3", name: "EcoEnergy Solutions", type: "Biofuel", location: "Karnal", contact: "+91 98765 43212" },
  { id: "4", name: "Punjab Biomass", type: "Biofuel", location: "Patiala", contact: "+91 98765 43213" },
];

const prices = {
  "Paddy": 2000, // per ton
  "Wheat": 3500, // per ton
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/prices", (req, res) => {
    res.json(prices);
  });

  app.get("/api/industries", (req, res) => {
    res.json(industries);
  });

  app.get("/api/stubble-requests", (req, res) => {
    res.json(stubbleRequests);
  });

  app.post("/api/stubble-requests", (req, res) => {
    const { farmerName, phone, location, cropType, quantity, selectedIndustryId, priceEstimate } = req.body;
    
    const newRequest = {
      id: Date.now().toString(),
      farmerName,
      phone,
      location,
      cropType,
      quantity,
      selectedIndustryId,
      priceEstimate,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    stubbleRequests.push(newRequest);
    res.status(201).json(newRequest);
  });

  app.patch("/api/stubble-requests/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const requestIndex = stubbleRequests.findIndex(r => r.id === id);
    if (requestIndex !== -1) {
      stubbleRequests[requestIndex].status = status;
      res.json(stubbleRequests[requestIndex]);
    } else {
      res.status(404).json({ error: "Request not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
