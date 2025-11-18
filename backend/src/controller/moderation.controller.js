import { userModel } from "../models/user.model.js";
import { InstitutionModel } from "../models/institution.model.js";

export const requireModerator = async(req, res, next) => {
    try {
        if(req.user.role !== "moderador"){
            return res.statur(403).json({
                ok: false,
                msg: "Se requiere privilegios de administrador"
            });
        }
        next()
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error de autorizacion"
        });
    }
};

export const getPendingInstitutions = async(req, res)=>{
    try {
        const pendingInstitutions = await InstitutionModel.find({
            validationStatus: "pending"
        }).populate("user", "userName email createdAt")
        .select("legalName cuit institutionType contact location validationStatus createdAt");
        res.status(200).json({
            ok: true,
            msg: pendingInstitutions
        });
    } catch (error) {
        console.log("error al traer las instituciones pendientes", error)
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};
export const validateInstitucion = async(req, res)=>{
    try {
        const {id} = req.params;
        const {action, comments} = req.body;
        if(!["aproved", "rejected"].includes(action)){
            return res.status(400).json({
                ok: false,
                msg: "Accion invalida"
            })
        }
        const institution = await InstitutionModel.findById(id).populate("user");
        if(!institution){
            return res.status(404).json({
                pk: false,
                msg: "Institucion no encontrada"
            });
        }
        //actualizo la institucion y el usuario
        institution.validationStatus = action;
        institution.validatedBy = req.user._id;
        institution.validatedAt = new Date();

        if(action === "aproved"){
            institution.user.accountStatus = "verified";
        } else {
            institution.rejectionReason = comments;
            institution.user.accountStatus = "suspended";
        }
        await Promise.all([
            institution.save(),
            institution.user.save()
        ]);
        res.status(200).json({
            ok: true,
            msg: `Institucion ${action === "aproved"? "aprobada" : "rechazada"} exitosamente`,
            data: {
                institution:{
                    id: institution._id,
                    legalName: institution.legalName,
                    validationStatus: institution.validationStatus
                }
            } 
        });
    } catch (error) {
        console.log("error en validacion", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno de validacion"
        });
    }
};
export const getAllInstitutions = async(req, res)=>{
    try {
        const{role, accountStatus, page = 1, limit = 20} = req.query;
        let query = {};
        if(role) query.role = role;
        if(accountStatus) query.accountStatus = accountStatus

        const users = await userModel.find(query) //filtra por rol
        .select("userName email role accountStatus donationStatus createdAt lastLogin")//elige q campos traer
        .limit(limit * 1) //cuantos resultados mostrar
        .skip((page - 1) * limit) //desde q resultado empezar
        .sort({createdAt: -1}); //ordena por fecha, lo primero q muestra son los usuarios mas nuevos

        const total = await userModel.countDocuments(query); //filtra la cantidad de usuarios, countDocument cuenta cuantas paginas hay 
        res.status(200).json({
            ok: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Match.ceil(total/limit)
            }
        });
    } catch (error) {
        console.log("error al obtener usuarios", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}