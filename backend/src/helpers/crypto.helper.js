import crypto from "crypto";

export const generateSecureToken =() =>{
    try {
        return crypto.randomBytes(32).toString('hex');
    } catch (error) {
        console.log("Error al generar la token segura", error);
        throw new Error("Error interno al generar una token")
    }
};
export const generateRandomCode =(length = 6)=>{
    try {
        return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length)
        .toUpperCase();
    } catch (error) {
        console.log("Error al generar el codigo aleatorio", error);
        throw new Error("Error interno al generar el codigo")
    }
};