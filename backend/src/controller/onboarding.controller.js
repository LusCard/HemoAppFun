import {onboardingQuestion} from  "../models/onboarding.model.js";
import {userModel} from "../models/user.model.js";

export const getOnboardingStep = async(req, res)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.onboardingCompleted){
            return res.status(200).json({
                ok: true,
                msg: "Datos completos!",
                completed: true
            });
        }
        const nextQuestion = await onboardingQuestion.findOne({
            step:{$gt: user.onboardingStep}
        }).sort("step")//sort ordena los paso
        if(!nextQuestion){
            user.onboardingCompleted = true;
            await user.save()
            return res.status(200).json({
                ok: true,
                msg: "Todos tus datos se han guardado. Estas listo para donar!",
                completed: true
            });
        }
        res.status(200).json({
            ok: true,
            msg: nextQuestion,
            completed: false
        });
    } catch (error) {
        console.log("error en el onboarding", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del sistema, intente mas tarde"
        });
    }
};
export const saveOnboardingAnswer = async(req, res) =>{ //gestiona el proceso de preguntas y respuestas del onboarding del usuario
    try {
        const {step, answer} = req.body;
        const user = await userModel.findById(req.user._id);
        const question = await onboardingQuestion.findOne({step});
        if(!user || !question){
            return res.status(404).json({
            ok: false,
            msg: !user
             ? "Usuario no encontrado." 
             : "Pregunta no encontrada"
            });
        } 
        //guardamos respuestas
        if(question.fieldName){
            const fieldPath = question.fieldName; //fieldName es donde gurda las repuestas
            await userModel.findByIdAndUpdate(
                user._id,{
                $set: {[fieldPath]: answer}
            });
        } else {
            user.onboardingAnswers.set(step.toString(), answer); //si la pregunta no tiene su fieldname guaadara un mapa general
        }
        if (step > user.onboardingStep) {//actualiza el progreso
            user.onboardingStep = step;
        }
        const totalQuestions = await onboardingQuestion.countDocuments(); //comprobamos su estanb todos los pasos
        if(step >= totalQuestions){
            user.onboardingCompleted = true
        }

        await user.save();
       
        res.status(200).json({
            ok: true,
            msg: "Respuestas guardadas",
            data:{
                currentStep: user.onboardingStep,
                totalSteps: totalQuestions,
                progress:
                    totalQuestions > 0
                    ? Math.round((user.onboardingStep / totalQuestions) * 100)
                    : 0,
            completed: user.onboardingCompleted,
            }
        });
    } catch (error) {
        console.log("error al guardar respuestas", error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno al guardar las respuestas"
        });
    }
};
export const getOnboardingProgres = async(req, res) =>{
    try {
        const user = await userModel.findById(req.user._id);
        const totalQuestion = await onboardingQuestion.countDocuments();
        resizeTo.status(200).json({
            ok: true,
            data:{
                currentStep: user.onboardingStep,
                completed: user.onboardingCompleted,
                totalQuestions,
                progress: totalQuestions > 0 ? (user.onboardingStep / totalQuestions) * 100 : 0,
                answers: user.onboardingAnswers
            }
        });
    } catch (error) {
        console.log("error al ver el proceso", error);
        res.status(500).json({
            ok:false,
            msg: "Error al cargar el progreso "
        });
    }
};