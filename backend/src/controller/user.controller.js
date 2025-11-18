import { userModel } from "../models/user.model.js";

export const updateProfile = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {userName, profile} = req.body;
        if(userName){
            const existingUser = await userModel.findOne({
                userName,
                _id:{$ne: userId}
            });
            if(existingUser){
                return res.status(400).json({
                    ok: false,
                    msg: "El nombre del usuario ya existe"
                });
            }
        }
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    ...(userName && {userName}),
                    ...(profile && {
                        "profile.firstName": profile.firstName,
                        "profile.lastName": profile.lastName,
                        "profile.birthDate": profile.birthDate,
                        "profile.gender": profile.gender,
                        "profile.bloodType": profile.bloodType,
                        "profile.factor": profile.factor
                    })
                }
            },
            {new: true}
        ).select("-password -refreshToken");
        res.status(200).json({
            ok: true,
            msg: "Perfil actualizado correctamente",
            data: updateUser
        });
    } catch (error) {
        console.log("Error al actualizar el perfil", error)
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el perfil"
        });
    }
};
export const updateDonationStatus = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {donationStatus} = req.body;
        if(!["active", "inactive"].includes(donationStatus)){
            return res.status(400).json({
                ok: false,
                msg: "Estado de donacion invalido"
            });
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {donationStatus},
            {new: true}
        ).select("-password -refreshToken");
        res.status(200).json({
            ok: true,
            msg: "Estado de donacion actualizado",
            data: updatedUser
        });
    } catch (error) {
        console.log("error en actualizar estado", error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el estado"
        });
    }
};
//delete
export const desactiveAccount = async(req, res)=>{
    try {
        const userId = req.user._id;
        const desactivateUser = await userModel.findByIdAndUpdate(
            userId,
            {
                accountStatus: "suspended",
                donationStatus: "inactive",
                refreshToken: null //es pq cierra sesion
            },
            {new: true}
        ).select("-password -refreshToken");
        res.status(200).json({
            ok: true,
            msg: "Cuenta desactivada"
        });
    } catch (error) {
        console.log("error en el soft delete", error)
        res.status(500).json({
            ok: false,
            msg: "Error al desactivar la cuenta"
        });
    }
};
export const getImpactDashboard = async (req, res) =>{
    try {
        const user = req.user;
        const donorStats = await userModel.findById(user._id)
            .select('medicalProfile.totalDonations medicalProfile.peopleHelpedEstimate medicalProfile.lastDonationDate profile.bloodType')
            .lean(); // .lean() para un objeto JS simple y rápido

        if (!donorStats) {
            return res.status(404).json({ 
                ok: false, 
                msg: "Usuario no encontrado." 
            });
        }
        const stats = donorStats.medicalProfile;
        //logica de respuesta
        const totalPeopleHelped = stats.peopleHelpedEstimate;
        const totalDonations = stats.totalDonations;

        res.status(200).json({
            ok: true,
            msg: "Métricas de impacto obtenidas.",
            data: {
                totalPeopleHelped,
                totalDonations,
                lastDonation: stats.lastDonationDate,
                bloodType: donorStats.profile.bloodType,
                // Puedes añadir aquí el cálculo de cuánto falta para la próxima donación
            }
        });
    } catch (error) {
        console.error("error al obtener dashboard de impacto:", error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error interno al cargar métricas." 
        });
    }
}