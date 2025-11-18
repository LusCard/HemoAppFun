import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log("Error al hashear la contraseña", error);
        throw new Error("Error interno con la contraseña: hasheo error")
    };
};
export const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log("Error al comparar contraseñas", error);
        throw new Error("Error al autenticar la contraseña")
    };
};