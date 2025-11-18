import jwt from "jsonwebtoken";

export const generateToken =(user)=>{
    try {
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return token;
    } catch (error) {
        console.log("Error al general el token", error);
        throw new Error("Error al generar el token del usuario");
    }
};
export const verifyToken =(token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log("error al verificar el token");
        throw new Error("Token invalido o expirado");
    }
};
export const generateTokenRefresh = (user)=>{
    try {
        const refreshToken = jwt.sign(
            {
                id: user._id,
                type: 'refresh'
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return refreshToken;
    } catch (error) {
        console.log("error al generar el refresh del token", error);
        throw new Error("Error interno del servidor al refresh token");
    }
};