import { InstitutionModel } from "../models/institution.model.js";
import { userModel } from "../models/user.model.js";

export const requireInstitution = async (req, res, next)=>{
    try {
        if(req.user.role !== "institution"){
            return res.status(403).json({
                ok: false,
                msg: "Acceso denegado. Se requiere ser una institucion para este recurso"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor. Usuario no autorizado"
        })
    }
}
export const getMyInstitution = async(req, res)=>{
    try {
        const institution = await InstitutionModel.findOne({
            user: req.user._id
        }).populate("user", "email userName");

        if (!institution) {
            return res.status(404).json({
                ok: false,
                msg: "Institución no encontrada"
            });
        };
        res.status(200).json({
            ok: true,
            data: institution
        });
    } catch (error) {
        console.log("Error al buscar institucion", error)
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor"
        });
    }
};
export const updateMyInstitution = async(req, res)=>{
    try {
        const { legalName, tradeName, address, location, services, schedule, description } = req.body;

        const institution = await InstitutionModel.findOneAndUpdate(
            { user: req.user.id },
            { legalName, tradeName, address, location, services, schedule, description },
            { new: true }
        ).populate("user", "email userName");
        if (!institution) {
            return res.status(404).json({
                ok: false,
                msg: "Institución no encontrada"
            });
        }
        res.status(200).json({
            ok: true,
            data: institution
        });
    } catch (error) {
        console.log("Error al actualizar institucion", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor"
        });
    }
};
export const getPublicInstitutions = async(req, res)=>{
    try {
        const{lat, lng, maxDistance= 5000, type, service, city, page = 1, limit = 20} = req.query;
        let query = { 
            validationStatus: 'approved',
            isActive: true 
        };
        if (type && type !== 'all') {
            query.institutionType = type;
        }
        if (service) {
            const servicePath = `services.${service}`;
            query[servicePath] = true;
        }
        if (city) {
            query['address.city'] = new RegExp(city, 'i');
        }
        let sortOption = {};
        if (lat && lng) {
            query.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(maxDistance)
                }
            };
        } else {
            sortOption = { 'stats.totalDonations': -1 };
        }
         const institutions = await InstitutionModel.find(query)
            .populate('user', 'userName email')
            .select('-validationStatus -validatedBy -rejectionReason')
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await InstitutionModel.countDocuments(query);
        res.status(200).json({
            ok: true,
            data: institutions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            filters: {
                hasLocation: !!(lat && lng),
                type: type || 'all',
                service: service || 'none',
                city: city || 'all'
            }
        }); 
    } catch (error) {
        console.log("Error al obtener instituciones públicas:", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno al cargar instituciones"
        });
    }
}
export const getInstitutionById = async(req, res)=>{
    try {
        const {id} = req.paramas;
        const institution = await InstitutionModel.findOne({
            _id: id,
            validationStatus: 'approved',
            isActive: true
        }).populate('user', 'userName email');
        if (!institution) {
            return res.status(404).json({
                ok: false,
                msg: "Institución no encontrada o no disponible"
            });
        }
        res.status(200).json({
            ok: true,
            data: institution
        });
    } catch (error) {
        console.log("Error al obtener institución:", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno al cargar institución"
        });
    }
};
//es para completar busquedas en el front
export const getSearchSuggestions = async(req, res)=>{
    try {
        const {q} = req.query;
        if (!q || q.length < 2) {
            return res.status(200).json({
                ok: true,
                data: []
            });
        }
        const suggestions = await InstitutionModel.find({
            validationStatus: 'approved',
            isActive: true,
            $or: [
                { legalName: new RegExp(q, 'i') },
                { tradeName: new RegExp(q, 'i') },
                { 'address.city': new RegExp(q, 'i') }
            ]
        })
        .select('legalName tradeName address.city institutionType')
        .limit(10);
        res.status(200).json({
            ok: true,
            data: suggestions
        });
    } catch (error) {
        console.log("Error en búsqueda de sugerencias:", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno en búsqueda"
        });
    }
}