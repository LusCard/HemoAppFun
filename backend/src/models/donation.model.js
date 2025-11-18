import { Schema, mongoose } from "mongoose";
import { InstitutionModel } from "../models/institution.model.js";
import {userModel} from "../models/user.model.js"

const donationSchema = new Schema({
    donor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution",
        required: true
    },
    type:{
        type: String,
        enum: ['blood', 'plasma', 'platelets', 'unknown'],
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'missed', 'rejected_medical'],
        default: "pending"
    },
    confirmedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    donationDate: Date,
    notes: String
}, {timestamps: true});

export const DonationModel = mongoose.model("Donation", donationSchema);