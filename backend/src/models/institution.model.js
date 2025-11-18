import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
    user: {//relaicion con el modelo de usuario, para separar datos y responsabilidades
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true
    },
    //datos legales y validaciones
     legalName: {
        type: String,
        required: [true],
        trim: true,
        maxlength: 200
    },
    tradeName: {
        type: String,
        trim: true,
        maxlength: 200
    },
    cuit: {
        type: String,
        required: [true],
        unique: true,
        match: [/^\d{11}$/],
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
        lowercase: true
    },
    //ubicacion y direcciones
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        number: String,
        city: {
            type: String,
            required: true,
            trim: true
        },
        province: {
            type: String,
            required: true,
            trim: true
        },
    },
    //para leaflet 
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number], // [LONGITUD, LATITUD]
            required: true,
        }
    },
    //tipo de institucion
    institutionType: {
        type: String,
        enum: [
            "hospital_publico",
            "hospital_privado", 
            "clinica",
            "centro_salud",
            "banco_sangre",
            "laboratorio",
            "campaña_movil",
            "otro"
        ],
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    //servicios q dan
    services: {
        donation: {
            blood: { type: Boolean, default: false },
            plasma: { type: Boolean, default: false },
            platelets: { type: Boolean, default: false }
        },
        analysis: {
            bloodTests: { type: Boolean, default: false },
            compatibility: { type: Boolean, default: false }
        },
        emergency: {
            trauma: { type: Boolean, default: false },
            surgery: { type: Boolean, default: false }
        }
    },
    //horarios
    schedule: {
        monday: { open: String, close: String, active: { type: Boolean, default: true } },
        tuesday: { open: String, close: String, active: { type: Boolean, default: true } },
        wednesday: { open: String, close: String, active: { type: Boolean, default: true } },
        thursday: { open: String, close: String, active: { type: Boolean, default: true } },
        friday: { open: String, close: String, active: { type: Boolean, default: true } },
        saturday: { open: String, close: String, active: { type: Boolean, default: false } },
        sunday: { open: String, close: String, active: { type: Boolean, default: false } },
        holidays: { 
            open: String, 
            close: String, 
            active: { type: Boolean, default: false },
            note: String
        }
    },
    //validaciones
    validationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected", "suspended"],
        default: "pending"
    },
    validatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    validatedAt: Date,
    rejectionReason: String,
    //para las metricas
    isActive: {
        type: Boolean,
        default: true
    },
    priorityLevel: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium"
    },
    stats: {
        totalDonations: { type: Number, default: 0 },
        monthlyAverage: { type: Number, default: 0 },
        lastDonationDate: Date
    }
}, {
    versionKey: false,
    timestamps: true
});
//ver si estos metodos sirven
institutionSchema.index({ "location.coordinates": "2dsphere" });
institutionSchema.index({ validationStatus: 1 });
institutionSchema.index({ institutionType: 1 });
institutionSchema.index({ "services.donation.blood": 1 });
institutionSchema.index({ "address.city": 1, "address.province": 1 });

export const InstitutionModel = mongoose.model("Institution", institutionSchema);