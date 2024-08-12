import express from "express";
import 'dotenv/config';
import helmet from "helmet";
import cors from "cors";
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from "./src/config/logger.config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.ORIGIN,
    credetials : true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    exposedHeaders:['set-cookie'],
    optionSuccessStatus:200,
}

const server = express();

server.use(cors(corsOptions));
server.use(helmet());
server.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Usar cookies seguras solo en producción
}));

//Import routes to Use
import authRoutes from "./src/routes/auth.js";
import serviceRoutes from "./src/routes/services.js"
import productRoutes from "./src/routes/products.js"
import avialabilityRoutes from "./src/routes/availability.js"
import reservationRoutes from "./src/routes/reservations.js"
import salesRoutes from "./src/routes/sales.js"
import linksRoutes from "./src/routes/links.js"


server.use(express.json());

// Serve static files
server.use(express.static('public'));
//index.html use for the root
server.get('/', (req, res) => {
    res.sendFile(join(`${__dirname}/src/templates/pages/`, 'index.html'));
});

//Endpoint Routes
server.use("/api/v1/auth/", authRoutes);
server.use("/api/v1/services/", serviceRoutes);
server.use("/api/v1/products/", productRoutes);
server.use("/api/v1/availability/", avialabilityRoutes);
server.use("/api/v1/reservation/", reservationRoutes);
server.use("/api/v1/sales/", salesRoutes);
server.use("/api/v1/links/", linksRoutes);

//Server Port Start
server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    }
)