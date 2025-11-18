import {userModel} from "../models/user.model.js"
import { DonationModel } from "../models/donation.model.js";
import {BloodStockModel} from "../models/bloodStock.model.js"

const ESTIMATE_HELPER = {
    blood: 3,    // Sangre entera ayuda a 3 personas
    plasma: 1,   // Plasma ayuda a 1 persona  
    platelets: 1,// Plaquetas ayudan a 1 persona
    unknown: 1
};

const DEFERRAL_PERIODS = {
    blood: 90,      // 90 días para donar sangre nuevamente
    plasma: 30,     // 30 días para plasma
    platelets: 15,  // 15 días para plaquetas
    unknown: 90
};

export class DonationService { //confirmacion de donacion y actualizacion de las metricas
    static async finalizeDonation(donationId, confirmerId) {
        try {
            //usuario por tipo de sangee
            const donation = await DonationModel.findById(donationId).populate('donor')
            if (!donation || donation.status === 'confirmed') {
                throw new Error("Registro de donación inválido o ya confirmado.");
            }

            //metricas
            const donorId = donation.donor._id;
            const donationType = donation.type;
            const institutionId = donation.institution;
            const bloodType = donation.donor.profile.bloodType;

            const peopleHelped = ESTIMATE_HELPER[donationType] || ESTIMATE_HELPER.unknown;
            const deferralDays = DEFERRAL_PERIODS[donationType] || DEFERRAL_PERIODS.unknown;
            // Calcula la fecha en la que el donante puede volver a donar
            const deferralUntil = new Date(Date.now() + deferralDays * 24 * 60 * 60 * 1000);
            //actualizacion del usuario
            const updatedUser = await userModel.findByIdAndUpdate(donorId, {
                $inc: { // Incrementa los contadores
                    "medicalProfile.totalDonations": 1,
                    "medicalProfile.peopleHelpedEstimate": peopleHelped
                },
                $set: { // Actualiza la fecha y el aplazamiento temporal
                    "medicalProfile.lastDonationDate": new Date(),
                    "medicalProfile.temporaryDeferral": true,
                    "medicalProfile.deferralUntil": deferralUntil,
                    "medicalProfile.deferralReason": `Donación de ${donationType}. Próxima donación posible: ${deferralUntil.toLocaleDateString()}`
                }
            }, { new: true });

            await this.recordBloodStock(updatedUser, donationType, institutionId); //registro de trazabilidad
            await DonationModel.findByIdAndUpdate(donationId, {
                status: "confirmed",
                confirmedBy: confirmerId, // Quién (Moderador/Institución) lo validó
                donationDate: new Date(), // Fecha real de la donación
            }); //registro de donacion

            console.log(`Donación confirmada para ${updatedUser.userName}. Tipo: ${type}, Personas ayudadas: ${peopleHelped}`);

            return {
                user: updatedUser,
                donationDetails: {
                    type: type,
                    peopleHelped: peopleHelped,
                    nextDonationDate: deferralUntil,
                    bloodType: updatedUser.profile.bloodType
                }
            };

        } catch (error) {
            console.error("error en confirmDonation:", error);
            throw new Error(`Error al confirmar donación: ${error.message}`);
        }
    }

    static async canUserDonate(userId) { //verificacion de si un usuario puede donar
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return { canDonate: false, reason: "Usuario no encontrado" };
            }

            //verifica estado de cuenta
            if (user.accountStatus !== 'verified') {
                return { canDonate: false, reason: "Cuenta no verificada" };
            }

            //veri.. estado de donacion
            if (user.donationStatus !== 'active') {
                return { canDonate: false, reason: "Estado de donación inactivo" };
            }

            //verifica deferral temporal (periodo de espera obligatorio p/donar)
            if (user.medicalProfile.temporaryDeferral) {
                const deferralUntil = user.medicalProfile.deferralUntil;
                if (deferralUntil && new Date() < deferralUntil) {
                    return { 
                        canDonate: false, 
                        reason: `Puede donar nuevamente el ${deferralUntil.toLocaleDateString()}` 
                    };
                }
            } else {
                // periodo finalizado, reactivar
                    await userModel.findByIdAndUpdate(userId, {
                        "medicalProfile.temporaryDeferral": false,
                        "medicalProfile.deferralUntil": null,
                        "medicalProfile.deferralReason": null
                    });
            }
            //ver... aptitud medica
            if (user.medicalProfile.canDonate === false) {
                return { canDonate: false, reason: "No apto para donar por razones médicas" };
            }
            //si pasa todas las verificaciones
            return { canDonate: true, reason: "Puede donar" };

        } catch (error) {
            console.error("error en canUserDonate:", error);
            return { canDonate: false, reason: "Error interno del servidor" };
        }
    }  
    // obtener estadisticas del usuario
    static async getUserDonationStats(userId) {
        try {
            const user = await userModel.findById(userId)
                .select("medicalProfile userName profile.bloodType");

            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            return {
                userName: user.userName,
                bloodType: user.profile.bloodType,
                totalDonations: user.medicalProfile.totalDonations || 0,
                peopleHelped: user.medicalProfile.peopleHelpedEstimate || 0,
                lastDonation: user.medicalProfile.lastDonationDate,
                canDonate: user.medicalProfile.canDonate,
                temporaryDeferral: user.medicalProfile.temporaryDeferral,
                deferralUntil: user.medicalProfile.deferralUntil
            };

        } catch (error) {
            console.error("error en getUserDonationStats:", error);
            throw error;
        }
    }

    // registro en stock de sangre
    static async recordBloodStock(user, donationType, institutionId) {
        try {
            const stockRecord = new BloodStockModel({
                institution: institutionId,
                bloodType: user.profile.bloodType,
                transactionType: "input", // entrada de sangre al stock
                quantity: 1,
                donationType: donationType,
                relatedEntity: user._id,
                entityModel: "User"
            });
            await stockRecord.save();
        } catch (error) {
            console.error("error al registrar stock:", error);
        }
    }

    // crear registro de donacion
    static async createDonationRecord(user, donationType, institutionId) {
        try {
            const donationRecord = new DonationModel({
                donor: user._id,
                institution: institutionId,
                donationType: donationType,
                bloodType: user.profile.bloodType,
                peopleHelped: ESTIMATE_HELPER[donationType],
                status: "completed"
            });
            await donationRecord.save();
        } catch (error) {
            console.error("error al crear registro de donacion:", error);
        }
    }
}
