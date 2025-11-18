import express from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.route.js';
import institutionRouter from './institution.routes.js'
import moderadorRoutes from './moderation.routes.js'
import donationRouter from './donation.routes.js'
import campaignRouter from './campaign.routes.js'; // conexión de Campañas
import dashboardRouter from './dashboard.routes.js'; //conexion de Metricas

export const routes = express.Router();
//rutas principales
routes.use(authRouter);
routes.use(userRouter);
routes.use(institutionRouter);
routes.use(donationRouter);

//rutas moduladas y con acceso restringifo
routes.use(moderadorRoutes);
routes.use(campaignRouter);
routes.use(dashboardRouter);