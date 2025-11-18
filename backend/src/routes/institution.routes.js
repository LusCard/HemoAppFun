import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { 
    updateInstitutionValidation 
} from "../middlewares/validations/institution.validation.js";
import {
    requireInstitution,
    getMyInstitution,
    updateMyInstitution,
    getPublicInstitutions,
    getInstitutionById,
    getSearchSuggestions
} from "../controller/institution.controller.js";

const institutionRouter = express.Router();
//publico (mapa y busqueda)
institutionRouter.get("/institutions/public", getPublicInstitutions);
institutionRouter.get("/institutions/:id", getInstitutionById);
institutionRouter.get("/institutions/search/suggestions", getSearchSuggestions);
//protegidas (instituciones)
institutionRouter.get("/institutions/my-institution", authenticateToken, requireInstitution, getMyInstitution);
institutionRouter.put("/institutions/my-institution", authenticateToken, requireInstitution, updateInstitutionValidation, updateMyInstitution);
export default institutionRouter;