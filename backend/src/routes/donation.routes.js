import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireInstitution } from '../controller/institution.controller.js';
import { 
    registerDonationIntention, 
    confirmDonation 
} from '../controller/donation.controller.js';

const donationRouter = express.Router();
//donante: registra intencion de donar
donationRouter.post("/donations/register", authenticateToken, registerDonationIntention);
//institucion: confirma la donacion(activa la logica de metricas y stock)
donationRouter.patch("/donations/:donationId/confirm", authenticateToken, requireInstitution, confirmDonation);

export default donationRouter;