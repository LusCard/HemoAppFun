import express from "express";
import {authenticateToken} from "../middlewares/auth.middleware.js"
import {requireInstitution} from "../controller/institution.controller.js"
import {
    getDonationSeasonality,
    getBloodTypeStats
} from "../controller/dashboard.controller.js"

const dashboardRouter = express.Router();
// Dashboard de Métricas (Institución)
dashboardRouter.get(
    "/institution/dashboard/metrics/seasonality", authenticateToken, requireInstitution, getDonationSeasonality);

dashboardRouter.get(
    "/institution/dashboard/metrics/blood-type", authenticateToken, requireInstitution, getBloodTypeStats);

export default dashboardRouter;