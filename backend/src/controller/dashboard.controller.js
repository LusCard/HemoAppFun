import { BloodStockModel } from "../models/bloodStock.model.js";
import { InstitutionModel } from "../models/institution.model.js";

export const getDonationSeasonality = async (req, res)=>{
    try {
        const institution = await InstitutionModel.findOne({ user: req.user._id });
        const institutionId = institution._id;

        const pipeline =[//tendencia de Donaciones por Mes (Últimos 12 meses)
            { $match: { 
                institution: institutionId,
                transactionType: 'input',
                transactionDate: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
            }},
            { $group: {
                _id: { 
                    year: { $year: "$transactionDate" },
                    month: { $month: "$transactionDate" }
                }, 
                totalDonations: { $sum: "$quantity" }
            }},
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $project: {
                _id: 0,
                period: "$_id",
                totalDonations: 1
            }}
        ];

        const seasonalityData = await BloodStockModel.aggregate(pipeline);

        res.status(200).json({ 
            ok: true, 
            msg: "Datos de estacionalidad.", 
            data: seasonalityData 
        });
    } catch (error) {
        console.error("error en agregación de estacionalidad:", error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al calcular estacionalidad." 
        });
    }
}
export const getBloodTypeStats = async (req, res)=>{
    try {
        const institution = await InstitutionModel.findOne({ user: req.user._id });
        const institutionId = institution._id;

        const pipeline = [ //comparación de Input vs Output por Tipo de Sangre
            { $match: { 
                institution: institutionId,
            }},
            { $group: {
                _id: { bloodType: "$bloodType", type: "$transactionType" },
                count: { $sum: "$quantity" }
            }},
            { $group: {
                _id: "$_id.bloodType",
                metrics: {
                    $push: {
                        k: "$_id.type", 
                        v: "$count"
                    }
                }
            }},
            { $project: {
                _id: 0,
                bloodType: "$_id",
                stats: { $arrayToObject: "$metrics" } // Transforma a { bloodType: 'A+', stats: { input: X, output: Y } }
            }}
        ];

        const bloodTypeStats = await BloodStockModel.aggregate(pipeline);
        res.status(200).json({ 
            ok: true, 
            msg: "Estadísticas por grupo sanguíneo.", 
            data: bloodTypeStats });
    } catch (error) {
        console.error("error en agregación de tipos de sangre:", error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al calcular tipos de sangre." 
        });
    }
}