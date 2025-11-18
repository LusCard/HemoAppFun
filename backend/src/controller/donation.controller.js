import { DonationModel } from "../models/donation.model.js";
import {DonationService } from "../services/donation.service.js"
import { InstitutionModel } from "../models/institution.model.js";

//es para registrar al usuario su intencion de donar
export const registerDonationIntention = async(req, res)=>{
    try {
        const {institutionId, type = "blood"} = req.body;

        const newIntention = new DonationModel({
            donor: req.user._id,
            institution: institutionId,
            type: type,
            status: "pending"
        });
        await newIntention.save();
        res.status(201).json({
            ok: true,
            msg: "Intención de donación registrada. Recibirás una notificación con los próximos pasos.",
            data: newIntention
        });
    } catch (error) {
        console.log("Error al registrar intención de donación", error);
        res.status(500).json({
            ok: false,
            msg: "Error al registrar la intención."
        });
    }
};
export const confirmDonation = async(req, res) =>{
    try {
        const {donationId} = req.params;
        const donation = await DonationModel.findById(donationId).populate("donor");
        
        if (!donation) {
            return res.status(404).json({
                ok: false,
                msg: "Donación no encontrada"
            });
        }
        const userInstitution = await InstitutionModel.findOne({ user: req.user._id });
        const institutionId = userInstitution ? userInstitution._id : null;

        if(!institutionId || donation.institution.toString() !== req.user.institutionId.toString()){
            return res.status(403).json({
                ok: false,
                msg: "No tienes permiso para confirma esta donacion."
            });
        }
        if(donation.status === "confirmed"){
            return res.status(400).json({
                ok: false,
                msg: "La donacion ya fue confirmada."
            });
        }
        //para las metricas
        const updatedUser = await DonationService.finalizeDonation(donationId, req.user._id);
        res.status(200).json({
            ok: true,
            msg: "Donación confirmada exitosamente. Las métricas del donante han sido actualizadas.",
            data: { 
                donationId: donation._id,
                peopleHelped: updatedUser.medicalProfile.peopleHelpedEstimate,
                nextDonationDate: updatedUser.medicalProfile.deferralUntil // Retorna la fecha de aplazamiento
            }
        });
    } catch (error) {
        console.log("Error al confirmar la donación", error);
        res.status(500).json({
            ok: false,
            msg: "Error al confirmar la donación"
        });
    }
}