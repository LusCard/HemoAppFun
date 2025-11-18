import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { requireInstitution } from "../controller/institution.controller.js";
import{
    createCampaign,
    getCampaignsNear
} from "../controller/campaign.controller.js"

const campaignRouter = express.Router();
//consulta para el mapa(donante/comunidad)
campaignRouter.get("/campaigns/near", getCampaignsNear);
//gestiona la campaña(institucion)
campaignRouter.post("/campaigns", authenticateToken, requireInstitution, createCampaign)

export default campaignRouter;