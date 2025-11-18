import { Schema, mongoose } from "mongoose";

const onboardingSchema = new Schema({
    step: { //define el orden de aparicion de la pregunta
        type: Number,
        required: true,
        unique: true
    },
    question:{
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    questionType:{ //define el tipo de input q debe usar el front , ver mas de esto
        type: String,
        enum: ["multiple_choice", "single_choice", "text", "boolean", "blood_type"],
        required: true 
    },
    options: [{
        value: String,
        label: String,
        //icon: String //para agregar iconos despues
    }],
    isRequired:{
        type: Boolean,
        default: false
    },
    fieldName: {
        type: String,
        default: ""
    },
    category:{
        type: String,
        enum: ["personal", "medical", "donation", "notifications"],
        required: true
    }
},{
    versionKey: false,
    timestamps: true
})

export const onboardingQuestion = mongoose.model("onboardingQuestion", onboardingSchema)