import {CampaignModel} from "../models/campaign.model.js"
import { userModel } from "../models/user.model.js"
import { InstitutionModel } from "../models/institution.model.js";
export const createCampaign = async (req, res)=>{
    try {
        const institution = await InstitutionModel.findOne({ user: req.user._id });
        const campaignData = {
            ...req.body,
            institutionOwner: institution._id, // Usar el ID de la institución
        };

        const newCampaign = await CampaignModel.create(campaignData);
        res.status(201).json({ 
            ok: true, 
            msg: "Campaña móvil creada y lista para el mapa.",
            data: newCampaign 
        });
    } catch (error) {
        console.error("error al crear campaña:", error);
        res.status(500).json({ ok: false, 
            msg: "Error al crear la campaña." 
        });
    }
}
export const getCampaignsNear = async (req, res)=>{
    try {
        const { lat, lng, maxDistance = 10000 } = req.query; //maxima distancia en metros(10km)
        if (!lat || !lng) {
            // Si no hay ubicación, solo devuelve campañas activas sin ordenar por distancia
            const activeCampaigns = await CampaignModel.find({ endDate: { $gte: new Date() } });
            return res.status(200).json({ ok: true, data: activeCampaigns });
        }

        const campaigns = await CampaignModel.find({
            location: {
                $nearSphere: { // Utiliza GeoJSON para eficiencia
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(maxDistance)
                }
            },
            endDate: { $gte: new Date() } // Solo campañas activas
        }).populate('institutionOwner', 'legalName tradeName');

        res.status(200).json({ 
            ok: true, 
            msg: `Campañas cercanas encontradas (${campaigns.length})`,
            data: campaigns 
        });
    } catch (error) {
       console.error("Error al buscar campañas:", error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al buscar campañas." 

        }); 
    }
}