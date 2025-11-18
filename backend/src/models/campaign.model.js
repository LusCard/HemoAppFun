import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    institutionOwner: { // Institución que organiza la campaña
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: String,
    // logica d GeoJSON para el mapa
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: { // [longitud, latitud]
            type: [Number],
            required: true,
            index: '2dsphere' // para consultas de proximidad ($nearSphere)
        }
    }
}, { timestamps: true });

export const CampaignModel = mongoose.model('Campaign', campaignSchema);