import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type: String,
        enum: ["donador", "institucion", "moderador", "community_member"],  //"community_member" usuarios no donantes
        default: "community_member"
    },
    accountStatus:{//campo para la verificacion de la cuenta
        type: String,
        enum: ["verified", "unverified", "suspended", "pending_validation"],
        default: "unverified"
    },
    donationStatus:{ 
        type: String,
        enum:["active", "inactive"],
        default: "inactive" 
    },
    //para la autenticacion de los tokens
    refreshToken: {
        type: String,
        select: false
    },
    emailVerificationToken:{
        type: String,
        select: false
    },
    emailVerificationExpires:{
        type: Date
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    location:{
        type:{
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        }
    },
    locationShared:{
        type: Boolean,
        default: false
    },
    profile:{
        firstName:{
            type: String,
            minlength: 2,
            maxlength: 50,
            trim: true,
            required: false
        },
        lastName:{
            type: String,
            minlength: 2,
            maxlength: 60,
            trim: true,
            required: false
        },
        dni:{
            type: String,
            unique: true,
            match: [/^\d{7,8}$/],
        },
        birthDate:{
            type: Date,
            required: false
        },
        gender:{
            type: String,
            enum: ["male", "female", "other"]
        },
        bloodType:{
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", null],
            default: null
        },
        factor:{
            type: String,
            enum: ["positive", "negative", null],
            default: null
        }
    },
    //faltan las cosas para la ubicacion creo
    medicalProfile:{
        weight:{
            type: Number,
            min: 30,
            max: 300,
            default: null
        },
        height:{
            type: Number,
            min: 100, ///en cm
            max: 220,
            default: null
        },
        //historial de donacioness
        lastDonationDate:{
            type: Date,
            default: null
        },
        totalDonations:{
            type: Number,
            default: 0
        },
        //historial medico
        hasChronicDiseases:{ 
            type: Boolean,
            default: null
        },
        recentSurgeries:{
            type: Boolean,
            default: null
        },
        hasTraveledRecently:{
            type: Boolean,
            default: null
        },
        //para donaciones 
        canDonate:{//esta parte es para la logica de el status de donacion
            type: Boolean,
            default: true
        },
        temporaryDeferral: {
            type: Boolean,
            default: false
        },
        deferralReason:{//razones de pq no dona o referimiento
            type: String,
            default: null
        },
        deferralUntil:{
            type: Date,
            default: null
        }
    },
    //apartado para las notificciones
    notificationPreferences:{
        //campos q el usuario puede activar
        bloodMatch:{
            type: Boolean,
            default: true
        },
        donationReminders: {//notificaciones de recordatorios despues de la donacion
            type: Boolean,
            default: true
        },
        newsUpdates:{//notificaciones o novedes x
            type: Boolean,
            default: true
        },
        locationBasedAlerts:{ //por si hay campañas de donaciones
            type: Boolean,
            default: true
        },
        //campos generales
        frequency: { //frecuencia para alertas no esenciales como bloodMatch, newsUpdates
            type: String,
            enum: ['diario', 'semanal', 'mensual', 'pausado'],
            default: 'semanal'
        },
        //control total de notis no esenciales
        isActive: { 
            type: Boolean,
            default: true
        },
        emergencyAlerts: { // Solo para fines de auditoría/visualización en el perfil
            type: Boolean, 
            default: true
        }
    },
    lastLogin: { //campos para auditoria
        type: Date,
        default: null
    },
    loginCount: {
        type: Number,
        default: 0
    },
    //para el onboarding
    onboardingCompleted: {
        type: Boolean,
        default: false
    },
    onboardingStep: {
        type: Number,
        default: 0
    },
    onboardingAnswers: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
},{
    versionKey: false,
    timestamps: true
});
//VER TODO ESTO 
// userSchema.index({ "location.coordinates": "2dsphere" });
// userSchema.index({ "profile.bloodType": 1 });
// userSchema.index({ "medicalProfile.canDonate": 1 });
// userSchema.index({ role: 1, accountStatus: 1 });

// userSchema.methods.canDonateBlood = function() {
//     return this.medicalProfile.canDonate && 
//            this.donationStatus === 'active' &&
//            this.accountStatus === 'verified' &&
//            (!this.medicalProfile.deferralUntil || this.medicalProfile.deferralUntil > new Date());
// };

// userSchema.methods.getAge = function() {
//     return new Date().getFullYear() - this.profile.birthDate.getFullYear();
// };
export const userModel = mongoose.model("User", userSchema);