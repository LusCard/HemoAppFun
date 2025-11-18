import mongoose from 'mongoose';

const bloodStockSchema = new mongoose.Schema({
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true,
        index: true // indice para consultas rapidas para institución
    },
    bloodType: { // tipo de sangre afectado
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
        index: true // indice para consultas rapidas por tipo de sangre
    },
    transactionType: { // entrada (donacion) o Salida (transfusion)
        type: String,
        enum: ['input', 'output'],
        required: true
    },
    quantity: { // cantidad (si se maneja por unidad o ml)
        type: Number,
        required: true,
        min: 1
    },
    transactionDate: { // para analisis de tendencias y estacionalidad
        type: Date,
        default: Date.now,
        index: true
    },
    // ref opcional al donante o paciente (para trazabilidad) ver si es necesario o no esta parte
    relatedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'entityModel'
    },
    entityModel: {
        type: String,
        enum: ['User', 'Patient'],
    }
}, { timestamps: true });

export const BloodStockModel = mongoose.model('BloodStock', bloodStockSchema);